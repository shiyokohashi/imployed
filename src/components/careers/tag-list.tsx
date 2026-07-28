import { Badge } from "@/components/ui/badge";

type TagListProps = {
  items: string[];
  variant?: "default" | "secondary" | "outline";
  limit?: number;
};

export function TagList({ items, variant = "secondary", limit }: TagListProps) {
  const visible = limit ? items.slice(0, limit) : items;
  const remaining = limit && items.length > limit ? items.length - limit : 0;

  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((item) => (
        <Badge key={item} variant={variant}>
          {item}
        </Badge>
      ))}
      {remaining > 0 && (
        <Badge variant="outline">+{remaining} more</Badge>
      )}
    </div>
  );
}
