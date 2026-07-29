// [slug, title, tagline, summary, min, max, { tier, related, aliases, tasks, downsides }]
// This helper keeps every exported career in the generator's tuple format.
const r = (slug, title, tagline, summary, min, max, tier, related = [], aliases = [title]) => [
  slug,
  title,
  tagline,
  summary,
  min,
  max,
  {
    tier,
    related,
    aliases,
    tasks: `Plan, execute, and improve ${title.toLowerCase()} work with cross-functional partners.`,
    downsides: `Changing requirements, complex problem solving, and accountability for outcomes.`,
  },
];

export const TECHNOLOGY_EXPANSION_DATA = {
  categorySlug: "technology",
  profile: "tech",
  exportName: "TECHNOLOGY_EXPANSION_CAREERS",
  sections: [
    {
      name: "SOFTWARE ENGINEERING",
      careers: [
        r("developer-experience-engineer", "Developer Experience Engineer", "Make building software easier for developers", "Create tooling, workflows, and documentation that improve developer productivity.", 105000, 180000, "specialized", ["platform-engineer", "developer-relations"]),
        r("build-systems-engineer", "Build Systems Engineer", "Keep large codebases building quickly and reliably", "Design build tooling, dependency systems, and release pipelines for engineering organizations.", 110000, 185000, "specialized", ["devops-engineer", "platform-engineer"]),
        r("compiler-engineer", "Compiler Engineer", "Turn programming languages into fast programs", "Develop compilers, runtimes, and developer tools for language platforms.", 125000, 210000, "specialized", ["systems-programmer", "performance-engineer"]),
        r("systems-programmer", "Systems Programmer", "Build the low-level software beneath applications", "Write operating-system, runtime, storage, and networking software close to hardware.", 115000, 195000, "specialized", ["compiler-engineer", "embedded-software-engineer"]),
        r("developer-tools-engineer", "Developer Tools Engineer", "Create tools engineers rely on every day", "Build IDE integrations, code-analysis tools, and workflows for software teams.", 105000, 180000, "specialized", ["developer-experience-engineer", "platform-engineer"]),
        r("release-engineer", "Release Engineer", "Move software safely from source to production", "Own release processes, versioning, automation, and deployment coordination.", 95000, 160000, "specialized", ["devops-engineer", "build-systems-engineer"]),
      ],
    },
    {
      name: "DATA & ML",
      careers: [
        r("data-governance-engineer", "Data Governance Engineer", "Make organizational data trustworthy and usable", "Build controls for lineage, quality, access, and data-policy compliance.", 105000, 175000, "specialized", ["data-engineer", "privacy-engineer"]),
        r("data-quality-engineer", "Data Quality Engineer", "Prevent bad data from reaching decisions", "Develop validation, monitoring, and remediation systems for critical datasets.", 95000, 165000, "specialized", ["data-engineer", "analytics-engineer"]),
        r("feature-engineer", "Feature Engineer", "Create reliable signals for machine learning", "Develop, validate, and maintain features used by production ML models.", 115000, 190000, "emerging", ["machine-learning-engineer", "mlops-engineer"]),
        r("model-evaluation-engineer", "Model Evaluation Engineer", "Measure whether AI systems actually work", "Build benchmarks, test sets, and evaluation pipelines for ML and generative AI products.", 120000, 200000, "emerging", ["ai-engineer", "ai-safety-engineer"]),
        r("data-privacy-scientist", "Data Privacy Scientist", "Apply statistical methods without exposing people", "Design privacy-preserving analysis, anonymization, and measurement approaches.", 115000, 190000, "emerging", ["privacy-engineer", "data-scientist"]),
        r("causal-inference-scientist", "Causal Inference Scientist", "Separate true effects from correlations", "Use experimental and observational methods to guide high-stakes product decisions.", 125000, 205000, "specialized", ["data-scientist", "decision-scientist"]),
      ],
    },
    {
      name: "INFRASTRUCTURE & DEVOPS",
      careers: [
        r("cloud-operations-engineer", "Cloud Operations Engineer", "Operate cloud platforms with confidence", "Monitor, maintain, and improve production cloud environments and services.", 90000, 155000, "specialized", ["cloud-engineer", "site-reliability-engineer"]),
        r("kubernetes-engineer", "Kubernetes Engineer", "Run container platforms at scale", "Design and operate Kubernetes clusters, deployment patterns, and platform guardrails.", 115000, 190000, "specialized", ["platform-engineer", "devops-engineer"]),
        r("storage-engineer", "Storage Engineer", "Make data durable, available, and fast", "Build and operate storage systems for databases, applications, and infrastructure.", 110000, 185000, "specialized", ["infrastructure-engineer", "database-engineer"]),
        r("network-automation-engineer", "Network Automation Engineer", "Manage networks through software", "Automate provisioning, validation, and operations for modern network infrastructure.", 105000, 175000, "specialized", ["network-engineer", "devops-engineer"]),
        r("capacity-planning-engineer", "Capacity Planning Engineer", "Ensure systems have room to grow", "Forecast demand and guide compute, storage, and network investment decisions.", 110000, 180000, "specialized", ["infrastructure-engineer", "performance-engineer"]),
        r("disaster-recovery-engineer", "Disaster Recovery Engineer", "Prepare systems for their worst day", "Design backup, recovery, continuity, and resilience programs for critical services.", 100000, 170000, "specialized", ["site-reliability-engineer", "reliability-engineer"]),
      ],
    },
    {
      name: "SECURITY",
      careers: [
        r("security-automation-engineer", "Security Automation Engineer", "Automate repetitive security defenses", "Build workflows and tools that accelerate detection, response, and remediation.", 110000, 185000, "specialized", ["security-engineer", "incident-response-analyst"]),
        r("identity-security-engineer", "Identity Security Engineer", "Protect who can access critical systems", "Design identity, authentication, authorization, and privileged-access controls.", 115000, 190000, "specialized", ["security-engineer", "cloud-security-engineer"]),
        r("product-security-engineer", "Product Security Engineer", "Build security into products from the start", "Partner with product teams on secure architecture, testing, and remediation.", 115000, 190000, "specialized", ["application-security-engineer", "security-engineer"]),
        r("detection-engineer", "Detection Engineer", "Create signals that uncover real threats", "Develop detection logic, telemetry, and alerting for security operations teams.", 105000, 175000, "specialized", ["cybersecurity-analyst", "threat-intelligence-analyst"]),
        r("malware-researcher", "Malware Researcher", "Analyze malicious code and attacker techniques", "Reverse engineer malware and translate findings into defensive intelligence.", 105000, 180000, "specialized", ["digital-forensics-analyst", "threat-intelligence-analyst"]),
        r("security-compliance-engineer", "Security Compliance Engineer", "Turn security requirements into working controls", "Implement evidence, controls, and automation for security certifications and audits.", 95000, 165000, "specialized", ["compliance-engineer", "security-engineer"]),
      ],
    },
    {
      name: "PRODUCT & PROGRAM",
      careers: [
        r("technical-product-operations-manager", "Technical Product Operations Manager", "Make product teams run more effectively", "Improve planning, tooling, metrics, and operating rhythms for product organizations.", 100000, 170000, "specialized", ["product-manager", "technical-program-manager"]),
        r("product-operations-manager", "Product Operations Manager", "Scale the systems behind product decisions", "Coordinate feedback, launches, planning, and processes across product teams.", 90000, 155000, "specialized", ["product-manager", "technical-program-manager"]),
        r("engineering-operations-manager", "Engineering Operations Manager", "Improve how engineering organizations deliver", "Run planning, metrics, vendor, and process programs for engineering leaders.", 105000, 175000, "specialized", ["engineering-manager", "technical-program-manager"]),
        r("technical-business-analyst", "Technical Business Analyst", "Translate business needs into technical clarity", "Analyze workflows, define requirements, and support technology delivery decisions.", 85000, 145000, "specialized", ["product-manager", "systems-analyst"]),
        r("systems-analyst", "Systems Analyst", "Improve business systems through analysis", "Evaluate requirements, processes, and system behavior to guide implementation.", 80000, 140000, "specialized", ["business-analyst", "technical-business-analyst"]),
        r("technology-portfolio-manager", "Technology Portfolio Manager", "Guide investments across technology initiatives", "Prioritize programs, manage dependencies, and report portfolio value to leadership.", 115000, 190000, "specialized", ["technical-program-manager", "enterprise-architect"]),
      ],
    },
    {
      name: "EMERGING AI",
      careers: [
        r("agent-systems-engineer", "Agent Systems Engineer", "Build reliable AI agents for real workflows", "Design agent architectures, tool use, orchestration, and evaluation systems.", 125000, 210000, "emerging", ["ai-engineer", "llm-application-engineer"]),
        r("retrieval-engineer", "Retrieval Engineer", "Help AI systems find the right information", "Build indexing, retrieval, ranking, and grounding systems for AI applications.", 115000, 195000, "emerging", ["llm-application-engineer", "search-engine-engineer"]),
        r("ai-infrastructure-engineer", "AI Infrastructure Engineer", "Provide the platform for AI workloads", "Operate training, inference, GPU, and data infrastructure for AI teams.", 125000, 210000, "emerging", ["mlops-engineer", "platform-engineer"]),
        r("responsible-ai-engineer", "Responsible AI Engineer", "Make AI products safer and more accountable", "Implement fairness, transparency, governance, and risk controls in AI systems.", 120000, 200000, "emerging", ["ai-safety-engineer", "privacy-engineer"]),
        r("synthetic-data-engineer", "Synthetic Data Engineer", "Create useful data without exposing sensitive records", "Develop synthetic datasets for model development, testing, and simulation.", 110000, 185000, "emerging", ["data-engineer", "machine-learning-engineer"]),
        r("multimodal-ai-engineer", "Multimodal AI Engineer", "Build AI that works across text, image, and audio", "Develop production systems that combine multiple data types and foundation models.", 130000, 220000, "emerging", ["ai-engineer", "computer-vision-engineer"]),
      ],
    },
    {
      name: "HARDWARE & EMBEDDED",
      careers: [
        r("embedded-linux-engineer", "Embedded Linux Engineer", "Build Linux systems for connected devices", "Customize kernels, drivers, and system software for embedded products.", 100000, 170000, "specialized", ["embedded-software-engineer", "firmware-engineer"]),
        r("hardware-validation-engineer", "Hardware Validation Engineer", "Prove hardware works before it ships", "Design tests and investigate failures across boards, chips, and devices.", 95000, 165000, "specialized", ["hardware-engineer", "test-engineer"]),
        r("silicon-validation-engineer", "Silicon Validation Engineer", "Validate chips against their intended behavior", "Test silicon, develop diagnostics, and isolate issues before volume production.", 110000, 190000, "specialized", ["fpga-engineer", "hardware-engineer"]),
        r("board-design-engineer", "Board Design Engineer", "Create the circuit boards inside products", "Design PCB schematics, layouts, prototypes, and manufacturing documentation.", 95000, 165000, "specialized", ["hardware-engineer", "electronics-engineer"]),
        r("wearable-technology-engineer", "Wearable Technology Engineer", "Engineer computing people can wear", "Integrate sensors, power, firmware, and ergonomics into wearable devices.", 95000, 165000, "emerging", ["embedded-software-engineer", "biomedical-engineer"]),
        r("robotics-integration-engineer", "Robotics Integration Engineer", "Turn robot components into working systems", "Integrate sensors, controls, software, and mechanical subsystems for robots.", 100000, 175000, "specialized", ["robotics-engineer", "automation-engineer"]),
      ],
    },
    {
      name: "QA & TESTING",
      careers: [
        r("software-quality-engineer", "Software Quality Engineer", "Build quality into software delivery", "Define quality strategies, test systems, and improve release confidence.", 85000, 145000, "specialized", ["qa-automation-engineer", "test-engineer"]),
        r("mobile-qa-engineer", "Mobile QA Engineer", "Ensure apps work across real devices", "Test mobile applications, device compatibility, and release quality.", 75000, 130000, "specialized", ["mobile-engineer", "test-engineer"]),
        r("accessibility-qa-engineer", "Accessibility QA Engineer", "Verify digital products work for everyone", "Test accessibility requirements and guide remediation across product releases.", 85000, 145000, "specialized", ["accessibility-engineer", "qa-automation-engineer"]),
        r("test-infrastructure-engineer", "Test Infrastructure Engineer", "Build the platforms that make testing scalable", "Develop environments, tooling, fixtures, and services for automated testing.", 105000, 175000, "specialized", ["qa-automation-engineer", "platform-engineer"]),
        r("reliability-test-engineer", "Reliability Test Engineer", "Find failures before customers do", "Design stress, longevity, and fault tests for software and services.", 100000, 170000, "specialized", ["reliability-engineer", "performance-engineer"]),
        r("quality-operations-manager", "Quality Operations Manager", "Coordinate quality across product delivery", "Lead quality processes, reporting, and continuous improvement for release organizations.", 95000, 160000, "specialized", ["software-quality-engineer", "engineering-manager"]),
      ],
    },
    {
      name: "TECHNICAL SPECIALIZED",
      careers: [
        r("geospatial-platform-engineer", "Geospatial Platform Engineer", "Build platforms for location-aware products", "Develop scalable geospatial services, pipelines, and mapping infrastructure.", 105000, 180000, "specialized", ["geospatial-software-engineer", "data-engineer"]),
        r("ad-tech-engineer", "Ad Tech Engineer", "Build systems for digital advertising", "Develop targeting, measurement, bidding, and delivery platforms for advertising.", 105000, 180000, "specialized", ["data-engineer", "backend-engineer"]),
        r("developer-education-engineer", "Developer Education Engineer", "Teach developers through technical content", "Create tutorials, workshops, and learning experiences for technical audiences.", 85000, 150000, "interdisciplinary", ["developer-relations", "technical-writer"]),
        r("workflow-automation-engineer", "Workflow Automation Engineer", "Automate repetitive business processes", "Build integrations and automations that connect business systems and teams.", 90000, 155000, "specialized", ["integration-engineer", "solutions-engineer"]),
        r("digital-twin-engineer", "Digital Twin Engineer", "Model physical systems in software", "Create live virtual representations of products, facilities, and operations.", 105000, 180000, "emerging", ["simulation-engineer", "iot-engineer"]),
        r("scientific-software-engineer", "Scientific Software Engineer", "Build software for research and discovery", "Develop reliable tools, simulations, and data systems for scientific teams.", 100000, 175000, "interdisciplinary", ["research-scientist", "data-engineer"]),
      ],
    },
    {
      name: "HIDDEN & EMERGING",
      careers: [
        r("technical-enablement-engineer", "Technical Enablement Engineer", "Equip teams to use complex technology well", "Create internal training, playbooks, and tooling adoption programs.", 90000, 155000, "hidden", ["developer-experience-engineer", "solutions-engineer"]),
        r("incident-communications-manager", "Incident Communications Manager", "Keep stakeholders informed during outages", "Coordinate clear, accurate communications around technical incidents and recovery.", 85000, 145000, "hidden", ["site-reliability-engineer", "technical-program-manager"]),
        r("technology-scout", "Technology Scout", "Find technologies worth adopting early", "Evaluate emerging tools, vendors, and research for product and engineering teams.", 100000, 170000, "emerging", ["enterprise-architect", "ai-consultant"]),
        r("api-integration-specialist", "API Integration Specialist", "Connect systems through reliable APIs", "Configure, troubleshoot, and maintain integrations for business and product systems.", 80000, 140000, "hidden", ["integration-engineer", "implementation-engineer"]),
        r("technical-incident-manager", "Technical Incident Manager", "Coordinate fast recovery from critical incidents", "Lead incident process, coordination, and learning across engineering organizations.", 105000, 175000, "specialized", ["site-reliability-engineer", "technical-program-manager"]),
        r("digital-ethics-technologist", "Digital Ethics Technologist", "Guide responsible choices in technology products", "Assess ethical risks and translate principles into product and engineering practices.", 100000, 170000, "emerging", ["responsible-ai-engineer", "privacy-engineer"]),
      ],
    },
  ],
};

export const ENGINEERING_EXPANSION_DATA = {
  categorySlug: "engineering",
  profile: "tech",
  exportName: "ENGINEERING_EXPANSION_CAREERS",
  sections: [
    {
      name: "MAJOR",
      careers: [
        r("engineering-analyst", "Engineering Analyst", "Use analysis to support technical decisions", "Model costs, performance, and tradeoffs for engineering projects.", 70000, 120000, "major", ["systems-engineer", "project-engineer"]),
        r("design-verification-engineer", "Design Verification Engineer", "Confirm designs meet every requirement", "Plan verification evidence and test complex engineering products.", 80000, 140000, "specialized", ["systems-engineer", "test-engineer"]),
        r("engineering-operations-engineer", "Engineering Operations Engineer", "Improve the systems behind engineering delivery", "Optimize processes, metrics, tools, and coordination for engineering teams.", 75000, 130000, "specialized", ["industrial-engineer", "project-engineer"]),
        r("product-design-engineer", "Product Design Engineer", "Turn product concepts into manufacturable designs", "Develop physical products from concept through prototyping and production.", 75000, 135000, "major", ["mechanical-engineer", "manufacturing-engineer"]),
        r("systems-safety-engineer", "Systems Safety Engineer", "Prevent hazards in complex engineered systems", "Analyze safety risks and design controls across products and operations.", 80000, 140000, "specialized", ["safety-engineer", "systems-engineer"]),
        r("sustainability-engineer", "Sustainability Engineer", "Reduce environmental impact through engineering", "Design and measure lower-impact products, processes, and infrastructure.", 70000, 125000, "emerging", ["environmental-engineer", "industrial-engineer"]),
      ],
    },
    {
      name: "MECHANICAL & THERMAL",
      careers: [
        r("mechanical-design-engineer", "Mechanical Design Engineer", "Create detailed mechanisms and assemblies", "Develop CAD models, drawings, and prototypes for physical products.", 70000, 125000, "specialized", ["mechanical-engineer", "product-design-engineer"]),
        r("heat-transfer-engineer", "Heat Transfer Engineer", "Solve difficult thermal design problems", "Model and improve heat flow in products, equipment, and industrial systems.", 75000, 135000, "specialized", ["thermal-engineer", "mechanical-engineer"]),
        r("vibration-engineer", "Vibration Engineer", "Control vibration before it causes failure", "Analyze noise, vibration, and harshness in machines and structures.", 75000, 130000, "specialized", ["mechanical-engineer", "acoustical-engineer"]),
        r("fluid-systems-engineer", "Fluid Systems Engineer", "Design systems that move liquids and gases", "Engineer pumps, valves, piping, and fluid-control systems.", 70000, 125000, "specialized", ["mechanical-engineer", "process-engineer"]),
        r("mechanism-design-engineer", "Mechanism Design Engineer", "Design moving parts that work precisely", "Create linkages, actuators, and mechanisms for products and automation.", 75000, 135000, "specialized", ["mechanical-design-engineer", "robotics-engineer"]),
        r("refrigeration-engineer", "Refrigeration Engineer", "Engineer cooling systems for demanding applications", "Design refrigeration equipment for food, industrial, and climate systems.", 65000, 115000, "specialized", ["hvac-engineer", "thermal-engineer"]),
      ],
    },
    {
      name: "CIVIL & STRUCTURAL",
      careers: [
        r("site-civil-engineer", "Site Civil Engineer", "Prepare land for safe development", "Design grading, drainage, utilities, and access for development projects.", 65000, 115000, "specialized", ["civil-engineer", "water-resources-engineer"]),
        r("land-development-engineer", "Land Development Engineer", "Transform sites into buildable communities", "Plan infrastructure and approvals for residential, commercial, and industrial sites.", 65000, 115000, "specialized", ["site-civil-engineer", "civil-engineer"]),
        r("dam-safety-engineer", "Dam Safety Engineer", "Protect communities from dam failure", "Inspect, analyze, and improve dams and water-retaining structures.", 75000, 135000, "specialized", ["water-resources-engineer", "structural-engineer"]),
        r("foundation-engineer", "Foundation Engineer", "Design reliable support beneath structures", "Engineer deep and shallow foundations for buildings and infrastructure.", 70000, 125000, "specialized", ["geotechnical-engineer", "structural-engineer"]),
        r("railway-engineer", "Railway Engineer", "Design and maintain rail infrastructure", "Engineer track, signaling, stations, and rail-system improvements.", 70000, 125000, "specialized", ["transportation-engineer", "civil-engineer"]),
        r("municipal-engineer", "Municipal Engineer", "Engineer public infrastructure for communities", "Plan and deliver local roads, utilities, and capital improvements.", 65000, 115000, "specialized", ["civil-engineer", "sanitary-engineer"]),
      ],
    },
    {
      name: "ELECTRICAL & POWER",
      careers: [
        r("power-electronics-engineer", "Power Electronics Engineer", "Control electrical power efficiently", "Design converters, inverters, and power-control systems for products and grids.", 85000, 150000, "specialized", ["electrical-engineer", "battery-systems-engineer"]),
        r("protection-and-controls-engineer", "Protection and Controls Engineer", "Keep electrical grids stable and safe", "Design relay protection, automation, and control systems for power networks.", 80000, 140000, "specialized", ["power-systems-engineer", "controls-engineer"]),
        r("electromagnetic-compatibility-engineer", "Electromagnetic Compatibility Engineer", "Prevent electronics from interfering with each other", "Test and design products for electromagnetic compatibility and certification.", 80000, 140000, "specialized", ["electronics-engineer", "rf-engineer"]),
        r("motor-controls-engineer", "Motor Controls Engineer", "Make electric motors precise and efficient", "Develop motor drives, control algorithms, and validation systems.", 80000, 140000, "specialized", ["electrical-engineer", "controls-engineer"]),
        r("grid-interconnection-engineer", "Grid Interconnection Engineer", "Connect new energy assets to the grid", "Study and manage the technical requirements for grid-connected projects.", 80000, 140000, "emerging", ["power-systems-engineer", "renewable-energy-engineer"]),
        r("lighting-engineer", "Lighting Engineer", "Design lighting that performs beautifully and safely", "Engineer lighting systems for buildings, infrastructure, and products.", 65000, 115000, "specialized", ["electrical-engineer", "building-services-engineer"]),
      ],
    },
    {
      name: "CHEMICAL & PROCESS",
      careers: [
        r("process-control-engineer", "Process Control Engineer", "Automate complex chemical processes", "Design control strategies and systems for safe, efficient plants.", 80000, 140000, "specialized", ["process-engineer", "controls-engineer"]),
        r("reaction-engineer", "Reaction Engineer", "Optimize chemical reactions at scale", "Model kinetics and design reactors for industrial production.", 80000, 140000, "specialized", ["chemical-engineer", "process-engineer"]),
        r("water-treatment-engineer", "Water Treatment Engineer", "Deliver safe water through engineered processes", "Design treatment processes for drinking water, wastewater, and reuse.", 70000, 125000, "specialized", ["sanitary-engineer", "chemical-engineer"]),
        r("carbon-capture-engineer", "Carbon Capture Engineer", "Engineer systems that remove industrial carbon", "Develop capture, transport, and storage processes for carbon emissions.", 85000, 150000, "emerging", ["chemical-engineer", "process-engineer"]),
        r("bioprocess-engineer", "Bioprocess Engineer", "Scale biological manufacturing processes", "Engineer fermentation, purification, and production systems for biotech products.", 80000, 140000, "interdisciplinary", ["chemical-engineer", "biotechnologist"]),
        r("process-simulation-engineer", "Process Simulation Engineer", "Model plants before changing them", "Build process models to improve design, safety, and production performance.", 80000, 135000, "specialized", ["process-engineer", "chemical-engineer"]),
      ],
    },
    {
      name: "AEROSPACE & DEFENSE",
      careers: [
        r("spacecraft-systems-engineer", "Spacecraft Systems Engineer", "Integrate systems for missions beyond Earth", "Manage requirements and interfaces across spacecraft subsystems.", 90000, 160000, "specialized", ["aerospace-engineer", "systems-engineer"]),
        r("guidance-navigation-controls-engineer", "Guidance Navigation and Controls Engineer", "Guide vehicles through complex environments", "Develop estimation, navigation, and control algorithms for aerospace systems.", 90000, 160000, "specialized", ["aerospace-engineer", "controls-engineer"]),
        r("mission-assurance-engineer", "Mission Assurance Engineer", "Protect mission success through disciplined engineering", "Assess risk, verify readiness, and improve reliability for critical programs.", 85000, 150000, "specialized", ["systems-engineer", "reliability-engineer"]),
        r("satellite-engineer", "Satellite Engineer", "Build systems that operate in orbit", "Design, integrate, and test satellite payloads and bus subsystems.", 85000, 150000, "emerging", ["spacecraft-systems-engineer", "avionics-engineer"]),
        r("aerospace-structures-engineer", "Aerospace Structures Engineer", "Design airframes built for demanding loads", "Analyze and improve structural components for aircraft and spacecraft.", 85000, 150000, "specialized", ["aerospace-engineer", "structural-engineer"]),
        r("defense-test-engineer", "Defense Test Engineer", "Validate high-consequence defense systems", "Plan testing and analyze performance for defense hardware and software.", 80000, 145000, "specialized", ["defense-systems-engineer", "systems-engineer"]),
      ],
    },
    {
      name: "BIOMEDICAL",
      careers: [
        r("biomechanics-engineer", "Biomechanics Engineer", "Apply mechanics to human movement and health", "Model movement, injury, and device interaction for medical applications.", 70000, 125000, "interdisciplinary", ["biomedical-engineer", "mechanical-engineer"]),
        r("rehabilitation-engineer", "Rehabilitation Engineer", "Design technology that restores independence", "Develop assistive devices and systems for rehabilitation and accessibility.", 65000, 115000, "interdisciplinary", ["biomedical-engineer", "prosthetics-engineer"]),
        r("medical-imaging-engineer", "Medical Imaging Engineer", "Improve the systems that let clinicians see inside", "Develop and maintain imaging devices, algorithms, and clinical workflows.", 75000, 135000, "specialized", ["biomedical-engineer", "clinical-engineer"]),
        r("biomaterials-engineer", "Biomaterials Engineer", "Create materials that work safely in the body", "Develop and test materials for implants, devices, and tissue engineering.", 75000, 135000, "interdisciplinary", ["biomedical-engineer", "materials-engineer"]),
        r("healthcare-systems-engineer", "Healthcare Systems Engineer", "Improve care delivery through systems design", "Optimize clinical workflows, equipment, and operational systems in healthcare.", 70000, 125000, "interdisciplinary", ["industrial-engineer", "clinical-engineer"]),
        r("medical-robotics-engineer", "Medical Robotics Engineer", "Build robots that assist care and surgery", "Develop robotic systems for surgical, diagnostic, and rehabilitation applications.", 85000, 150000, "emerging", ["robotics-engineer", "biomedical-engineer"]),
      ],
    },
    {
      name: "INDUSTRIAL & QUALITY",
      careers: [
        r("operations-research-engineer", "Operations Research Engineer", "Optimize decisions with math and models", "Build optimization models for logistics, production, and operations.", 80000, 140000, "specialized", ["industrial-engineer", "supply-chain-engineer"]),
        r("production-engineer", "Production Engineer", "Keep manufacturing lines performing", "Improve output, quality, and safety across day-to-day production.", 65000, 115000, "specialized", ["manufacturing-engineer", "process-engineer"]),
        r("reliability-engineer-hardware", "Hardware Reliability Engineer", "Design physical products that last", "Analyze failure modes and improve reliability for hardware and equipment.", 75000, 135000, "specialized", ["manufacturing-reliability-engineer", "quality-engineer"]),
        r("supplier-quality-engineer", "Supplier Quality Engineer", "Ensure purchased parts meet the standard", "Qualify suppliers, resolve defects, and improve incoming component quality.", 70000, 125000, "specialized", ["quality-engineer", "manufacturing-engineer"]),
        r("industrial-automation-engineer", "Industrial Automation Engineer", "Modernize factory operations with automation", "Deploy automated equipment, controls, and data systems on production floors.", 75000, 135000, "specialized", ["automation-engineer", "manufacturing-engineer"]),
        r("ergonomics-engineer", "Ergonomics Engineer", "Design safer work around real people", "Analyze workstations and processes to reduce injury and improve performance.", 65000, 115000, "interdisciplinary", ["human-factors-engineer", "safety-engineer"]),
      ],
    },
    {
      name: "BUILDING & MEP",
      careers: [
        r("building-energy-modeler", "Building Energy Modeler", "Model how buildings use energy", "Simulate energy performance to guide efficient building design.", 65000, 115000, "emerging", ["mep-engineer", "hvac-engineer"]),
        r("plumbing-engineer", "Plumbing Engineer", "Design water systems inside buildings", "Engineer domestic water, waste, storm, and specialty plumbing systems.", 65000, 115000, "specialized", ["mep-engineer", "sanitary-engineer"]),
        r("building-envelope-engineer", "Building Envelope Engineer", "Protect buildings from water, air, and heat", "Design and evaluate façades, roofs, and insulation systems.", 70000, 125000, "specialized", ["building-services-engineer", "civil-engineer"]),
        r("vertical-transportation-engineer", "Vertical Transportation Engineer", "Engineer elevators and escalators for buildings", "Specify and optimize people-moving systems for complex structures.", 70000, 125000, "hidden", ["mep-engineer", "mechanical-engineer"]),
        r("building-commissioning-agent", "Building Commissioning Agent", "Verify building systems perform as designed", "Test integrated systems and document readiness before occupancy.", 65000, 115000, "specialized", ["commissioning-engineer", "mep-engineer"]),
        r("smart-building-engineer", "Smart Building Engineer", "Connect building systems into intelligent operations", "Integrate controls, sensors, and analytics for efficient facilities.", 75000, 130000, "emerging", ["building-services-engineer", "controls-engineer"]),
      ],
    },
    {
      name: "MINING MARINE & ENERGY",
      careers: [
        r("renewable-energy-engineer", "Renewable Energy Engineer", "Design systems for clean energy generation", "Engineer solar, wind, storage, and renewable-energy project systems.", 75000, 135000, "emerging", ["power-systems-engineer", "energy-storage-specialist"]),
        r("energy-storage-specialist", "Energy Storage Specialist", "Deploy batteries and storage where energy needs it", "Design and evaluate energy-storage systems for grid and commercial uses.", 80000, 145000, "emerging", ["battery-systems-engineer", "renewable-energy-engineer"]),
        r("offshore-wind-engineer", "Offshore Wind Engineer", "Engineer wind power in demanding seas", "Design offshore wind foundations, systems, and installation plans.", 85000, 150000, "emerging", ["marine-engineer", "renewable-energy-engineer"]),
        r("marine-systems-engineer", "Marine Systems Engineer", "Integrate systems for ships and offshore assets", "Coordinate propulsion, electrical, and mechanical systems for marine operations.", 75000, 135000, "specialized", ["marine-engineer", "naval-architect"]),
        r("mineral-processing-engineer", "Mineral Processing Engineer", "Separate valuable minerals efficiently", "Design crushing, separation, and recovery processes for mined materials.", 75000, 135000, "specialized", ["mining-engineer", "metallurgical-engineer"]),
        r("geothermal-engineer", "Geothermal Engineer", "Tap Earth's heat for clean energy", "Design wells, power systems, and reservoirs for geothermal projects.", 80000, 145000, "emerging", ["drilling-engineer", "renewable-energy-engineer"]),
      ],
    },
    {
      name: "EMERGING & SPECIALIZED",
      careers: [
        r("quantum-hardware-engineer", "Quantum Hardware Engineer", "Build the machines behind quantum computing", "Develop cryogenic, control, and device systems for quantum processors.", 110000, 190000, "emerging", ["photonics-engineer", "electronics-engineer"]),
        r("autonomous-systems-engineer", "Autonomous Systems Engineer", "Engineer machines that act independently", "Integrate sensing, planning, controls, and safety for autonomous products.", 100000, 175000, "emerging", ["robotics-engineer", "systems-engineer"]),
        r("microfluidics-engineer", "Microfluidics Engineer", "Control fluids at tiny scales", "Design lab-on-chip devices and precision fluid systems for science and medicine.", 75000, 135000, "emerging", ["biomedical-engineer", "chemical-engineer"]),
        r("circular-economy-engineer", "Circular Economy Engineer", "Design products and systems for reuse", "Reduce waste through materials recovery, repairability, and lifecycle design.", 70000, 125000, "emerging", ["sustainability-engineer", "manufacturing-engineer"]),
        r("resilience-engineer", "Resilience Engineer", "Prepare infrastructure for disruption and extremes", "Design systems that withstand climate, operational, and supply-chain shocks.", 80000, 140000, "emerging", ["civil-engineer", "systems-safety-engineer"]),
        r("energy-systems-modeler", "Energy Systems Modeler", "Model the future of energy networks", "Analyze generation, storage, demand, and policy scenarios for energy systems.", 85000, 150000, "emerging", ["power-systems-engineer", "renewable-energy-engineer"]),
      ],
    },
    {
      name: "TECHNICAL SUPPORT & PROJECT",
      careers: [
        r("applications-engineer", "Applications Engineer", "Help customers apply technical products successfully", "Translate product capabilities into practical customer solutions.", 75000, 130000, "specialized", ["field-service-engineer", "sales-engineer"]),
        r("engineering-document-control-specialist", "Engineering Document Control Specialist", "Keep technical records accurate and accessible", "Manage revisions, approvals, and controlled engineering documentation.", 60000, 100000, "hidden", ["project-engineer", "cad-designer"]),
        r("technical-procurement-engineer", "Technical Procurement Engineer", "Source equipment with the right technical fit", "Evaluate specifications, vendors, and contracts for engineering purchases.", 70000, 120000, "specialized", ["project-engineer", "supply-chain-engineer"]),
        r("engineering-estimator", "Engineering Estimator", "Turn technical scope into reliable project costs", "Develop labor, material, and risk estimates for engineering work.", 65000, 115000, "specialized", ["project-engineer", "construction-engineer"]),
        r("technical-training-engineer", "Technical Training Engineer", "Teach people to use complex engineered systems", "Create and deliver practical training for equipment, products, and processes.", 65000, 115000, "interdisciplinary", ["field-service-engineer", "engineering-technician"]),
        r("warranty-engineer", "Warranty Engineer", "Learn from product failures in the field", "Analyze warranty claims and drive corrective actions into engineering and manufacturing.", 70000, 120000, "hidden", ["quality-engineer", "reliability-engineer-hardware"]),
      ],
    },
  ],
};

export const SCIENCE_EXPANSION_DATA = {
  categorySlug: "science",
  profile: "science",
  exportName: "SCIENCE_EXPANSION_CAREERS",
  sections: [
    {
      name: "MAJOR",
      careers: [
        r("research-methodologist", "Research Methodologist", "Design studies that produce trustworthy evidence", "Develop rigorous research designs, measures, and analysis plans.", 70000, 125000, "major", ["research-scientist", "biostatistician"]),
        r("laboratory-scientist", "Laboratory Scientist", "Lead hands-on scientific analysis", "Conduct, validate, and interpret laboratory tests for research or industry.", 55000, 100000, "major", ["laboratory-technician", "research-scientist"]),
        r("scientific-program-manager", "Scientific Program Manager", "Coordinate research programs from idea to impact", "Manage timelines, partners, budgets, and delivery across scientific initiatives.", 80000, 140000, "interdisciplinary", ["principal-investigator", "research-scientist"]),
        r("research-data-manager", "Research Data Manager", "Keep research data usable and well governed", "Build systems for research data quality, sharing, documentation, and retention.", 75000, 130000, "specialized", ["research-scientist", "data-scientist"]),
        r("translational-scientist", "Translational Scientist", "Move discoveries toward practical impact", "Connect basic research with clinical, product, or public-health applications.", 80000, 145000, "interdisciplinary", ["biomedical-researcher", "clinical-research-scientist"]),
        r("scientific-operations-manager", "Scientific Operations Manager", "Make research organizations work smoothly", "Lead facilities, procurement, processes, and systems that support research.", 70000, 120000, "specialized", ["laboratory-manager", "scientific-program-manager"]),
      ],
    },
    {
      name: "LIFE SCIENCES",
      careers: [
        r("proteomics-scientist", "Proteomics Scientist", "Study proteins at system-wide scale", "Analyze protein expression, structure, and function using advanced methods.", 75000, 140000, "specialized", ["biochemist", "bioinformatics-scientist"]),
        r("virologist", "Virologist", "Study viruses and how they affect hosts", "Research viral biology, transmission, evolution, and countermeasures.", 65000, 125000, "specialized", ["microbiologist", "immunologist"]),
        r("parasitologist", "Parasitologist", "Investigate parasites and their hosts", "Study parasitic organisms, disease mechanisms, and control strategies.", 55000, 105000, "specialized", ["microbiologist", "epidemiologist"]),
        r("plant-pathologist", "Plant Pathologist", "Protect crops from disease", "Identify plant diseases and develop prevention and management approaches.", 55000, 105000, "specialized", ["botanist", "agronomist"]),
        r("reproductive-biologist", "Reproductive Biologist", "Study reproduction and development", "Research fertility, reproductive systems, and developmental biology.", 65000, 125000, "specialized", ["cell-biologist", "geneticist"]),
        r("wildlife-disease-scientist", "Wildlife Disease Scientist", "Track disease at the wildlife-human interface", "Study animal health, zoonotic threats, and ecological disease dynamics.", 60000, 115000, "interdisciplinary", ["wildlife-biologist", "epidemiologist"]),
      ],
    },
    {
      name: "PHYSICAL & EARTH SCIENCES",
      careers: [
        r("crystallographer", "Crystallographer", "Reveal structure through diffraction", "Determine molecular and material structures using crystallographic methods.", 65000, 125000, "specialized", ["chemist", "materials-scientist"]),
        r("spectroscopist", "Spectroscopist", "Use light to understand matter", "Develop and apply spectroscopic methods for chemical and physical analysis.", 65000, 125000, "specialized", ["analytical-chemist", "physicist"]),
        r("volcanologist", "Volcanologist", "Study volcanoes and eruption hazards", "Monitor volcanic systems and assess risks to nearby communities.", 60000, 115000, "specialized", ["geologist", "seismologist"]),
        r("glaciologist", "Glaciologist", "Study ice and its role in a changing climate", "Research glaciers, ice sheets, and cryosphere processes.", 60000, 115000, "specialized", ["climatologist", "geologist"]),
        r("limnologist", "Limnologist", "Study lakes, rivers, and inland waters", "Investigate freshwater ecosystems, chemistry, and hydrology.", 55000, 105000, "specialized", ["hydrologist", "ecologist"]),
        r("paleoclimatologist", "Paleoclimatologist", "Reconstruct climates from Earth's past", "Analyze natural records to understand historical climate change.", 65000, 125000, "specialized", ["climatologist", "geologist"]),
      ],
    },
    {
      name: "ENVIRONMENT & CONSERVATION",
      careers: [
        r("restoration-ecologist", "Restoration Ecologist", "Repair damaged ecosystems", "Design and evaluate projects that restore habitat, biodiversity, and ecological function.", 55000, 105000, "specialized", ["ecologist", "conservation-scientist"]),
        r("environmental-toxicologist", "Environmental Toxicologist", "Assess how pollutants affect living systems", "Study exposure pathways, ecological effects, and environmental risks.", 60000, 115000, "specialized", ["toxicologist", "environmental-scientist"]),
        r("conservation-geneticist", "Conservation Geneticist", "Use genetics to protect vulnerable species", "Analyze genetic diversity and guide species recovery strategies.", 65000, 125000, "specialized", ["geneticist", "conservation-scientist"]),
        r("urban-ecologist", "Urban Ecologist", "Study nature in cities", "Research ecosystems, biodiversity, and environmental conditions in urban areas.", 55000, 105000, "interdisciplinary", ["ecologist", "environmental-scientist"]),
        r("environmental-health-scientist", "Environmental Health Scientist", "Connect environmental exposure to human health", "Study hazards in air, water, food, and built environments.", 65000, 125000, "interdisciplinary", ["environmental-scientist", "epidemiologist"]),
        r("watershed-scientist", "Watershed Scientist", "Understand water across connected landscapes", "Study watersheds to guide water quality and land-management decisions.", 55000, 105000, "specialized", ["hydrologist", "environmental-scientist"]),
      ],
    },
    {
      name: "RESEARCH & LAB",
      careers: [
        r("research-compliance-specialist", "Research Compliance Specialist", "Keep research ethical and compliant", "Support protocols, records, and oversight for regulated research.", 60000, 110000, "hidden", ["laboratory-manager", "regulatory-affairs-specialist"]),
        r("core-facility-manager", "Core Facility Manager", "Operate shared scientific equipment and services", "Manage specialized research facilities, user support, and technical operations.", 65000, 120000, "specialized", ["laboratory-manager", "research-scientist"]),
        r("laboratory-informatics-specialist", "Laboratory Informatics Specialist", "Connect laboratory work with reliable data systems", "Configure LIMS, data workflows, and digital systems for scientific laboratories.", 70000, 130000, "specialized", ["research-data-manager", "laboratory-manager"]),
        r("clinical-laboratory-scientist", "Clinical Laboratory Scientist", "Generate results clinicians can trust", "Perform and interpret laboratory testing that supports patient care.", 55000, 105000, "specialized", ["laboratory-scientist", "clinical-research-scientist"]),
        r("sample-management-specialist", "Sample Management Specialist", "Protect the integrity of scientific samples", "Track, store, and prepare samples for research and testing workflows.", 45000, 80000, "hidden", ["laboratory-technician", "laboratory-manager"]),
        r("research-equipment-specialist", "Research Equipment Specialist", "Keep sophisticated scientific instruments working", "Maintain, calibrate, and troubleshoot laboratory and research equipment.", 55000, 100000, "hidden", ["laboratory-manager", "engineering-technician"]),
      ],
    },
    {
      name: "INTERDISCIPLINARY",
      careers: [
        r("biophysicist", "Biophysicist", "Use physics to explain living systems", "Apply physical methods and models to biological questions.", 75000, 140000, "interdisciplinary", ["physicist", "biochemist"]),
        r("behavioral-scientist", "Behavioral Scientist", "Study why people make the choices they do", "Use experiments and data to understand behavior and improve interventions.", 70000, 130000, "interdisciplinary", ["cognitive-scientist", "decision-scientist"]),
        r("computational-chemist", "Computational Chemist", "Model molecules with code and mathematics", "Simulate chemical systems to guide discovery and development.", 80000, 145000, "interdisciplinary", ["chemist", "materials-scientist"]),
        r("astrobiologist", "Astrobiologist", "Explore the conditions for life beyond Earth", "Study life's origins, limits, and possible existence elsewhere in the universe.", 65000, 130000, "interdisciplinary", ["planetary-scientist", "biologist"]),
        r("science-librarian", "Science Librarian", "Connect researchers with the knowledge they need", "Manage scientific information, literature access, and research support services.", 55000, 100000, "hidden", ["scientific-editor", "research-data-manager"]),
        r("knowledge-translation-specialist", "Knowledge Translation Specialist", "Move evidence into practice", "Turn research findings into usable guidance for practitioners and policymakers.", 65000, 120000, "interdisciplinary", ["science-communicator", "science-policy-advisor"]),
      ],
    },
    {
      name: "EMERGING",
      careers: [
        r("spatial-biology-scientist", "Spatial Biology Scientist", "Study cells in their tissue context", "Use spatial methods to understand cellular organization and disease.", 80000, 150000, "emerging", ["cell-biologist", "bioinformatics-scientist"]),
        r("single-cell-scientist", "Single Cell Scientist", "Analyze biology one cell at a time", "Develop and apply methods that reveal cell-level diversity and behavior.", 80000, 150000, "emerging", ["genomics-scientist", "cell-biologist"]),
        r("digital-biology-scientist", "Digital Biology Scientist", "Combine biological discovery with advanced computation", "Use data, simulation, and automation to study complex biological systems.", 85000, 155000, "emerging", ["computational-biologist", "bioinformatics-scientist"]),
        r("carbon-removal-scientist", "Carbon Removal Scientist", "Study ways to remove carbon from the atmosphere", "Evaluate carbon-removal methods, measurement, and long-term climate effects.", 75000, 140000, "emerging", ["climatologist", "environmental-scientist"]),
        r("planetary-protection-scientist", "Planetary Protection Scientist", "Prevent contamination across space missions", "Develop science-based safeguards for exploring other worlds responsibly.", 75000, 140000, "emerging", ["space-scientist", "astrobiologist"]),
        r("quantum-materials-scientist", "Quantum Materials Scientist", "Discover materials with unusual quantum behavior", "Study materials that enable future computing, sensing, and energy technologies.", 85000, 155000, "emerging", ["materials-scientist", "quantum-physicist"]),
      ],
    },
    {
      name: "HIDDEN & SPECIALIZED",
      careers: [
        r("taxonomy-specialist", "Taxonomy Specialist", "Identify and classify the diversity of life", "Describe organisms and maintain classification knowledge for research and conservation.", 45000, 90000, "hidden", ["botanist", "zoologist"]),
        r("herbarium-curator", "Herbarium Curator", "Preserve plant collections for future science", "Manage botanical specimens, records, and collection-based research.", 45000, 85000, "hidden", ["botanist", "museum-curator"]),
        r("biorepository-manager", "Biorepository Manager", "Safeguard biological samples for discovery", "Operate systems for storage, quality, access, and governance of biospecimens.", 60000, 110000, "hidden", ["sample-management-specialist", "laboratory-manager"]),
        r("scientific-illustrator", "Scientific Illustrator", "Make complex scientific ideas visible", "Create accurate visual explanations for research, education, and publications.", 45000, 90000, "hidden", ["science-communicator", "science-photographer"]),
        r("research-integrity-officer", "Research Integrity Officer", "Protect trust in the research process", "Investigate concerns and develop practices that support responsible research.", 70000, 125000, "hidden", ["research-compliance-specialist", "scientific-editor"]),
        r("citizen-science-coordinator", "Citizen Science Coordinator", "Involve communities in real scientific discovery", "Design public participation programs that collect useful research data.", 45000, 90000, "hidden", ["science-educator", "field-researcher"]),
      ],
    },
  ],
};

export const TECH_ENGINEERING_SCIENCE_EXPANSIONS = [
  TECHNOLOGY_EXPANSION_DATA,
  ENGINEERING_EXPANSION_DATA,
  SCIENCE_EXPANSION_DATA,
];

export default {
  technology: {
    profile: TECHNOLOGY_EXPANSION_DATA.profile,
    exportName: TECHNOLOGY_EXPANSION_DATA.exportName,
    sections: TECHNOLOGY_EXPANSION_DATA.sections,
  },
  engineering: {
    profile: ENGINEERING_EXPANSION_DATA.profile,
    exportName: ENGINEERING_EXPANSION_DATA.exportName,
    sections: ENGINEERING_EXPANSION_DATA.sections,
  },
  science: {
    profile: SCIENCE_EXPANSION_DATA.profile,
    exportName: SCIENCE_EXPANSION_DATA.exportName,
    sections: SCIENCE_EXPANSION_DATA.sections,
  },
};
