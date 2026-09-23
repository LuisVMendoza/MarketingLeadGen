export type Version = "v1" | "v2" | "v3" | "v4" | "v5";
export type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: "Customer" | "Qualified" | "Nurturing" | "New" | "At risk";
  source: string;
  site: string;
  value: number;
  last: string;
  tags: string[];
  initials: string;
  color: string;
};
export type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: "Active" | "Draft" | "Paused" | "Scheduled" | "Completed";
  audience: string;
  sent: number;
  open: number;
  click: number;
  date: string;
  color: string;
};
export type Automation = {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  status: "Live" | "Paused" | "Draft";
  enrolled: number;
  completion: number;
};
export type Integration = {
  name: string;
  category: string;
  description: string;
  connected: boolean;
  mark: string;
};

export const contactsSeed: Contact[] = [
  {
    id: "contact-001",
    name: "Maya Chen",
    email: "maya@northstar.studio",
    company: "Northstar Studio",
    role: "Founder",
    status: "Qualified",
    source: "Website form",
    site: "5W Media",
    value: 48000,
    last: "12 min ago",
    tags: ["High intent", "Design"],
    initials: "MC",
    color: "#b8a7f1",
  },
  {
    id: "contact-002",
    name: "Jordan Ellis",
    email: "jordan@arcwell.io",
    company: "Arcwell",
    role: "VP Growth",
    status: "Customer",
    source: "Paid social",
    site: "5W PR",
    value: 125000,
    last: "Yesterday",
    tags: ["Enterprise"],
    initials: "JE",
    color: "#a9d7c0",
  },
  {
    id: "contact-003",
    name: "Priya Kapoor",
    email: "priya@sonderhealth.com",
    company: "Sonder Health",
    role: "Marketing Director",
    status: "Nurturing",
    source: "Referral",
    site: "5W Media",
    value: 32000,
    last: "Sep 20",
    tags: ["Healthcare"],
    initials: "PK",
    color: "#f4cb91",
  },
  {
    id: "contact-004",
    name: "Theo Ramirez",
    email: "theo@meridian.co",
    company: "Meridian",
    role: "CMO",
    status: "New",
    source: "Organic search",
    site: "5W PR",
    value: 86000,
    last: "Sep 19",
    tags: ["B2B", "High intent"],
    initials: "TR",
    color: "#99d8ea",
  },
  {
    id: "contact-005",
    name: "Amara Okafor",
    email: "amara@fieldnotes.us",
    company: "Fieldnotes",
    role: "Brand Lead",
    status: "Qualified",
    source: "Email campaign",
    site: "5W Media",
    value: 56000,
    last: "Sep 18",
    tags: ["Retail"],
    initials: "AO",
    color: "#edb3bb",
  },
  {
    id: "contact-006",
    name: "Noah Williams",
    email: "noah@valence.ai",
    company: "Valence AI",
    role: "CEO",
    status: "At risk",
    source: "Paid search",
    site: "5W PR",
    value: 92000,
    last: "Sep 17",
    tags: ["Technology"],
    initials: "NW",
    color: "#aabfe9",
  },
  {
    id: "contact-007",
    name: "Isabel Foster",
    email: "isabel@oakline.com",
    company: "Oakline",
    role: "Partnerships",
    status: "Customer",
    source: "Website form",
    site: "5W Media",
    value: 67000,
    last: "Sep 16",
    tags: ["Partners"],
    initials: "IF",
    color: "#d8c1e9",
  },
  {
    id: "contact-008",
    name: "Ethan Brooks",
    email: "ethan@atlasworks.com",
    company: "Atlasworks",
    role: "Growth Manager",
    status: "New",
    source: "Organic search",
    site: "5W PR",
    value: 24000,
    last: "Sep 15",
    tags: ["SaaS"],
    initials: "EB",
    color: "#c5d9a6",
  },
];
export const companies = [
  {
    name: "Northstar Studio",
    industry: "Creative services",
    contacts: 3,
    value: 48000,
    trend: "+24%",
    site: "5W Media",
  },
  {
    name: "Arcwell",
    industry: "Financial technology",
    contacts: 5,
    value: 125000,
    trend: "+18%",
    site: "5W PR",
  },
  {
    name: "Sonder Health",
    industry: "Healthcare",
    contacts: 2,
    value: 32000,
    trend: "+8%",
    site: "5W Media",
  },
  {
    name: "Meridian",
    industry: "Consulting",
    contacts: 4,
    value: 86000,
    trend: "+31%",
    site: "5W PR",
  },
  {
    name: "Valence AI",
    industry: "Technology",
    contacts: 3,
    value: 92000,
    trend: "−6%",
    site: "5W PR",
  },
];
export const sites = [
  {
    name: "5W Media",
    domain: "5wmedia.com",
    visits: "28.4k",
    leads: 842,
    rate: "3.0%",
    status: "Healthy",
  },
  {
    name: "5W PR",
    domain: "5wpr.com",
    visits: "41.8k",
    leads: 1126,
    rate: "2.7%",
    status: "Healthy",
  },
  {
    name: "5W Insights",
    domain: "insights.5wmedia.com",
    visits: "8.2k",
    leads: 96,
    rate: "1.2%",
    status: "Needs review",
  },
];
export const campaignsSeed: Campaign[] = [
  {
    id: "campaign-001",
    name: "Fall Growth Playbook",
    channel: "Email",
    status: "Active",
    audience: "Growth leaders",
    sent: 8240,
    open: 46.8,
    click: 12.4,
    date: "Sep 21",
    color: "#fa6c60",
  },
  {
    id: "campaign-002",
    name: "The Signal / September",
    channel: "Newsletter",
    status: "Completed",
    audience: "All subscribers",
    sent: 18460,
    open: 39.2,
    click: 8.7,
    date: "Sep 17",
    color: "#aa90d5",
  },
  {
    id: "campaign-003",
    name: "Brand Momentum Series",
    channel: "Email",
    status: "Scheduled",
    audience: "New prospects",
    sent: 0,
    open: 0,
    click: 0,
    date: "Sep 28",
    color: "#e9bd65",
  },
  {
    id: "campaign-004",
    name: "Healthcare Outlook",
    channel: "Email",
    status: "Paused",
    audience: "Healthcare segment",
    sent: 3480,
    open: 32.6,
    click: 6.2,
    date: "Sep 08",
    color: "#a3d3bb",
  },
  {
    id: "campaign-005",
    name: "Welcome to 5W",
    channel: "Lifecycle",
    status: "Draft",
    audience: "New contacts",
    sent: 0,
    open: 0,
    click: 0,
    date: "Oct 02",
    color: "#a7c8ea",
  },
];
export const automationsSeed: Automation[] = [
  {
    id: "automation-001",
    name: "New lead welcome",
    trigger: "Form submitted",
    steps: ["Capture lead", "Wait 1 hour", "Send welcome", "Score engagement"],
    status: "Live",
    enrolled: 1248,
    completion: 78,
  },
  {
    id: "automation-002",
    name: "High intent follow-up",
    trigger: "Lead score > 80",
    steps: ["Qualify signal", "Assign owner", "Create task", "Notify sales"],
    status: "Live",
    enrolled: 284,
    completion: 91,
  },
  {
    id: "automation-003",
    name: "Re-engagement loop",
    trigger: "Inactive for 30 days",
    steps: ["Check consent", "Send insights", "Wait 3 days", "Branch by open"],
    status: "Paused",
    enrolled: 618,
    completion: 46,
  },
  {
    id: "automation-004",
    name: "Event attendee nurture",
    trigger: "Tag added: event",
    steps: ["Tag contact", "Send recap", "Invite to call"],
    status: "Draft",
    enrolled: 0,
    completion: 0,
  },
];
export const integrationsSeed: Integration[] = [
  {
    name: "Resend",
    category: "Email",
    description: "Campaign delivery and transactional email",
    connected: true,
    mark: "R",
  },
  {
    name: "Slack",
    category: "Messaging",
    description: "Lead alerts in your team channels",
    connected: true,
    mark: "S",
  },
  {
    name: "Google Analytics 4",
    category: "Analytics",
    description: "Traffic and conversion events",
    connected: true,
    mark: "G",
  },
  {
    name: "Webhooks",
    category: "Developer",
    description: "Send events to any endpoint",
    connected: true,
    mark: "W",
  },
  {
    name: "Twilio SMS",
    category: "Messaging",
    description: "Two-way conversations at scale",
    connected: false,
    mark: "T",
  },
  {
    name: "Zapier",
    category: "Automation",
    description: "Connect workflows across your stack",
    connected: false,
    mark: "Z",
  },
  {
    name: "NetSuite",
    category: "CRM",
    description: "Sync qualified leads and opportunities",
    connected: false,
    mark: "N",
  },
  {
    name: "Meta Ads",
    category: "Advertising",
    description: "Paid campaign performance",
    connected: false,
    mark: "M",
  },
];
export const segmentsSeed = [
  {
    name: "High intent prospects",
    rule: "Lead score above 75 · Last 30 days",
    count: 324,
    growth: "+14%",
  },
  {
    name: "Healthcare decision makers",
    rule: "Industry is Healthcare · Seniority is Director+",
    count: 186,
    growth: "+8%",
  },
  {
    name: "Dormant opportunities",
    rule: "No activity in 45 days · Status is Qualified",
    count: 72,
    growth: "−3%",
  },
  {
    name: "Newsletter engaged",
    rule: "Opened 2+ emails · Last 60 days",
    count: 2140,
    growth: "+22%",
  },
];
export const tags = [
  "High intent",
  "Design",
  "Enterprise",
  "Healthcare",
  "B2B",
  "Retail",
  "Technology",
  "Partners",
  "SaaS",
  "Event attendee",
];
export const forms = [
  {
    name: "Contact us",
    site: "5W Media",
    submissions: 428,
    rate: "5.8%",
    status: "Live",
  },
  {
    name: "Growth audit request",
    site: "5W PR",
    submissions: 186,
    rate: "8.4%",
    status: "Live",
  },
  {
    name: "Download the playbook",
    site: "5W Media",
    submissions: 742,
    rate: "12.1%",
    status: "Live",
  },
];
export const templates = [
  {
    name: "The Editorial Dispatch",
    type: "Newsletter",
    updated: "Sep 21",
    color: "#ffe1c7",
  },
  {
    name: "Welcome sequence",
    type: "Lifecycle",
    updated: "Sep 18",
    color: "#d8d3fb",
  },
  {
    name: "Event follow-up",
    type: "Outreach",
    updated: "Sep 12",
    color: "#d9eedc",
  },
];
export const activity = [
  {
    icon: "user",
    text: "Maya Chen reached qualified status",
    time: "12 min ago",
    type: "positive",
  },
  {
    icon: "mail",
    text: "Fall Growth Playbook crossed 8,000 sends",
    time: "2 hours ago",
    type: "positive",
  },
  {
    icon: "alert",
    text: "Healthcare Outlook was paused",
    time: "Yesterday",
    type: "warning",
  },
  {
    icon: "zap",
    text: "High intent follow-up enrolled 18 contacts",
    time: "Yesterday",
    type: "positive",
  },
  {
    icon: "user",
    text: "Theo Ramirez submitted Growth audit request",
    time: "Sep 19",
    type: "neutral",
  },
];
export const trend = [
  {
    day: "Sep 1",
    leads: 22,
    qualified: 8,
    visits: 1510,
    conversions: 42,
    spend: 820,
  },
  {
    day: "Sep 4",
    leads: 31,
    qualified: 11,
    visits: 1700,
    conversions: 55,
    spend: 940,
  },
  {
    day: "Sep 7",
    leads: 28,
    qualified: 10,
    visits: 1640,
    conversions: 51,
    spend: 880,
  },
  {
    day: "Sep 10",
    leads: 42,
    qualified: 16,
    visits: 1960,
    conversions: 72,
    spend: 1120,
  },
  {
    day: "Sep 13",
    leads: 38,
    qualified: 15,
    visits: 1840,
    conversions: 68,
    spend: 1040,
  },
  {
    day: "Sep 16",
    leads: 53,
    qualified: 20,
    visits: 2240,
    conversions: 89,
    spend: 1210,
  },
  {
    day: "Sep 19",
    leads: 48,
    qualified: 18,
    visits: 2110,
    conversions: 81,
    spend: 1170,
  },
  {
    day: "Sep 22",
    leads: 64,
    qualified: 25,
    visits: 2640,
    conversions: 104,
    spend: 1390,
  },
];
export const sources = [
  { name: "Organic search", leads: 948, share: 34, color: "#7188ef" },
  { name: "Paid social", leads: 738, share: 27, color: "#f47767" },
  { name: "Direct", leads: 516, share: 19, color: "#6fc6af" },
  { name: "Email", leads: 326, share: 12, color: "#eab966" },
  { name: "Referral", leads: 221, share: 8, color: "#ad8de1" },
];
export const adCampaigns = [
  {
    name: "Brand Awareness / Search",
    platform: "Google Ads",
    spend: 8420,
    clicks: 12780,
    leads: 384,
    cpl: 21.93,
    roas: "4.8×",
    trend: "+18%",
  },
  {
    name: "Growth Leaders / Social",
    platform: "Meta Ads",
    spend: 6240,
    clicks: 9480,
    leads: 296,
    cpl: 21.08,
    roas: "3.6×",
    trend: "+9%",
  },
  {
    name: "Healthcare Decision Makers",
    platform: "LinkedIn Ads",
    spend: 5100,
    clicks: 3160,
    leads: 142,
    cpl: 35.92,
    roas: "2.9×",
    trend: "−4%",
  },
  {
    name: "Retargeting / September",
    platform: "Google Ads",
    spend: 2840,
    clicks: 6410,
    leads: 198,
    cpl: 14.34,
    roas: "5.2×",
    trend: "+27%",
  },
];
export const proposals: {
  version: Version;
  name: string;
  subtitle: string;
  navigation: string;
  colors: string[];
  description: string;
}[] = [
  {
    version: "v1",
    name: "Operations Console",
    subtitle: "The technical command deck",
    navigation: "Visible service categories + search",
    colors: ["#122a47", "#2563eb", "#46d7e8", "#f3f7fc"],
    description:
      "A service-based workspace with dense operational signals, favorites, and direct access to each category.",
  },
  {
    version: "v2",
    name: "Modern Relationship CRM",
    subtitle: "People, beautifully organized",
    navigation: "Context rail + command palette",
    colors: ["#f7f5ef", "#252525", "#355dfb", "#d9d5cb"],
    description:
      "A calm relationship workspace with precise tables, contextual detail, and a prominent workflow canvas.",
  },
  {
    version: "v3",
    name: "Campaign Creative Studio",
    subtitle: "A creative production workbench",
    navigation: "Module tabs + campaign inspector",
    colors: ["#f7f3ee", "#a54d6b", "#cf745e", "#e9dfd7"],
    description:
      "A focused production workspace for campaigns, creative assets, audiences, and journeys.",
  },
  {
    version: "v4",
    name: "Revenue Command Center",
    subtitle: "Decisions with a pulse",
    navigation: "Compact sidebar + drawers",
    colors: ["#352a46", "#fff9f4", "#ed637d", "#55b7b1"],
    description:
      "A high-density revenue cockpit centered on pipeline, conversion, alerts, and action.",
  },
  {
    version: "v5",
    name: "Immersive AI Marketing Network",
    subtitle: "A calmer connected network",
    navigation: "Floating dock + full-screen map",
    colors: ["#101729", "#8995c9", "#6eaaa8", "#d9bfd1"],
    description:
      "A restrained ambient intelligence layer connecting signals, opportunities, and an embedded AI copilot.",
  },
];
export const navGroups: { label: string; items: [string, string][] }[] = [
  { label: "Overview", items: [["dashboard", "Dashboard"]] },
  {
    label: "Contacts",
    items: [
      ["contacts", "Contacts"],
      ["companies", "Companies"],
      ["segments", "Segments"],
      ["tags", "Tags"],
    ],
  },
  {
    label: "AI Agents",
    items: [
      ["new-biz-intake", "New Biz Intake"],
      ["media-pitch", "Media Pitch"],
    ],
  },
  {
    label: "Marketing",
    items: [
      ["campaigns", "Campaigns"],
      ["automations", "Automations"],
      ["email-templates", "Email templates"],
      ["funnels", "Funnels"],
      ["forms", "Forms"],
    ],
  },
  { label: "Network", items: [["sites", "Sites"]] },
  {
    label: "Analytics",
    items: [
      ["reports", "Reports"],
      ["traffic", "Traffic"],
      ["conversions", "Conversions"],
      ["paid-ads-utm", "Paid Ads UTM"],
      ["paid-ads-analytics", "Paid Ads Analytics"],
    ],
  },
  {
    label: "Settings",
    items: [
      ["integrations", "Integrations"],
      ["settings", "General settings"],
      ["settings/notifications", "Notifications"],
      ["settings/billing", "Billing"],
      ["settings/security", "Security"],
    ],
  },
];
