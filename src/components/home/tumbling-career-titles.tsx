"use client";

import Matter from "matter-js";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type TumblingCareerTitlesProps = {
  titles: Array<{ slug: string; title: string }>;
};

type TitleBody = {
  id: string;
  slug: string;
  label: string;
  body: Matter.Body;
  opacity: number;
  spawned: boolean;
};

const FONT =
  '700 13px ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const RUSH_DURATION_MS = 13_000;
const HOVER_RADIUS = 52;
const HOVER_FORCE = 0.00000055;
const DRAG_CLICK_THRESHOLD = 10;

/** Rush over ~13s with a gentle curve, then a slow tail. */
function buildSpawnSchedule(count: number): number[] {
  if (count === 0) return [];
  if (count === 1) return [0];

  const rushCount = Math.min(count, Math.max(6, Math.round(count * 0.75)));
  const tailCount = count - rushCount;
  const rushSkew = 1.35;
  const times: number[] = [];

  for (let index = 0; index < rushCount; index += 1) {
    const unit = (index + 0.5) / rushCount;
    const curved = unit ** rushSkew;
    times.push(curved * RUSH_DURATION_MS + Math.random() * 120);
  }

  if (tailCount > 0) {
    const tailDurationMs = 14_000 + count * 120;
    for (let index = 0; index < tailCount; index += 1) {
      const unit = (index + 0.5) / tailCount;
      const curved = 1 - (1 - unit) ** 2;
      times.push(RUSH_DURATION_MS + 600 + curved * tailDurationMs + Math.random() * 140);
    }
  }

  return times.sort((a, b) => a - b);
}

function formatLabel(title: string) {
  return `[${title.toUpperCase()}]`;
}

function measureLabelWidth(label: string): number {
  if (typeof document === "undefined") return label.length * 8;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return label.length * 8;

  context.font = FONT;
  return context.measureText(label).width + 12;
}

function createBounds(width: number, height: number) {
  const thickness = 80;

  return [
    Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, {
      isStatic: true,
      label: "floor",
      restitution: 0.55,
    }),
    Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, {
      isStatic: true,
      label: "left",
      restitution: 0.45,
    }),
    Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, {
      isStatic: true,
      label: "right",
      restitution: 0.45,
    }),
    Matter.Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, {
      isStatic: true,
      label: "ceiling",
      restitution: 0.35,
    }),
  ];
}

function dropIn(
  body: Matter.Body,
  width: number,
  height: number,
  index: number,
  inRush: boolean,
) {
  const bodyWidth = body.bounds.max.x - body.bounds.min.x;
  const x = bodyWidth / 2 + Math.random() * Math.max(width - bodyWidth, 1);

  const y = inRush
    ? Math.random() * height * 0.28
    : -(20 + Math.random() * height * 0.3 + (index % 8) * 12);

  Matter.Body.setPosition(body, { x, y });
  Matter.Body.setAngle(body, (Math.random() - 0.5) * Math.PI * 0.75);
  Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.28);
  Matter.Body.setVelocity(body, {
    x: (Math.random() - 0.5) * (inRush ? 3.5 : 3),
    y: inRush ? 0.8 + Math.random() * 1.8 : 1.5 + Math.random() * 2.5,
  });
  Matter.Sleeping.set(body, false);
}

function createTitleBody(
  career: { slug: string; title: string },
  id: string,
  width: number,
): TitleBody {
  const label = formatLabel(career.title);
  const bodyWidth = Math.min(measureLabelWidth(label), width * 0.85);
  const bodyHeight = 28;

  const body = Matter.Bodies.rectangle(0, 0, bodyWidth, bodyHeight, {
    restitution: 0.62,
    friction: 0.12,
    frictionAir: 0.008,
    density: 0.0011,
    label: id,
    chamfer: { radius: 3 },
    collisionFilter: {
      category: 0x0004,
      mask: 0xffffffff,
    },
  });

  return {
    id,
    slug: career.slug,
    label,
    body,
    opacity: 0.32 + Math.random() * 0.4,
    spawned: false,
  };
}

function staticLayout(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    x: 8 + ((index * 47) % 88),
    y: 6 + ((index * 29) % 82),
    rotate: -18 + (index % 7) * 5.5,
    opacity: 0.22 + (index % 7) * 0.05,
  }));
}

export function TumblingCareerTitles({ titles }: TumblingCareerTitlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titlesRef = useRef(titles);
  const rafRef = useRef<number | null>(null);
  const simulationRef = useRef<{
    reattach: (container: HTMLElement) => void;
    pause: () => void;
    destroy: () => void;
  } | null>(null);
  const clickInteractionRef = useRef({ moved: false, startX: 0, startY: 0, slug: null as string | null });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const staticPositions = useMemo(() => staticLayout(titles.length), [titles.length]);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || titlesRef.current.length === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Keep one simulation alive for this page visit (incl. React strict-mode remount).
    if (simulationRef.current) {
      simulationRef.current.reattach(container);
      return () => simulationRef.current?.pause();
    }

    let root: HTMLElement = container;
    const initialTitles = titlesRef.current;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.75, scale: 0.001 },
    });

    engine.enableSleeping = false;
    engine.positionIterations = 10;
    engine.velocityIterations = 8;

    let bounds: Matter.Body[] = [];
    let titleBodies: TitleBody[] = [];
    let spawnSchedule: number[] = [];
    let width = 0;
    let height = 0;
    let spawnCursor = 0;
    let spawnStart = 0;
    let spawnComplete = false;
    let initialized = false;
    let destroyed = false;
    let paused = false;
    const elementById = new Map<string, HTMLElement>();

    function cacheElements() {
      elementById.clear();
      root.querySelectorAll("[data-tumble-id]").forEach((node) => {
        const id = node.getAttribute("data-tumble-id");
        if (id) elementById.set(id, node as HTMLElement);
      });
    }

    function replaceBounds(nextWidth: number, nextHeight: number) {
      for (const wall of bounds) {
        Matter.Composite.remove(engine.world, wall);
      }

      bounds = createBounds(nextWidth, nextHeight);
      Matter.Composite.add(engine.world, bounds);
    }

    function spawnOne(inRush: boolean) {
      if (spawnCursor >= titleBodies.length) return;

      const item = titleBodies[spawnCursor];
      dropIn(item.body, width, height, spawnCursor, inRush);
      Matter.Composite.add(engine.world, item.body);
      item.spawned = true;
      spawnCursor += 1;
    }

    function processSpawnQueue(elapsedMs: number) {
      if (spawnComplete) return;

      while (
        spawnCursor < spawnSchedule.length &&
        spawnSchedule[spawnCursor]! <= elapsedMs
      ) {
        spawnOne(spawnSchedule[spawnCursor]! <= RUSH_DURATION_MS);
      }

      if (spawnCursor >= spawnSchedule.length) {
        spawnComplete = true;
      }
    }

    function initWorld(nextWidth: number, nextHeight: number) {
      width = nextWidth;
      height = nextHeight;

      titleBodies = initialTitles.map((career, index) =>
        createTitleBody(career, `${career.slug}-${index}`, width),
      );

      spawnSchedule = buildSpawnSchedule(titleBodies.length);
      spawnCursor = 0;
      spawnStart = performance.now();

      Matter.Composite.clear(engine.world, false);
      replaceBounds(width, height);

      cacheElements();
      initialized = true;
    }

    function setupWorld() {
      const nextWidth = root.clientWidth;
      const nextHeight = root.clientHeight;
      if (nextWidth === 0 || nextHeight === 0) return;

      if (!initialized) {
        initWorld(nextWidth, nextHeight);
        return;
      }

      if (nextWidth !== width || nextHeight !== height) {
        width = nextWidth;
        height = nextHeight;
        replaceBounds(width, height);
      }
    }

    setupWorld();

    const mouse = Matter.Mouse.create(root);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      collisionFilter: {
        category: 0x0002,
        mask: 0x0004,
      },
      constraint: {
        stiffness: 0.09,
        damping: 0.08,
        length: 0.06,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    let dragListeningOnWindow = false;

    type MatterMouse = Matter.Mouse & {
      mousemove: (event: MouseEvent) => void;
      mouseup: (event: MouseEvent) => void;
    };

    const matterMouse = mouse as MatterMouse;

    const syncMouseFromEvent = (event: PointerEvent | MouseEvent) => {
      matterMouse.mousemove(event as MouseEvent);
    };

    const releaseFromWindow = (event?: PointerEvent | MouseEvent) => {
      if (event) {
        matterMouse.mouseup(event as MouseEvent);
      } else {
        mouse.button = -1;
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null as unknown as Matter.Vector;
        mouseConstraint.body = undefined as unknown as Matter.Body;
      }
    };

    const onWindowPointerMove = (event: PointerEvent) => {
      if (!mouseConstraint.body) return;

      const dx = mouse.position.x - clickInteractionRef.current.startX;
      const dy = mouse.position.y - clickInteractionRef.current.startY;
      if (Math.hypot(dx, dy) > DRAG_CLICK_THRESHOLD) {
        clickInteractionRef.current.moved = true;
      }

      syncMouseFromEvent(event);
    };

    const onWindowPointerUp = (event: PointerEvent) => {
      if (!mouseConstraint.body && mouse.button === -1) return;
      releaseFromWindow(event);
    };

    const onWindowBlur = () => {
      releaseFromWindow();
    };

    const attachWindowDragListeners = () => {
      if (dragListeningOnWindow) return;
      dragListeningOnWindow = true;
      window.addEventListener("pointermove", onWindowPointerMove);
      window.addEventListener("pointerup", onWindowPointerUp);
      window.addEventListener("pointercancel", onWindowPointerUp);
      window.addEventListener("blur", onWindowBlur);
    };

    const detachWindowDragListeners = () => {
      if (!dragListeningOnWindow) return;
      dragListeningOnWindow = false;
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerUp);
      window.removeEventListener("blur", onWindowBlur);
    };

    const onStartDrag = (event: Matter.IEvent<Matter.MouseConstraint> & { body?: Matter.Body }) => {
      const body = event.body;
      if (body && !body.isStatic) {
        const item = titleBodies.find((title) => title.body === body);
        clickInteractionRef.current.moved = false;
        clickInteractionRef.current.slug = item?.slug ?? null;
        clickInteractionRef.current.startX = mouse.position.x;
        clickInteractionRef.current.startY = mouse.position.y;
        Matter.Sleeping.set(body, false);
        attachWindowDragListeners();
      }
    };

    const onEndDrag = (event: Matter.IEvent<Matter.MouseConstraint> & { body?: Matter.Body }) => {
      if (
        !clickInteractionRef.current.moved &&
        clickInteractionRef.current.slug
      ) {
        window.open(
          `/careers/${clickInteractionRef.current.slug}`,
          "_blank",
          "noopener,noreferrer",
        );
      }

      clickInteractionRef.current.slug = null;
      detachWindowDragListeners();
    };

    const onBeforeUpdate = () => {
      if (mouseConstraint.body?.isStatic) {
        mouseConstraint.body = undefined as unknown as Matter.Body;
        mouseConstraint.constraint.bodyB = null;
        mouseConstraint.constraint.pointB = null as unknown as Matter.Vector;
        detachWindowDragListeners();
      }
    };

    Matter.Events.on(mouseConstraint, "startdrag", onStartDrag);
    Matter.Events.on(mouseConstraint, "enddrag", onEndDrag);
    Matter.Events.on(engine, "beforeUpdate", onBeforeUpdate);

    const mouseElement = mouse.element as (HTMLElement & {
      removeEventListener(type: string, listener: EventListener): void;
    }) | null;
    if (mouseElement) {
      const wheelHandler = (mouse as Matter.Mouse & { mousewheel?: EventListener }).mousewheel;
      if (wheelHandler) {
        mouseElement.removeEventListener("mousewheel", wheelHandler);
        mouseElement.removeEventListener("DOMMouseScroll", wheelHandler);
      }
    }

    function applyHoverForce() {
      if (mouseConstraint.body || mouse.button === 0) return;

      for (const item of titleBodies) {
        if (!item.spawned) continue;

        const body = item.body;
        const dx = body.position.x - mouse.position.x;
        const dy = body.position.y - mouse.position.y;
        const distance = Math.hypot(dx, dy);

        if (distance > HOVER_RADIUS || distance < 2) continue;

        const influence = 1 - distance / HOVER_RADIUS;
        const force = HOVER_FORCE * influence * influence;

        Matter.Body.applyForce(body, body.position, {
          x: (dx / distance) * force,
          y: (dy / distance) * force,
        });
      }
    }

    let lastTick = performance.now();

    const tick = (now: number) => {
      if (destroyed || paused) return;

      const delta = Math.min(now - lastTick, 32);
      lastTick = now;

      if (initialized) {
        if (mouseConstraint.body) {
          const dx = mouse.position.x - clickInteractionRef.current.startX;
          const dy = mouse.position.y - clickInteractionRef.current.startY;
          if (Math.hypot(dx, dy) > DRAG_CLICK_THRESHOLD) {
            clickInteractionRef.current.moved = true;
          }
        }

        applyHoverForce();
        Matter.Engine.update(engine, delta);
        if (!spawnComplete) {
          processSpawnQueue(now - spawnStart);
        }
      }

      for (const item of titleBodies) {
        const element = elementById.get(item.id);
        if (!element) continue;

        if (!item.spawned) {
          element.style.opacity = "0";
          element.style.pointerEvents = "none";
          continue;
        }

        const { x, y } = item.body.position;
        element.style.opacity = String(item.opacity);
        element.style.pointerEvents = "none";
        element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${item.body.angle}rad)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const resume = () => {
      if (destroyed || !paused) return;
      paused = false;
      lastTick = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const observer = new ResizeObserver(() => {
      setupWorld();
    });
    observer.observe(root);

    const pause = () => {
      paused = true;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const reattach = (nextRoot: HTMLElement) => {
      observer.disconnect();
      root = nextRoot;
      Matter.Mouse.setElement(mouse, root);
      cacheElements();
      observer.observe(root);
      resume();
    };

    const destroy = () => {
      destroyed = true;
      paused = true;
      observer.disconnect();
      detachWindowDragListeners();
      Matter.Events.off(mouseConstraint, "startdrag", onStartDrag);
      Matter.Events.off(mouseConstraint, "enddrag", onEndDrag);
      Matter.Events.off(engine, "beforeUpdate", onBeforeUpdate);
      Matter.Composite.remove(engine.world, mouseConstraint);
      if (mouse.element) {
        Matter.Mouse.clearSourceEvents(mouse);
      }
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      Matter.Engine.clear(engine);
      simulationRef.current = null;
    };

    simulationRef.current = { reattach, pause, destroy };

    return () => {
      pause();
    };
  }, []);

  useEffect(() => {
    const onPageHide = () => simulationRef.current?.destroy();
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-grab overflow-hidden select-none active:cursor-grabbing"
    >
      {titles.map((career, index) => {
        const layout = staticPositions[index];
        const id = `${career.slug}-${index}`;
        const opacity = layout?.opacity ?? 0.3;

        if (prefersReducedMotion && layout) {
          return (
            <a
              key={id}
              href={`/careers/${career.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              data-tumble-id={id}
              className="absolute left-0 top-0 cursor-pointer whitespace-nowrap font-bold uppercase tracking-tight text-foreground"
              style={{
                opacity,
                fontSize: "13px",
                left: `${layout.x}%`,
                top: `${layout.y}%`,
                transform: `rotate(${layout.rotate}deg)`,
              }}
            >
              {formatLabel(career.title)}
            </a>
          );
        }

        return (
          <span
            key={id}
            data-tumble-id={id}
            className="absolute left-0 top-0 whitespace-nowrap font-bold uppercase tracking-tight text-foreground will-change-transform touch-none pointer-events-none"
            style={{
              opacity: 0,
              fontSize: "13px",
              transform: "translate3d(-9999px, -9999px, 0)",
            }}
          >
            {formatLabel(career.title)}
          </span>
        );
      })}
    </div>
  );
}
