/**
 * Supplemental career maps for the remaining category expansions.
 *
 * Each section deliberately contains six roles.  The small builder keeps the
 * source maintainable while producing the tuple shape consumed by the
 * expansion generator.
 */
const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const tierFor = (section) => {
  if (section === "MAJOR") return "major";
  if (section.startsWith("EMERGING")) return "emerging";
  if (section.startsWith("HIDDEN")) return "hidden";
  return "specialized";
};

const salaryFor = (profile, tier) => {
  const ranges = {
    business: { major: [70000, 150000], specialized: [55000, 120000], emerging: [70000, 145000], hidden: [45000, 95000] },
    design: { major: [70000, 145000], specialized: [55000, 120000], emerging: [70000, 150000], hidden: [45000, 95000] },
    government: { major: [65000, 135000], specialized: [50000, 105000], emerging: [60000, 125000], hidden: [45000, 90000] },
    media: { major: [60000, 135000], specialized: [45000, 105000], emerging: [55000, 125000], hidden: [40000, 85000] },
    science: { major: [70000, 145000], specialized: [55000, 115000], emerging: [65000, 140000], hidden: [45000, 95000] },
  };
  return ranges[profile][tier];
};

const careers = (category, profile, section, titles) => {
  const tier = tierFor(section);
  const [min, max] = salaryFor(profile, tier);
  return titles.map((title) => [
    `${category}-${slugify(section)}-${slugify(title)}`,
    title,
    `Build a career in ${section.toLowerCase()}.`,
    `Apply practical expertise in ${section.toLowerCase()} to deliver reliable results for teams, clients, and communities.`,
    min,
    max,
    {
      tier,
      related: [],
      tasks: `Plan, coordinate, and improve work across ${section.toLowerCase()}.`,
      downsides: "Deadlines, changing priorities, and stakeholder coordination can be demanding.",
    },
  ]);
};

const category = (profile, exportName, sections) => ({
  profile,
  exportName,
  sections: Object.entries(sections).map(([name, titles]) => ({
    name,
    careers: careers(exportName.toLowerCase().replace(/_expansion_careers$/, "").replace(/_/g, "-"), profile, name, titles),
  })),
});

export default {
  "design-creative": category("design", "DESIGN_CREATIVE_EXPANSION_CAREERS", {
    MAJOR: ["Art Director", "Creative Director", "Graphic Designer", "Product Designer", "Illustrator", "Creative Producer"],
    "UX & PRODUCT DESIGN": ["UX Researcher", "UX Designer", "UI Designer", "Interaction Designer", "Service Designer", "Design Systems Designer"],
    "BRAND & VISUAL": ["Brand Designer", "Visual Identity Designer", "Packaging Designer", "Editorial Designer", "Information Designer", "Signage Designer"],
    "MOTION VIDEO & 3D": ["Motion Graphics Designer", "3D Artist", "Video Editor", "Compositor", "VFX Artist", "Animation Director"],
    "SPATIAL & PHYSICAL": ["Industrial Designer", "Interior Designer", "Exhibit Designer", "Furniture Designer", "Retail Experience Designer", "Wayfinding Designer"],
    "GAME & INTERACTIVE": ["Game Designer", "Level Designer", "Technical Artist", "Narrative Designer", "UI Game Designer", "Experience Designer"],
    "WRITING & CONTENT DESIGN": ["Content Designer", "UX Writer", "Information Architect", "Copywriter", "Content Strategist", "Technical Writer"],
    "FASHION & STYLING": ["Fashion Designer", "Stylist", "Costume Designer", "Textile Designer", "Merchandise Designer", "Fashion Illustrator"],
    "EMERGING & INTERDISCIPLINARY": ["AI Experience Designer", "XR Designer", "Computational Designer", "Design Futurist", "Inclusive Design Specialist", "Creative Technologist"],
    "HIDDEN & SPECIALIZED": ["Color Specialist", "Typography Designer", "Prepress Technician", "Model Maker", "Medical Illustrator", "Accessibility Designer"],
  }),

  "media-entertainment": category("media", "MEDIA_ENTERTAINMENT_EXPANSION_CAREERS", {
    MAJOR: ["Producer", "Director", "Editor", "Reporter", "Talent Manager", "Media Planner"],
    "JOURNALISM & NEWS": ["Investigative Reporter", "News Producer", "Photojournalist", "Assignment Editor", "Data Journalist", "Foreign Correspondent"],
    "FILM & TELEVISION PRODUCTION": ["Line Producer", "Cinematographer", "Production Designer", "Script Supervisor", "Location Manager", "Postproduction Supervisor"],
    "PERFORMING ARTS": ["Theater Director", "Stage Manager", "Choreographer", "Lighting Designer", "Sound Designer", "Casting Director"],
    "MUSIC INDUSTRY": ["Artist Manager", "Music Producer", "A&R Representative", "Tour Manager", "Music Publisher", "Live Sound Engineer"],
    "BROADCAST RADIO & PODCAST": ["Radio Producer", "Podcast Producer", "Broadcast Engineer", "On-Air Host", "Audio Editor", "Program Director"],
    "PUBLISHING & LITERARY": ["Acquisitions Editor", "Literary Agent", "Book Publicist", "Managing Editor", "Rights Manager", "Manuscript Editor"],
    "CONTENT & CREATOR ECONOMY": ["Creator Partnerships Manager", "Social Video Producer", "Community Manager", "Influencer Strategist", "Channel Manager", "Content Operations Manager"],
    "ENTERTAINMENT BUSINESS": ["Entertainment Lawyer", "Business Affairs Manager", "Distribution Manager", "Licensing Manager", "Audience Development Manager", "Entertainment Marketing Manager"],
    "EMERGING & TECHNICAL": ["Virtual Production Supervisor", "Streaming Operations Manager", "Media Metadata Specialist", "Immersive Producer", "Audience Insights Analyst", "Digital Rights Analyst"],
    "HIDDEN & SPECIALIZED": ["Foley Artist", "Colorist", "Music Supervisor", "Clearance Coordinator", "Closed Captioner", "Media Archivist"],
  }),

  "social-impact": category("government", "SOCIAL_IMPACT_EXPANSION_CAREERS", {
    MAJOR: ["Nonprofit Executive Director", "Program Manager", "Policy Advocate", "Community Organizer", "Fundraising Manager", "Social Worker"],
    "NONPROFIT LEADERSHIP & DEVELOPMENT": ["Development Director", "Major Gifts Officer", "Grant Writer", "Donor Relations Manager", "Volunteer Director", "Foundation Program Officer"],
    "DIRECT SERVICE & PROGRAMS": ["Case Manager", "Youth Program Coordinator", "Housing Navigator", "Crisis Counselor", "Program Evaluator", "Family Support Specialist"],
    "INTERNATIONAL & HUMANITARIAN": ["Humanitarian Program Officer", "Refugee Resettlement Specialist", "International Development Officer", "Emergency Response Coordinator", "Global Health Program Manager", "Protection Officer"],
    "COMMUNITY DEVELOPMENT & JUSTICE": ["Community Development Manager", "Restorative Justice Coordinator", "Tenant Organizer", "Reentry Specialist", "Civil Rights Advocate", "Neighborhood Planner"],
    "ENVIRONMENT & COMMUNITY": ["Environmental Justice Organizer", "Community Resilience Planner", "Food Access Coordinator", "Urban Agriculture Manager", "Climate Justice Advocate", "Public Health Outreach Worker"],
    "SOCIAL ENTERPRISE & IMPACT": ["Social Enterprise Manager", "Impact Measurement Analyst", "Benefit Corporation Manager", "Impact Investment Associate", "Corporate Social Responsibility Manager", "Social Innovation Director"],
    "CIVIC & SERVICE": ["AmeriCorps Program Director", "Civic Engagement Manager", "Public Service Fellow", "Voter Engagement Organizer", "Service Learning Coordinator", "Constituent Services Manager"],
    EMERGING: ["Digital Equity Manager", "Mutual Aid Coordinator", "Community Data Steward", "Participatory Budgeting Manager", "Climate Migration Specialist", "Trust-Based Philanthropy Officer"],
    "HIDDEN & SPECIALIZED": ["Prospect Researcher", "Nonprofit Compliance Manager", "Gift Processing Specialist", "Volunteer Database Administrator", "Grant Compliance Officer", "Planned Giving Specialist"],
  }),

  environment: category("science", "ENVIRONMENT_EXPANSION_CAREERS", {
    MAJOR: ["Environmental Scientist", "Sustainability Manager", "Conservation Scientist", "Environmental Engineer", "Climate Analyst", "Park Ranger"],
    "RENEWABLE ENERGY": ["Solar Project Developer", "Wind Turbine Technician", "Renewable Energy Engineer", "Energy Storage Analyst", "Solar Installer", "Renewable Energy Asset Manager"],
    "GREEN BUILDING & ENERGY EFFICIENCY": ["Energy Auditor", "Building Performance Engineer", "LEED Consultant", "Retrofit Project Manager", "Energy Modeler", "Commissioning Agent"],
    "ENVIRONMENTAL SERVICES": ["Environmental Consultant", "Hazardous Materials Specialist", "Air Quality Specialist", "Water Treatment Operator", "Environmental Field Technician", "Remediation Project Manager"],
    "WASTE & CIRCULAR ECONOMY": ["Waste Reduction Manager", "Recycling Coordinator", "Circular Economy Strategist", "Composting Operations Manager", "Materials Recovery Manager", "Zero Waste Consultant"],
    "CONSERVATION & LAND MANAGEMENT": ["Land Trust Manager", "Forest Manager", "Conservation Planner", "Habitat Restoration Specialist", "Land Steward", "Watershed Coordinator"],
    "WILDLIFE & MARINE": ["Wildlife Biologist", "Marine Biologist", "Fisheries Manager", "Wildlife Rehabilitator", "Marine Conservation Officer", "Aquarium Curator"],
    "CLIMATE & CARBON": ["Carbon Accountant", "Climate Risk Analyst", "Greenhouse Gas Verifier", "Carbon Markets Analyst", "Climate Adaptation Planner", "Decarbonization Consultant"],
    "SUSTAINABLE AGRICULTURE & FOOD": ["Sustainable Agriculture Specialist", "Regenerative Agriculture Manager", "Food Systems Planner", "Organic Farm Manager", "Soil Scientist", "Agroforestry Specialist"],
    "PLANNING & ASSESSMENT": ["Environmental Planner", "Environmental Impact Analyst", "GIS Environmental Analyst", "Permitting Specialist", "Ecological Risk Assessor", "Natural Resources Planner"],
    "OUTDOOR & EDUCATION": ["Outdoor Educator", "Environmental Educator", "Interpretive Ranger", "Adventure Program Manager", "Nature Center Director", "Field Studies Instructor"],
    EMERGING: ["Climate Tech Product Manager", "Nature-Based Solutions Developer", "Biodiversity Data Scientist", "Climate Finance Analyst", "Environmental DNA Specialist", "Climate Communications Strategist"],
    "HIDDEN & SPECIALIZED": ["Wetland Delineator", "Arborist", "Environmental Sample Technician", "Noise Control Specialist", "Mold Remediation Specialist", "Soil Conservation Technician"],
  }),

  operations: category("business", "OPERATIONS_EXPANSION_CAREERS", {
    MAJOR: ["Operations Manager", "Chief Operating Officer", "Business Operations Manager", "Operations Analyst", "General Manager", "Regional Operations Manager"],
    MANUFACTURING: ["Manufacturing Manager", "Production Supervisor", "Plant Manager", "Production Planner", "Manufacturing Engineer", "Assembly Supervisor"],
    "LOGISTICS & WAREHOUSE": ["Logistics Manager", "Warehouse Manager", "Inventory Control Manager", "Fulfillment Manager", "Distribution Supervisor", "Freight Coordinator"],
    "DISPATCH & ROUTING": ["Dispatch Manager", "Route Planner", "Fleet Dispatcher", "Transportation Coordinator", "Load Planner", "Delivery Operations Manager"],
    "SERVICE OPERATIONS": ["Service Operations Manager", "Field Service Manager", "Customer Operations Manager", "Service Delivery Manager", "Call Center Manager", "Branch Operations Manager"],
    "IT OPERATIONS": ["IT Operations Manager", "Systems Operations Analyst", "Network Operations Manager", "IT Service Manager", "Infrastructure Operations Engineer", "Help Desk Manager"],
    "PROCESS EXCELLENCE": ["Continuous Improvement Manager", "Lean Manager", "Six Sigma Black Belt", "Process Improvement Analyst", "Business Process Manager", "Value Stream Manager"],
    "WORKFORCE & SCHEDULING": ["Workforce Manager", "Scheduling Manager", "Capacity Planner", "Workforce Analyst", "Labor Planning Manager", "Shift Operations Manager"],
    FACILITIES: ["Facilities Manager", "Building Operations Manager", "Maintenance Manager", "Workplace Operations Manager", "Facilities Coordinator", "Space Planner"],
    "QUALITY & SAFETY": ["Quality Manager", "Safety Manager", "Quality Assurance Manager", "EHS Manager", "Compliance Operations Manager", "Quality Control Supervisor"],
    PMO: ["PMO Director", "Program Manager", "Portfolio Manager", "Project Controls Manager", "Project Management Analyst", "Transformation Program Manager"],
    "INDUSTRY OPERATIONS": ["Healthcare Operations Manager", "Retail Operations Manager", "Hospitality Operations Manager", "Banking Operations Manager", "Airline Operations Manager", "Education Operations Manager"],
    "ADMIN & SUPPORT": ["Office Manager", "Executive Operations Manager", "Administrative Services Manager", "Business Support Manager", "Records Manager", "Document Control Manager"],
    "RESILIENCE & TRANSFORMATION": ["Business Continuity Manager", "Operational Resilience Manager", "Change Management Manager", "Transformation Director", "Crisis Operations Manager", "Process Automation Manager"],
    "PROCUREMENT EXECUTION": ["Procurement Operations Manager", "Purchasing Manager", "Supplier Operations Manager", "Purchase Order Specialist", "Contract Operations Manager", "Vendor Operations Manager"],
    "FUNCTIONAL OPERATIONS": ["Sales Operations Manager", "Revenue Operations Manager", "People Operations Manager", "Marketing Operations Manager", "Legal Operations Manager", "Finance Operations Manager"],
    LEADERSHIP: ["Vice President of Operations", "Director of Operations", "Chief of Staff", "Operating Partner", "Chief Administrative Officer", "Operations Strategy Director"],
  }),

  "trades-skilled-work": category("business", "TRADES_SKILLED_WORK_EXPANSION_CAREERS", {
    MAJOR: ["Electrician", "Plumber", "Carpenter", "Welder", "HVAC Technician", "Construction Manager"],
    "CONSTRUCTION TRADES": ["Concrete Finisher", "Drywall Installer", "Roofer", "Tile Setter", "Ironworker", "Mason"],
    "MECHANICAL & ELECTRICAL": ["Industrial Electrician", "Millwright", "Elevator Mechanic", "Instrumentation Technician", "Boiler Technician", "Refrigeration Technician"],
    "HEAVY EQUIPMENT & OPERATORS": ["Crane Operator", "Excavator Operator", "Heavy Equipment Operator", "Paving Equipment Operator", "Drilling Rig Operator", "Forklift Operator"],
    AUTOMOTIVE: ["Automotive Service Technician", "Diesel Mechanic", "Auto Body Technician", "Automotive Electrician", "Service Advisor", "Tire Technician"],
    "HOME SERVICES": ["Appliance Repair Technician", "Locksmith", "Pest Control Technician", "Pool Service Technician", "Home Inspector", "Garage Door Technician"],
    "SPECIALTY TRADES": ["Glazier", "Pipefitter", "Sheet Metal Worker", "Insulation Worker", "Fire Sprinkler Fitter", "Cable Installer"],
    "LANDSCAPE & OUTDOOR": ["Landscape Technician", "Tree Climber", "Irrigation Technician", "Groundskeeper", "Hardscape Installer", "Arborist"],
    "CLEANING & MAINTENANCE": ["Building Maintenance Technician", "Commercial Cleaner", "Restoration Technician", "Janitorial Supervisor", "Pressure Washing Technician", "Window Cleaner"],
    TRANSPORTATION: ["Commercial Truck Driver", "Railroad Conductor", "Aircraft Mechanic", "Marine Mechanic", "Bus Mechanic", "Fleet Maintenance Technician"],
    "PERSONAL SERVICES": ["Barber", "Cosmetologist", "Massage Therapist", "Tattoo Artist", "Nail Technician", "Esthetician"],
    "FOOD TRADES": ["Butcher", "Baker", "Pastry Chef", "Cheesemaker", "Brewer", "Meat Cutter"],
    "SPECIALIZED SKILLED": ["Watchmaker", "Jeweler", "Precision Machinist", "Orthotic Technician", "Luthier", "Prosthetics Technician"],
    "CONSTRUCTION SUPPORT": ["Construction Estimator", "Building Inspector", "Construction Scheduler", "Site Safety Coordinator", "Construction Surveyor", "Permit Technician"],
  }),
};
