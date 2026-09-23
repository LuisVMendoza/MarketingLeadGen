import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  Grip,
  KanbanSquare,
  LayoutGrid,
  List,
  Mail,
  Megaphone,
  MoreHorizontal,
  MousePointerClick,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import {
  activity,
  adCampaigns,
  companies,
  forms,
  sites,
  sources,
  tags,
  templates,
  trend,
  type Contact,
} from "./data";
import { useApp } from "./app";
import { PeriodSelect } from "./layouts";

const money = (n: number) => `$${n.toLocaleString()}`;
function PageHead({
  eyebrow,
  title,
  desc,
  action,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc: string;
  action?: ReactNode;
  children?: ReactNode;
}) {
  const { version } = useApp();
  return (
    <header className={`page-head ${version === "v3" ? "editorial-head" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow || "5W MARKETING LEAD GEN"}</span>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="page-actions">
        {children}
        {action}
      </div>
    </header>
  );
}
function ActionButton({
  children,
  onClick,
  secondary = false,
}: {
  children: ReactNode;
  onClick: () => void;
  secondary?: boolean;
}) {
  return (
    <button
      className={`button ${secondary ? "subtle" : "primary"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
function Stat({
  label,
  value,
  delta,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  delta?: string;
  icon?: typeof Users;
  tone?: string;
}) {
  return (
    <div className={`stat-card ${tone || ""}`}>
      {Icon && (
        <span className="stat-icon">
          <Icon size={18} />
        </span>
      )}
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
      {delta && (
        <span
          className={`stat-delta ${delta.startsWith("âˆ’") || delta.startsWith("-") ? "negative" : ""}`}
        >
          {delta}
        </span>
      )}
    </div>
  );
}
function SectionTitle({
  title,
  meta,
  action,
}: {
  title: string;
  meta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {meta && <span>{meta}</span>}
      </div>
      {action}
    </div>
  );
}
function TrendChart({
  dataKey = "leads",
  color = "#6578e9",
  second = false,
  height = 240,
  type = "area",
}: {
  dataKey?: "leads" | "visits" | "conversions" | "spend";
  color?: string;
  second?: boolean;
  height?: number;
  type?: "area" | "bar";
}) {
  const { period } = useApp();
  const chartData =
    period === "Last 7 days"
      ? trend.slice(-3)
      : period === "Last 90 days"
        ? trend.map((d, i) => ({ ...d, day: "W" + (i + 1) }))
        : period === "This year"
          ? trend.map((d, i) => ({
              ...d,
              day: "M" + (i + 1),
              leads: d.leads * 5,
              qualified: d.qualified * 5,
              visits: d.visits * 5,
              conversions: d.conversions * 5,
              spend: d.spend * 5,
            }))
          : trend;
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === "bar" ? (
          <BarChart
            data={chartData}
            margin={{ top: 12, right: 8, bottom: 0, left: -24 }}
          >
            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              stroke="var(--chart-grid)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                color: "var(--text)",
              }}
            />
            <Bar dataKey={dataKey} fill={color} radius={[5, 5, 0, 0]} />
            {second && (
              <Bar
                dataKey="qualified"
                fill="var(--accent-2)"
                radius={[5, 5, 0, 0]}
              />
            )}
          </BarChart>
        ) : (
          <AreaChart
            data={chartData}
            margin={{ top: 12, right: 8, bottom: 0, left: -24 }}
          >
            <defs>
              <linearGradient
                id={`fade-${dataKey}`}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.34} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 6"
              vertical={false}
              stroke="var(--chart-grid)"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted)", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 12,
                color: "var(--text)",
              }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              fill={`url(#fade-${dataKey})`}
            />
            {second && (
              <Area
                type="monotone"
                dataKey="qualified"
                stroke="var(--accent-2)"
                strokeWidth={2}
                fill="none"
              />
            )}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
function SourceList() {
  return (
    <div className="source-list">
      {sources.map((s) => (
        <div key={s.name}>
          <div className="source-label">
            <span>
              <i style={{ background: s.color }} />
              {s.name}
            </span>
            <strong>{s.share}%</strong>
          </div>
          <div className="source-track">
            <i style={{ width: `${s.share * 2.7}%`, background: s.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
function ActivityList() {
  return (
    <div className="activity-list">
      {activity.map((a, i) => (
        <div className="activity-row" key={i}>
          <span className={`activity-icon ${a.type}`}>
            {a.icon === "mail" ? (
              <Mail size={16} />
            ) : a.icon === "alert" ? (
              <Bell size={16} />
            ) : a.icon === "zap" ? (
              <Zap size={16} />
            ) : (
              <Users size={16} />
            )}
          </span>
          <span>
            {a.text}
            <small>{a.time}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
function QuickLinks() {
  const { version, openModal } = useApp();
  return (
    <div className="quick-links">
      <Link to={`/${version}/contacts`}>
        <Users size={18} /> Explore contacts <ArrowRight size={16} />
      </Link>
      <button onClick={() => openModal("campaign")}>
        <Megaphone size={18} /> Create campaign <ArrowRight size={16} />
      </button>
      <Link to={`/${version}/reports`}>
        <BarChart3 size={18} /> Open reports <ArrowRight size={16} />
      </Link>
      <button onClick={() => openModal("automation")}>
        <Workflow size={18} /> Build automation <ArrowRight size={16} />
      </button>
    </div>
  );
}
function SiteNote() {
  const { site } = useApp();
  return (
    <span className="site-note">
      <Globe2 size={14} />
      {site}
    </span>
  );
}

function V3StudioDashboard() {
  const { campaigns, openModal } = useApp();
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(campaigns[0]?.id || "");
  const selectedCampaign =
    campaigns.find((c) => c.id === selected) || campaigns[0];
  const visible =
    filter === "All" ? campaigns : campaigns.filter((c) => c.status === filter);
  return (
    <div className="page dashboard dashboard-v3 v3-studio-dashboard">
      <PageHead
        eyebrow="MARKETING / CAMPAIGN WORKSPACE"
        title="Campaign studio"
        desc="Plan, produce, launch, and learn from one working space."
        action={
          <ActionButton onClick={() => openModal("campaign")}>
            <Plus size={17} /> New campaign
          </ActionButton>
        }
      >
        <Link className="button subtle" to="/v3/email-templates">
          Open templates <ArrowRight size={15} />
        </Link>
      </PageHead>
      <div className="v3-studio-meta">
        <span>
          <span className="v3-studio-dot" /> 5W Media workspace
        </span>
        <span>5 campaigns · 2 live automations · 3 forms</span>
      </div>
      <div className="v3-workbench">
        <section className="v3-production panel">
          <SectionTitle
            title="Production queue"
            meta="Select a campaign to inspect"
          />
          <div className="v3-filter-tabs">
            {["All", "Active", "Scheduled", "Draft"].map((name) => (
              <button
                key={name}
                className={filter === name ? "active" : ""}
                onClick={() => {
                  setFilter(name);
                  const next =
                    name === "All"
                      ? campaigns
                      : campaigns.filter(
                          (campaign) => campaign.status === name,
                        );
                  setSelected(next[0]?.id || campaigns[0]?.id || "");
                }}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="v3-work-items">
            {visible.map((campaign) => (
              <button
                key={campaign.id}
                className={
                  selectedCampaign?.id === campaign.id ? "selected" : ""
                }
                onClick={() => setSelected(campaign.id)}
              >
                <span
                  className="v3-work-mark"
                  style={{ background: campaign.color }}
                />
                <span className="v3-work-copy">
                  <strong>{campaign.name}</strong>
                  <small>
                    {campaign.channel} · {campaign.audience}
                  </small>
                </span>
                <span
                  className={`status status-${campaign.status.toLowerCase()}`}
                >
                  {campaign.status}
                </span>
                <ArrowRight size={15} />
              </button>
            ))}
            {visible.length === 0 && (
              <p className="hint">No campaigns in this stage.</p>
            )}
          </div>
          <Link className="v3-work-footer" to="/v3/campaigns">
            Open all campaigns <ArrowRight size={15} />
          </Link>
        </section>
        <aside className="v3-inspector panel">
          <div className="v3-inspector-heading">
            <span className="eyebrow">CAMPAIGN INSPECTOR</span>
            <span
              className={`status status-${selectedCampaign.status.toLowerCase()}`}
            >
              {selectedCampaign.status}
            </span>
          </div>
          <h2>{selectedCampaign.name}</h2>
          <p>
            {selectedCampaign.audience} · {selectedCampaign.channel}
          </p>
          <div className="v3-inspector-preview">
            <span>5W / CAMPAIGN PREVIEW</span>
            <strong>
              Ideas with a<br />
              clear next step.
            </strong>
            <i />
          </div>
          <div className="v3-inspector-stats">
            <span>
              <strong>{selectedCampaign.sent.toLocaleString()}</strong> sent
            </span>
            <span>
              <strong>{selectedCampaign.open}%</strong> opens
            </span>
            <span>
              <strong>{selectedCampaign.click}%</strong> clicks
            </span>
          </div>
          <button
            className="button subtle"
            onClick={() => openModal("template", selectedCampaign.name)}
          >
            Edit creative <ArrowRight size={15} />
          </button>
        </aside>
        <section className="v3-studio-metrics">
          <Stat
            label="Audience reached"
            value="38.2k"
            delta="+9.7%"
            icon={Users}
          />
          <Stat
            label="Average open rate"
            value="41.3%"
            delta="+4.8 pts"
            icon={Mail}
          />
          <Stat
            label="Active journeys"
            value="2"
            delta="1 draft"
            icon={Workflow}
          />
        </section>
        <section className="v3-journey panel">
          <SectionTitle
            title="Active journey"
            meta="New lead welcome"
            action={
              <Link to="/v3/automations">
                Open workflow <ArrowRight size={15} />
              </Link>
            }
          />
          <div className="v3-journey-flow">
            <span>
              <Zap size={17} /> Form submitted
            </span>
            <i />
            <span>
              <Clock3 size={17} /> Wait 1 hour
            </span>
            <i />
            <span>
              <Mail size={17} /> Send welcome
            </span>
          </div>
        </section>
        <section className="v3-studio-activity panel">
          <SectionTitle title="Recent activity" />
          <ActivityList />
        </section>
      </div>
    </div>
  );
}

function Dashboard() {
  const { version, contacts, campaigns, automations, openModal } = useApp();
  const navigate = useNavigate();
  const [customize, setCustomize] = useState(false);
  const [widgets, setWidgets] = useState({
    health: true,
    recent: true,
    actions: true,
  });
  const primary = (
    <ActionButton onClick={() => openModal("campaign")}>
      <Plus size={17} /> New campaign
    </ActionButton>
  );
  if (version === "v1")
    return (
      <div className="page dashboard dashboard-v1">
        <PageHead
          eyebrow="OPERATIONS / HOME"
          title="Good morning, Luis."
          desc="Your marketing operation at a glance. Pick up where you left off."
          action={primary}
        >
          <PeriodSelect />
          <button
            className="button subtle"
            onClick={() => setCustomize((v) => !v)}
          >
            <Settings2 size={16} /> Customize
          </button>
        </PageHead>
        {customize && (
          <div className="widget-config">
            <strong>Dashboard widgets</strong>
            {(["health", "recent", "actions"] as const).map((key) => (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={widgets[key]}
                  onChange={() => setWidgets((v) => ({ ...v, [key]: !v[key] }))}
                />
                {key === "health"
                  ? "System health"
                  : key === "recent"
                    ? "Recently viewed"
                    : "Quick actions"}
              </label>
            ))}
          </div>
        )}
        <div className="v1-dashboard-grid">
          <section className="panel v1-favorites">
            <SectionTitle
              title="Favorite services"
              meta="Your most used tools"
              action={
                <button
                  className="text-button"
                  onClick={() => setCustomize((v) => !v)}
                >
                  Manage <ArrowRight size={14} />
                </button>
              }
            />
            <div className="favorite-grid">
              <Link to="/v1/contacts">
                <Users />
                <strong>Contacts</strong>
                <small>2,749 total</small>
              </Link>
              <Link to="/v1/campaigns">
                <Megaphone />
                <strong>Campaigns</strong>
                <small>3 in progress</small>
              </Link>
              <Link to="/v1/automations">
                <Workflow />
                <strong>Automations</strong>
                <small>2 live</small>
              </Link>
              <Link to="/v1/reports">
                <BarChart3 />
                <strong>Reports</strong>
                <small>Live analytics</small>
              </Link>
            </div>
          </section>
          {widgets.health && (
            <section className="panel v1-health">
              <SectionTitle title="System health" />
              <div className="health-score">
                <span>
                  98.6<small>%</small>
                </span>
                <div>
                  <strong>Operational</strong>
                  <small>All core services running</small>
                </div>
              </div>
              <div className="health-row">
                <CheckCircle2 size={16} /> Lead capture <strong>Healthy</strong>
              </div>
              <div className="health-row">
                <CheckCircle2 size={16} /> Email delivery{" "}
                <strong>Healthy</strong>
              </div>
              <div className="health-row warning">
                <CircleHelp size={16} /> NetSuite sync <strong>Review</strong>
              </div>
            </section>
          )}
          <section className="panel v1-metrics">
            <SectionTitle
              title="Network performance"
              meta="Across all connected sites"
              action={<PeriodSelect />}
            />
            <div className="metric-strip">
              <Stat
                label="New leads"
                value="2,749"
                delta="+18.4% vs prior period"
                icon={Users}
              />
              <Stat
                label="Qualified"
                value="836"
                delta="+12.8%"
                icon={Target}
              />
              <Stat
                label="Campaign reach"
                value="38.2k"
                delta="+9.7%"
                icon={Send}
              />
              <Stat
                label="Conversion rate"
                value="3.8%"
                delta="+0.6 pts"
                icon={TrendingUp}
              />
            </div>
            <TrendChart second color="#3e79ed" height={260} />
          </section>
          {widgets.recent && (
            <section className="panel v1-recent">
              <SectionTitle title="Recently viewed" />
              <div className="recent-list">
                {[
                  [
                    "Maya Chen",
                    "Contact",
                    "12 minutes ago",
                    "contacts/contact-001",
                  ],
                  [
                    "Fall Growth Playbook",
                    "Campaign",
                    "2 hours ago",
                    "campaigns",
                  ],
                  [
                    "Paid Ads Analytics",
                    "Report",
                    "Yesterday",
                    "paid-ads-analytics",
                  ],
                  ["5W PR", "Site", "Sep 19", "sites"],
                ].map(([name, type, date, path]) => (
                  <Link to={`/v1/${path}`} key={name}>
                    <span className="recent-symbol">{type[0]}</span>
                    <span>
                      <strong>{name}</strong>
                      <small>{type}</small>
                    </span>
                    <time>{date}</time>
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </section>
          )}
          {widgets.actions && (
            <section className="panel v1-actions">
              <SectionTitle title="Quick actions" />
              <QuickLinks />
            </section>
          )}
        </div>
      </div>
    );
  if (version === "v2")
    return (
      <div className="page dashboard dashboard-v2 professional-dashboard">
        <PageHead
          eyebrow="WORKSPACE / OVERVIEW"
          title="Dashboard"
          desc="Lead activity, campaigns, and workflows across your connected sites."
          action={
            <ActionButton onClick={() => openModal("contact")}>
              <Plus size={17} /> New contact
            </ActionButton>
          }
        />
        <div className="professional-dashboard-toolbar">
          <span>
            <i /> Workspace overview
          </span>
          <PeriodSelect />
        </div>
        <div className="professional-metric-grid">
          {[
            {
              label: "Total leads",
              value: "2,749",
              change: "+18.4%",
              icon: Users,
            },
            {
              label: "Qualified leads",
              value: "836",
              change: "+12.8%",
              icon: Target,
            },
            {
              label: "Active campaigns",
              value: String(
                campaigns.filter((c) => c.status === "Active").length,
              ),
              change: "Across all channels",
              icon: Megaphone,
            },
            {
              label: "Live workflows",
              value: String(
                automations.filter((a) => a.status === "Live").length,
              ),
              change: "Running now",
              icon: Workflow,
            },
          ].map(({ label, value, change, icon: Icon }) => (
            <div className="professional-metric" key={label}>
              <div className="professional-metric-top">
                <span>{label}</span>
                <Icon size={18} />
              </div>
              <strong>{value}</strong>
              <small>{change}</small>
            </div>
          ))}
        </div>
        <div className="professional-dashboard-grid">
          <section className="panel professional-performance">
            <SectionTitle
              title="Lead performance"
              meta="New leads and conversions over time"
              action={
                <Link className="text-button" to="/v2/reports">
                  View reports <ArrowRight size={15} />
                </Link>
              }
            />
            <div className="professional-chart-legend">
              <span>
                <i /> New leads
              </span>
              <span>
                <i /> Qualified leads
              </span>
            </div>
            <TrendChart second color="#7048bf" height={254} />
          </section>
          <section className="panel professional-attention">
            <SectionTitle
              title="Needs attention"
              meta="Recent contact signals"
              action={
                <Link className="text-button" to="/v2/contacts">
                  All contacts <ArrowRight size={15} />
                </Link>
              }
            />
            <div className="attention-list">
              {contacts.slice(0, 4).map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => navigate(`/v2/contacts/${c.id}`)}
                >
                  <span className="avatar" style={{ background: c.color }}>
                    {c.initials}
                  </span>
                  <span>
                    <strong>{c.name}</strong>
                    <small>
                      {i === 0
                        ? "Requested a growth audit"
                        : i === 1
                          ? "Opened your proposal"
                          : i === 2
                            ? "No reply in 14 days"
                            : "Visited your services page"}
                    </small>
                  </span>
                  <span className="attention-time">{c.last}</span>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </section>
          <section className="panel professional-workflow">
            <SectionTitle
              title="Workflow canvas"
              meta="New lead welcome · Live automation"
              action={
                <Link className="text-button" to="/v2/automations">
                  Open workflow <ArrowRight size={15} />
                </Link>
              }
            />
            <div
              className="v2-flow-preview"
              aria-label="New lead welcome workflow"
            >
              <div>
                <span>
                  <Zap size={15} />
                </span>
                <strong>Form submitted</strong>
                <small>Trigger</small>
              </div>
              <i />
              <div>
                <span>
                  <Clock3 size={15} />
                </span>
                <strong>Wait 1 hour</strong>
                <small>Timing</small>
              </div>
              <i />
              <div>
                <span>
                  <Mail size={15} />
                </span>
                <strong>Send welcome</strong>
                <small>Action</small>
              </div>
            </div>
            <div className="v2-flow-footer">
              <span>
                <Users size={14} /> 1,248 enrolled
              </span>
              <span>
                <CheckCircle2 size={14} /> 78% completed
              </span>
            </div>
          </section>
          <section className="panel professional-campaigns">
            <SectionTitle
              title="Campaigns in progress"
              meta="Current delivery status"
              action={
                <Link className="text-button" to="/v2/campaigns">
                  View campaigns <ArrowRight size={15} />
                </Link>
              }
            />
            <div className="professional-campaign-list">
              {campaigns.slice(0, 3).map((campaign) => (
                <Link to="/v2/campaigns" key={campaign.id}>
                  <span className="professional-campaign-icon">
                    <Mail size={17} />
                  </span>
                  <span className="professional-campaign-copy">
                    <strong>{campaign.name}</strong>
                    <small>
                      {campaign.channel} · {campaign.audience}
                    </small>
                  </span>
                  <span
                    className={`professional-campaign-status status-${campaign.status.toLowerCase()}`}
                  >
                    {campaign.status}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  if (version === "v3") return <V3StudioDashboard />;
  if (version === "v4")
    return (
      <div className="page dashboard dashboard-v4">
        <PageHead
          eyebrow="REVENUE OPERATIONS"
          title="Revenue command center"
          desc="The numbers, signals, and next actions moving your pipeline."
          action={
            <ActionButton onClick={() => openModal("contact")}>
              <Plus size={17} /> Add lead
            </ActionButton>
          }
        >
          <PeriodSelect />
        </PageHead>
        <div className="v4-alert">
          <span>
            <Bell size={18} />
          </span>
          <div>
            <strong>3 opportunities need attention</strong>
            <p>
              Follow up on qualified leads and review the NetSuite sync before
              todayâ€™s standup.
            </p>
          </div>
          <Link to="/v4/contacts">
            Review now <ArrowRight size={16} />
          </Link>
        </div>
        <div className="metric-strip v4-metrics">
          <Stat
            label="Pipeline value"
            value="$482.6k"
            delta="+21.7%"
            icon={TrendingUp}
          />
          <Stat
            label="Qualified leads"
            value="836"
            delta="+12.8%"
            icon={Users}
          />
          <Stat label="Win rate" value="24.6%" delta="+2.3 pts" icon={Target} />
          <Stat
            label="Cost per lead"
            value="$27.42"
            delta="âˆ’8.4%"
            icon={MousePointerClick}
          />
        </div>
        <div className="v4-dashboard-grid">
          <section className="panel v4-pipeline">
            <SectionTitle
              title="Pipeline by stage"
              meta="Current quarter"
              action={
                <Link className="text-button" to="/v4/contacts">
                  View deals <ArrowRight size={15} />
                </Link>
              }
            />
            <div className="pipeline-bars">
              {[
                ["New", "1,248", 86],
                ["Qualified", "836", 67],
                ["Proposal", "412", 43],
                ["Negotiation", "186", 28],
                ["Won", "92", 18],
              ].map(([name, count, width], i) => (
                <div key={name}>
                  <span>{name}</span>
                  <div>
                    <i
                      style={{
                        width: `${width}%`,
                        background: [
                          "#f3b977",
                          "#ef8790",
                          "#bb82cd",
                          "#70b7bd",
                          "#54aa94",
                        ][i],
                      }}
                    />
                  </div>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </section>
          <section className="panel v4-funnel">
            <SectionTitle title="Conversion funnel" />
            <div className="funnel-art">
              <div>
                42.8k <small>Visitors</small>
              </div>
              <div>
                2,749 <small>Leads</small>
              </div>
              <div>
                836 <small>Qualified</small>
              </div>
              <div>
                92 <small>Customers</small>
              </div>
            </div>
          </section>
          <section className="panel v4-revenue-chart">
            <SectionTitle title="Acquisition trend" action={<PeriodSelect />} />
            <TrendChart color="#ec6880" second height={250} />
          </section>
          <section className="panel v4-activity">
            <SectionTitle title="Live activity" />
            <ActivityList />
          </section>
        </div>
      </div>
    );
  return (
    <div className="page dashboard dashboard-v5">
      <PageHead
        eyebrow="NETWORK INTELLIGENCE / LIVE"
        title="Every signal is connected."
        desc="See where momentum is building, and ask your copilot what to do next."
        action={
          <Link className="button primary" to="/v5/reports">
            <Sparkles size={17} /> Explore signals
          </Link>
        }
      />
      <div className="v5-dashboard-grid">
        <section className="v5-network panel">
          <div className="v5-network-top">
            <span className="eyebrow">
              <span className="live-pulse" /> NETWORK MAP
            </span>
            <span>3 sites Â· 2,749 people Â· 5 campaigns</span>
          </div>
          <div className="network-canvas">
            <span className="network-link l1" />
            <span className="network-link l2" />
            <span className="network-link l3" />
            <span className="network-link l4" />
            <span className="network-node center">
              <b>5W</b>
              <small>Network core</small>
            </span>
            <Link to="/v5/contacts" className="network-node n1">
              <Users />
              <b>People</b>
              <small>2,749</small>
            </Link>
            <Link to="/v5/campaigns" className="network-node n2">
              <Megaphone />
              <b>Campaigns</b>
              <small>5 active & planned</small>
            </Link>
            <Link to="/v5/sites" className="network-node n3">
              <Globe2 />
              <b>Sites</b>
              <small>3 connected</small>
            </Link>
            <Link to="/v5/reports" className="network-node n4">
              <Activity />
              <b>Signals</b>
              <small>+18.4%</small>
            </Link>
          </div>
          <div className="v5-network-foot">
            <span>
              <i /> Signals updating in real time
            </span>
            <Link to="/v5/contacts">
              Open network <ArrowRight size={15} />
            </Link>
          </div>
        </section>
        <section className="v5-ai panel">
          <div className="v5-ai-head">
            <span className="ai-orb">
              <Sparkles size={21} />
            </span>
            <span>
              <strong>5W Intelligence</strong>
              <small>Your marketing copilot</small>
            </span>
            <span className="ai-online">ONLINE</span>
          </div>
          <p className="ai-greeting">
            Good morning, Luis. Your qualified leads are up{" "}
            <strong>12.8%</strong>. The biggest opportunity is the Healthcare
            segment.
          </p>
          <div className="ai-suggestions">
            <button onClick={() => navigate("/v5/paid-ads-analytics")}>
              What is driving paid growth? <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate("/v5/contacts")}>
              Show high intent contacts <ArrowRight size={14} />
            </button>
            <button onClick={() => navigate("/v5/automations")}>
              Optimize follow-up timing <ArrowRight size={14} />
            </button>
          </div>
          <AiInput />
        </section>
        <section className="v5-signal-strip">
          <div>
            <span>LEAD SIGNALS</span>
            <strong>2,749</strong>
            <small>â†‘ 18.4% this month</small>
          </div>
          <div>
            <span>QUALIFIED</span>
            <strong>836</strong>
            <small>â†‘ 12.8% this month</small>
          </div>
          <div>
            <span>CAMPAIGN REACH</span>
            <strong>38.2k</strong>
            <small>â†‘ 9.7% this month</small>
          </div>
          <div>
            <span>OPPORTUNITIES</span>
            <strong>12</strong>
            <small>3 need attention</small>
          </div>
        </section>
        <section className="v5-stream panel">
          <SectionTitle
            title="Signal stream"
            action={
              <Link to="/v5/reports">
                View all <ArrowRight size={15} />
              </Link>
            }
          />
          <ActivityList />
        </section>
        <section className="v5-pattern panel">
          <SectionTitle title="Momentum pattern" action={<PeriodSelect />} />
          <TrendChart color="#9aa6d4" height={225} />
        </section>
      </div>
    </div>
  );
}

function AiInput() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    const query = text;
    setText("");
    window.setTimeout(() => {
      setAnswer(
        `Based on current signals, ${query.toLowerCase().includes("paid") ? "paid social generated 27% of leads with improving cost efficiency" : "focus on high intent contacts and the active welcome flow this week"}. This is a simulated insight for the prototype.`,
      );
      setLoading(false);
    }, 650);
  };
  return (
    <>
      <form className="ai-input" onSubmit={ask}>
        <input
          placeholder="Ask about your network..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Ask AI copilot"
        />
        <button type="submit" aria-label="Send question">
          <ArrowRight size={18} />
        </button>
      </form>
      {loading && <p className="ai-response">Analyzing signalsâ€¦</p>}
      {answer && <p className="ai-response">{answer}</p>}
    </>
  );
}

function Contacts() {
  const { version, contacts, site, openModal, setContactDrawer } = useApp();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [view, setView] = useState<"table" | "cards" | "kanban" | "timeline">(
    version === "v3" || version === "v5" ? "cards" : "table",
  );
  const navigate = useNavigate();
  const visible = contacts.filter(
    (c) =>
      (site === "All sites" || c.site === site) &&
      (status === "All statuses" || c.status === status) &&
      `${c.name} ${c.email} ${c.company} ${c.source}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const open = (c: Contact) =>
    version === "v4" || version === "v2"
      ? setContactDrawer(c.id)
      : navigate(`/${version}/contacts/${c.id}`);
  return (
    <div className={`page contacts-page contacts-${version}`}>
      <PageHead
        eyebrow={
          version === "v2" ? "RELATIONSHIPS / PEOPLE" : "CONTACTS / AUDIENCE"
        }
        title={version === "v3" ? "Know your people." : "Contacts"}
        desc={`${visible.length} contacts in view Â· ${site}. Keep every relationship moving forward.`}
        action={
          <ActionButton onClick={() => openModal("contact")}>
            <Plus size={17} /> Add contact
          </ActionButton>
        }
      >
        <ActionButton secondary onClick={() => openModal("import")}>
          <Download size={16} /> Import CSV
        </ActionButton>
      </PageHead>
      <div className="contact-overview">
        <Stat label="All contacts" value="2,749" delta="+18.4%" icon={Users} />
        <Stat label="Qualified" value="836" delta="+12.8%" icon={Target} />
        <Stat label="Customers" value="284" delta="+7.1%" icon={CheckCircle2} />
        <Stat
          label="Needs attention"
          value="72"
          delta="12 due this week"
          icon={Clock3}
        />
      </div>
      <div className="content-panel contacts-container">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={18} />
            <input
              placeholder="Search people, companies, email..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search contacts"
            />
          </div>
          <label className="select-wrap filter-select">
            <Filter size={15} />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter status"
            >
              <option>All statuses</option>
              <option>New</option>
              <option>Qualified</option>
              <option>Nurturing</option>
              <option>Customer</option>
              <option>At risk</option>
            </select>
            <ChevronDown size={15} />
          </label>
          <div className="view-switch" role="group" aria-label="Contact view">
            <button
              className={view === "table" ? "active" : ""}
              onClick={() => setView("table")}
              title="Table view"
            >
              <List size={17} />
            </button>
            <button
              className={view === "cards" ? "active" : ""}
              onClick={() => setView("cards")}
              title="Cards view"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              className={view === "kanban" ? "active" : ""}
              onClick={() => setView("kanban")}
              title="Kanban view"
            >
              <KanbanSquare size={17} />
            </button>
            <button
              className={view === "timeline" ? "active" : ""}
              onClick={() => setView("timeline")}
              title="Timeline view"
            >
              <Clock3 size={17} />
            </button>
          </div>
        </div>
        {visible.length === 0 ? (
          <EmptyState
            title="No contacts match this view"
            text="Try a different search, status, or site to see your relationships."
            action={
              <button
                className="button primary"
                onClick={() => {
                  setQuery("");
                  setStatus("All statuses");
                }}
              >
                Clear filters
              </button>
            }
          />
        ) : view === "table" ? (
          <div className="table-scroll">
            <table className="data-table contacts-table">
              <thead>
                <tr>
                  <th>Contact</th>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Source</th>
                  <th>Potential</th>
                  <th>Last touch</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {visible.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => open(c)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") open(c);
                    }}
                  >
                    <td>
                      <span className="person-cell">
                        <span
                          className="avatar"
                          style={{ background: c.color }}
                        >
                          {c.initials}
                        </span>
                        <span>
                          <strong>{c.name}</strong>
                          <small>{c.email}</small>
                        </span>
                      </span>
                    </td>
                    <td>
                      {c.company}
                      <small className="table-sub">{c.role}</small>
                    </td>
                    <td>
                      <span
                        className={`status status-${c.status.toLowerCase().replace(" ", "-")}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.source}</td>
                    <td>{money(c.value)}</td>
                    <td>{c.last}</td>
                    <td>
                      <ArrowRight size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : view === "cards" ? (
          <div className="contact-cards">
            {visible.map((c) => (
              <button
                className="contact-card"
                key={c.id}
                onClick={() => open(c)}
              >
                <div>
                  <span className="avatar big" style={{ background: c.color }}>
                    {c.initials}
                  </span>
                  <span
                    className={`status status-${c.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {c.status}
                  </span>
                </div>
                <h3>{c.name}</h3>
                <p>
                  {c.role} Â· {c.company}
                </p>
                <span className="contact-email">{c.email}</span>
                <div className="contact-card-foot">
                  <span>{c.tags[0] || "Contact"}</span>
                  <small>{c.last}</small>
                  <ArrowRight size={17} />
                </div>
              </button>
            ))}
          </div>
        ) : view === "kanban" ? (
          <div className="kanban-board">
            {["New", "Nurturing", "Qualified", "Customer", "At risk"].map(
              (s) => (
                <div className="kanban-column" key={s}>
                  <header>
                    <span
                      className={`status status-${s.toLowerCase().replace(" ", "-")}`}
                    >
                      {s}
                    </span>
                    <strong>
                      {visible.filter((c) => c.status === s).length}
                    </strong>
                  </header>
                  {visible
                    .filter((c) => c.status === s)
                    .map((c) => (
                      <button key={c.id} onClick={() => open(c)}>
                        <span
                          className="avatar"
                          style={{ background: c.color }}
                        >
                          {c.initials}
                        </span>
                        <strong>{c.name}</strong>
                        <small>{c.company}</small>
                        <span>{money(c.value)}</span>
                      </button>
                    ))}
                </div>
              ),
            )}
          </div>
        ) : (
          <div className="contact-timeline">
            {visible.map((c) => (
              <button key={c.id} onClick={() => open(c)}>
                <span className="timeline-dot" />
                <time>{c.last}</time>
                <span className="avatar" style={{ background: c.color }}>
                  {c.initials}
                </span>
                <span>
                  <strong>{c.name}</strong>
                  <small>
                    {c.source} Â· {c.company}
                  </small>
                </span>
                <span
                  className={`status status-${c.status.toLowerCase().replace(" ", "-")}`}
                >
                  {c.status}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="table-footer">
          <span>
            Showing {visible.length} of {contacts.length} preview contacts
          </span>
          <button onClick={() => openModal("segment")}>
            Save as segment <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <span>
        <Search size={25} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
function ContactDetail({ id }: { id: string }) {
  const { contacts, version, openModal, toast, updateContact } = useApp();
  const contact = contacts.find((c) => c.id === id);
  const [tab, setTab] = useState("Activity");
  const [editing, setEditing] = useState(false);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");
  const saveEditing = () => {
    if (!contact) return;
    if (editing) {
      updateContact(contact.id, {
        email: edits.Email || contact.email,
        company: edits.Company || contact.company,
        role: edits["Job title"] || contact.role,
        value: Number(
          (edits["Potential value"] || String(contact.value)).replace(
            /[^0-9.]/g,
            "",
          ),
        ),
      });
      setEditing(false);
    } else {
      setEdits({
        Email: contact.email,
        Company: contact.company,
        "Job title": contact.role,
        "Potential value": String(contact.value),
      });
      setEditing(true);
    }
  };
  if (!contact)
    return (
      <div className="page">
        <PageHead
          title="Contact not found"
          desc="This record is unavailable in the prototype."
          action={
            <Link className="button primary" to={`/${version}/contacts`}>
              Back to contacts
            </Link>
          }
        />
      </div>
    );
  return (
    <div className="page detail-page">
      <div className="detail-breadcrumb">
        <Link to={`/${version}/contacts`}>Contacts</Link>
        <span>/</span>
        <span>{contact.name}</span>
      </div>
      <div className="detail-hero">
        <span className="avatar xl" style={{ background: contact.color }}>
          {contact.initials}
        </span>
        <div>
          <span className="eyebrow">CONTACT PROFILE</span>
          <h1>{contact.name}</h1>
          <p>
            {contact.role} at {contact.company} <span>Â·</span> {contact.site}
          </p>
          <div className="detail-tags">
            <span
              className={`status status-${contact.status.toLowerCase().replace(" ", "-")}`}
            >
              {contact.status}
            </span>
            {contact.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="detail-buttons">
          <button
            className="button primary"
            onClick={() => toast(`Email draft started for ${contact.name}`)}
          >
            <Mail size={16} /> Email contact
          </button>
          <button className="button subtle" onClick={saveEditing}>
            <Settings2 size={16} /> {editing ? "Done" : "Edit fields"}
          </button>
          <button
            className="icon-button"
            onClick={() => openModal("confirm", contact.name)}
            aria-label="More contact actions"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
      <div className="detail-layout">
        <div>
          <div className="detail-tabs">
            {["Activity", "Campaigns", "Forms", "Notes"].map((t) => (
              <button
                key={t}
                className={tab === t ? "active" : ""}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <section className="panel detail-main">
            {tab === "Activity" ? (
              <>
                <SectionTitle
                  title="Recent activity"
                  meta="A timeline of every meaningful touchpoint"
                />
                <div className="detail-events">
                  <div>
                    <span>
                      <Check size={16} />
                    </span>
                    <div>
                      <strong>Lead qualified by AI intake</strong>
                      <p>
                        Score 84 Â· Strong fit based on company size and intent.
                      </p>
                      <small>Today at 9:42 AM</small>
                    </div>
                  </div>
                  <div>
                    <span>
                      <Mail size={16} />
                    </span>
                    <div>
                      <strong>Opened Fall Growth Playbook</strong>
                      <p>Clicked through to the services overview.</p>
                      <small>Sep 21 at 2:18 PM</small>
                    </div>
                  </div>
                  <div>
                    <span>
                      <Globe2 size={16} />
                    </span>
                    <div>
                      <strong>Visited {contact.site}</strong>
                      <p>3 page views Â· 4 minutes 21 seconds.</p>
                      <small>Sep 19 at 11:07 AM</small>
                    </div>
                  </div>
                  <div>
                    <span>
                      <Users size={16} />
                    </span>
                    <div>
                      <strong>Contact created</strong>
                      <p>Source: {contact.source}.</p>
                      <small>Sep 15 at 10:14 AM</small>
                    </div>
                  </div>
                </div>
              </>
            ) : tab === "Campaigns" ? (
              <>
                <SectionTitle title="Campaign engagement" />
                <div className="simple-list">
                  <div>
                    Fall Growth Playbook <span>Opened Â· Clicked</span>
                  </div>
                  <div>
                    The Signal / September <span>Opened</span>
                  </div>
                </div>
              </>
            ) : tab === "Forms" ? (
              <>
                <SectionTitle title="Form submissions" />
                <div className="simple-list">
                  <div>
                    Growth audit request <span>Sep 19 Â· {contact.site}</span>
                  </div>
                  <div>
                    Contact us <span>Sep 15 Â· {contact.site}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <SectionTitle title="Notes" />
                <textarea
                  className="note-input"
                  placeholder="Add a note about this relationship..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <button
                  className="button primary"
                  onClick={() => toast("Note saved in this session")}
                >
                  Save note
                </button>
                {note && <p className="hint">Draft note: {note}</p>}
              </>
            )}
          </section>
        </div>
        <aside className="detail-side">
          <section className="panel">
            <SectionTitle title="About" />
            <dl className="profile-fields">
              {[
                ["Email", contact.email],
                ["Company", contact.company],
                ["Job title", contact.role],
                ["Source", contact.source],
                ["Site", contact.site],
                ["Potential value", money(contact.value)],
                ["Last touch", contact.last],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>
                    {editing &&
                    [
                      "Email",
                      "Company",
                      "Job title",
                      "Potential value",
                    ].includes(k) ? (
                      <input
                        value={edits[k] ?? v}
                        onChange={(e) =>
                          setEdits({ ...edits, [k]: e.target.value })
                        }
                      />
                    ) : (
                      v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="panel">
            <SectionTitle title="Next best action" />
            <div className="recommendation">
              <Sparkles size={20} />
              <p>Send a personalized follow-up while engagement is high.</p>
              <button onClick={() => toast("Follow-up task created")}>
                Create task <ArrowRight size={15} />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Campaigns() {
  const { version, campaigns, openModal, toast } = useApp();
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? campaigns : campaigns.filter((c) => c.status === filter);
  return (
    <div className={`page campaigns-page campaigns-${version}`}>
      <PageHead
        eyebrow="MARKETING / CAMPAIGNS"
        title="Campaigns"
        desc="Create, deliver, and measure campaigns that move people."
        action={
          <ActionButton onClick={() => openModal("campaign")}>
            <Plus size={17} /> New campaign
          </ActionButton>
        }
      />
      <div className="campaign-summary">
        <Stat
          label="Recipients reached"
          value="38.2k"
          delta="+9.7%"
          icon={Users}
        />
        <Stat
          label="Avg. open rate"
          value="41.3%"
          delta="+4.8 pts"
          icon={Mail}
        />
        <Stat
          label="Click-through"
          value="9.7%"
          delta="+1.2 pts"
          icon={MousePointerClick}
        />
        <Stat
          label="Active campaigns"
          value="3"
          delta="1 scheduled"
          icon={Megaphone}
        />
      </div>
      {version === "v3" && (
        <div className="v3-campaign-tools">
          <div>
            <span className="eyebrow">PRODUCTION DESK</span>
            <strong>Move work from draft to delivery.</strong>
            <p>Review creative, audience, and workflow before launch.</p>
          </div>
          <button
            className="button subtle"
            onClick={() => openModal("template", "Fall Growth Playbook")}
          >
            <Mail size={16} /> Edit creative
          </button>
          <Link className="button subtle" to="/v3/automations">
            <Workflow size={16} /> Open journey
          </Link>
        </div>
      )}
      <div className="content-panel">
        <div className="table-toolbar">
          <div className="tab-strip">
            {["All", "Active", "Scheduled", "Draft", "Paused", "Completed"].map(
              (s) => (
                <button
                  className={filter === s ? "active" : ""}
                  key={s}
                  onClick={() => setFilter(s)}
                >
                  {s}{" "}
                  <span>
                    {s === "All"
                      ? campaigns.length
                      : campaigns.filter((c) => c.status === s).length}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title={`No ${filter.toLowerCase()} campaigns`}
            text="Try another status, or create a campaign to get started."
            action={
              <button
                className="button primary"
                onClick={() => openModal("campaign")}
              >
                Create campaign
              </button>
            }
          />
        ) : version === "v3" || version === "v5" ? (
          <div className="campaign-cards">
            {filtered.map((c, i) => (
              <article className="campaign-card" key={c.id}>
                <div className="campaign-art" style={{ background: c.color }}>
                  <span>5W / {c.channel.toUpperCase()}</span>
                  <strong>
                    {i % 2 === 0
                      ? "Move ideas forward."
                      : "A fresh perspective."}
                  </strong>
                  <i />
                </div>
                <div className="campaign-card-body">
                  <div>
                    <span className={`status status-${c.status.toLowerCase()}`}>
                      {c.status}
                    </span>
                    <small>{c.date}</small>
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.audience}</p>
                  <div className="campaign-card-metrics">
                    <span>
                      <strong>{c.sent.toLocaleString()}</strong> sent
                    </span>
                    <span>
                      <strong>{c.open}%</strong> opens
                    </span>
                    <span>
                      <strong>{c.click}%</strong> clicks
                    </span>
                  </div>
                  <button onClick={() => toast(`${c.name} opened for review`)}>
                    View campaign <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Status</th>
                  <th>Audience</th>
                  <th>Recipients</th>
                  <th>Open rate</th>
                  <th>Click rate</th>
                  <th>Last activity</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => toast(`${c.name} opened for review`)}
                  >
                    <td>
                      <span
                        className="campaign-name-dot"
                        style={{ background: c.color }}
                      />
                      <strong>{c.name}</strong>
                      <small className="table-sub">{c.channel}</small>
                    </td>
                    <td>
                      <span
                        className={`status status-${c.status.toLowerCase()}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td>{c.audience}</td>
                    <td>{c.sent.toLocaleString()}</td>
                    <td>{c.open}%</td>
                    <td>{c.click}%</td>
                    <td>{c.date}</td>
                    <td>
                      <ArrowRight size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Automations() {
  const { version, automations, openModal, toast } = useApp();
  const [selected, setSelected] = useState(automations[0]?.id || "");
  const active = automations.find((a) => a.id === selected) || automations[0];
  return (
    <div className={`page automations-page automations-${version}`}>
      <PageHead
        eyebrow="MARKETING / WORKFLOWS"
        title="Automations"
        desc="Trigger-based workflows that nurture leads at exactly the right moment."
        action={
          <ActionButton onClick={() => openModal("automation")}>
            <Plus size={17} /> Create automation
          </ActionButton>
        }
      />
      <div className="automation-summary">
        <Stat
          label="Live workflows"
          value="2"
          delta="+1 this month"
          icon={Workflow}
        />
        <Stat
          label="Contacts enrolled"
          value="2,150"
          delta="+17.2%"
          icon={Users}
        />
        <Stat
          label="Avg. completion"
          value="72%"
          delta="+6 pts"
          icon={CheckCircle2}
        />
        <Stat
          label="Time saved"
          value="48 hrs"
          delta="This month"
          icon={Clock3}
        />
      </div>
      <div className="automation-layout">
        <section className="content-panel automation-list">
          <SectionTitle
            title="Your workflows"
            meta={`${automations.length} workflows`}
          />
          {automations.map((a) => (
            <button
              className={selected === a.id ? "selected" : ""}
              key={a.id}
              onClick={() => setSelected(a.id)}
            >
              <span className="automation-list-icon">
                <Workflow size={19} />
              </span>
              <span>
                <strong>{a.name}</strong>
                <small>
                  {a.trigger} Â· {a.steps.length} steps
                </small>
              </span>
              <span className={`status status-${a.status.toLowerCase()}`}>
                {a.status}
              </span>
            </button>
          ))}
          <button
            className="automation-new"
            onClick={() => openModal("automation")}
          >
            <Plus size={18} /> New workflow
          </button>
        </section>
        <section className="content-panel automation-canvas">
          <div className="automation-canvas-head">
            <div>
              <span className="eyebrow">WORKFLOW CANVAS</span>
              <h2>{active?.name}</h2>
              <p>Triggered when: {active?.trigger}</p>
            </div>
            <span className={`status status-${active?.status.toLowerCase()}`}>
              {active?.status}
            </span>
          </div>
          <div className="flow-canvas">
            {active?.steps.map((step, i) => (
              <div className="flow-step-wrap" key={i}>
                <div className={`flow-step step-${i}`}>
                  <span>
                    {i === 0 ? (
                      <Zap size={18} />
                    ) : i === active.steps.length - 1 ? (
                      <Check size={18} />
                    ) : (
                      <Mail size={18} />
                    )}
                  </span>
                  <small>
                    {i === 0
                      ? "TRIGGER"
                      : i === active.steps.length - 1
                        ? "OUTCOME"
                        : `STEP 0${i}`}
                  </small>
                  <strong>{step}</strong>
                  <span className="flow-step-detail">
                    {i === 0
                      ? "When a contact matches"
                      : i === active.steps.length - 1
                        ? "Measure response"
                        : "Personalized for each lead"}
                  </span>
                </div>
                {i < active.steps.length - 1 && (
                  <div className="flow-connector">
                    <i />
                    <ChevronDown size={17} />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="automation-canvas-footer">
            <span>
              <Users size={16} /> {active?.enrolled.toLocaleString()} enrolled
            </span>
            <span>
              <CheckCircle2 size={16} /> {active?.completion}% completion
            </span>
            <button onClick={() => toast("Workflow preview opened")}>
              Preview workflow <ArrowRight size={15} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Reports() {
  const { version } = useApp();
  const [tab, setTab] = useState("Acquisition");
  return (
    <div className={`page reports-page reports-${version}`}>
      <PageHead
        eyebrow="ANALYTICS / REPORTS"
        title="Reports"
        desc="A connected view of audience growth, engagement, and conversion."
        action={
          <ActionButton secondary onClick={() => window.print()}>
            <Download size={16} /> Export report
          </ActionButton>
        }
      >
        <PeriodSelect />
      </PageHead>
      <div className="reports-tabs">
        {["Acquisition", "Engagement", "Conversion", "Revenue"].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="report-stats">
        <Stat
          label={tab === "Revenue" ? "Pipeline value" : "Visitors"}
          value={tab === "Revenue" ? "$482.6k" : "78.4k"}
          delta="+18.4%"
          icon={Globe2}
        />
        <Stat label="New contacts" value="2,749" delta="+18.4%" icon={Users} />
        <Stat
          label={tab === "Engagement" ? "Email open rate" : "Qualified leads"}
          value={tab === "Engagement" ? "41.3%" : "836"}
          delta="+12.8%"
          icon={Target}
        />
        <Stat
          label="Conversion rate"
          value="3.8%"
          delta="+0.6 pts"
          icon={TrendingUp}
        />
      </div>
      <div className="reports-grid">
        <section className="panel report-trend">
          <SectionTitle
            title={`${tab} over time`}
            meta="Compared with the previous period"
          />
          <TrendChart
            dataKey={
              tab === "Revenue"
                ? "conversions"
                : tab === "Engagement"
                  ? "visits"
                  : "leads"
            }
            second
            color={
              version === "v3"
                ? "#ee7568"
                : version === "v5"
                  ? "#9aa6d4"
                  : version === "v4"
                    ? "#ec6880"
                    : "#5a78e9"
            }
            height={300}
          />
        </section>
        <section className="panel report-sources">
          <SectionTitle
            title="Lead sources"
            meta="Share of all captured leads"
          />
          <SourceList />
        </section>
        <section className="panel report-sites">
          <SectionTitle title="Performance by site" />
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Site</th>
                  <th>Visits</th>
                  <th>Leads</th>
                  <th>Conv. rate</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((s) => (
                  <tr key={s.name}>
                    <td>
                      <strong>{s.name}</strong>
                      <small className="table-sub">{s.domain}</small>
                    </td>
                    <td>{s.visits}</td>
                    <td>{s.leads}</td>
                    <td>{s.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="panel report-insights">
          <SectionTitle title="Insights" />
          <div className="insight-callout">
            <Sparkles size={20} />
            <strong>Organic is your strongest driver.</strong>
            <p>
              Search generated 34% of new leads, up 8 points from the previous
              period.
            </p>
          </div>
          <div className="insight-callout warning">
            <ArrowDownRight size={20} />
            <strong>Watch healthcare paid spend.</strong>
            <p>
              Cost per lead rose 4% on LinkedIn while conversion held steady.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function PaidAds() {
  const { version, toast } = useApp();
  const [tab, setTab] = useState("Performance");
  return (
    <div className={`page paid-page paid-${version}`}>
      <PageHead
        eyebrow="ANALYTICS / PAID MEDIA"
        title="Paid Ads Analytics"
        desc="Track tagged campaigns, quality, and return across your connected channels."
        action={
          <ActionButton
            secondary
            onClick={() => toast("Paid ads report exported")}
          >
            <Download size={16} /> Export
          </ActionButton>
        }
      >
        <PeriodSelect />
      </PageHead>
      <div className="paid-stats">
        <Stat label="Ad spend" value="$22.6k" delta="+8.2%" icon={Megaphone} />
        <Stat label="Paid leads" value="1,020" delta="+14.7%" icon={Users} />
        <Stat
          label="Cost per lead"
          value="$22.16"
          delta="âˆ’5.8%"
          icon={Target}
        />
        <Stat
          label="Return on ad spend"
          value="4.1Ã—"
          delta="+0.6Ã—"
          icon={TrendingUp}
        />
        <Stat
          label="Paid conversion"
          value="3.9%"
          delta="+0.4 pts"
          icon={MousePointerClick}
        />
      </div>
      <div className="reports-tabs">
        {[
          "Performance",
          "By campaign",
          "Landing pages",
          "Leads",
          "Google Analytics",
        ].map((t) => (
          <button
            key={t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="paid-layout">
        <section className="panel paid-trend">
          <SectionTitle
            title={tab === "Performance" ? "Spend and lead volume" : tab}
            meta="Daily trend Â· All channels"
          />
          <TrendChart
            dataKey={
              tab === "Landing pages"
                ? "visits"
                : tab === "Leads"
                  ? "leads"
                  : "spend"
            }
            second
            color={
              version === "v4"
                ? "#ec6880"
                : version === "v5"
                  ? "#9aa6d4"
                  : "#6578e9"
            }
            height={260}
          />
        </section>
        <section className="panel paid-channel">
          <SectionTitle title="Channel mix" />
          <div className="channel-list">
            <div>
              <span className="channel-icon google">G</span>
              <span>
                Google Ads<small>582 leads</small>
              </span>
              <strong>57%</strong>
            </div>
            <div>
              <span className="channel-icon meta">M</span>
              <span>
                Meta Ads<small>296 leads</small>
              </span>
              <strong>29%</strong>
            </div>
            <div>
              <span className="channel-icon linked">in</span>
              <span>
                LinkedIn Ads<small>142 leads</small>
              </span>
              <strong>14%</strong>
            </div>
          </div>
        </section>
        <section className="panel paid-table">
          <SectionTitle
            title="Campaign performance"
            meta="Click a row to inspect its signals"
          />
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Platform</th>
                  <th>Spend</th>
                  <th>Clicks</th>
                  <th>Leads</th>
                  <th>CPL</th>
                  <th>ROAS</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {adCampaigns.map((c) => (
                  <tr
                    key={c.name}
                    onClick={() => toast(`${c.name} detail opened`)}
                  >
                    <td>
                      <strong>{c.name}</strong>
                    </td>
                    <td>{c.platform}</td>
                    <td>{money(c.spend)}</td>
                    <td>{c.clicks.toLocaleString()}</td>
                    <td>{c.leads}</td>
                    <td>${c.cpl}</td>
                    <td>{c.roas}</td>
                    <td>
                      <span
                        className={
                          c.trend.startsWith("âˆ’")
                            ? "negative-text"
                            : "positive-text"
                        }
                      >
                        {c.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

function Integrations() {
  const { version, integrations, openModal, toggleIntegration } = useApp();
  const [filter, setFilter] = useState("All");
  const visible = integrations.filter(
    (x) =>
      filter === "All" ||
      (filter === "Connected"
        ? x.connected
        : filter === "Available"
          ? !x.connected
          : x.category === filter),
  );
  return (
    <div className={`page integrations-page integrations-${version}`}>
      <PageHead
        eyebrow="SETTINGS / CONNECTIVITY"
        title="Integrations"
        desc="Bring every channel, event, and customer signal into one connected workspace."
      />
      <div className="integration-alert">
        <span>
          <Bell size={19} />
        </span>
        <div>
          <strong>NetSuite sync needs attention</strong>
          <p>
            9 lead forwards need a manual review. Your other connected services
            are operating normally.
          </p>
        </div>
        <button onClick={() => openModal("integration", "NetSuite")}>
          Review connection <ArrowRight size={15} />
        </button>
      </div>
      <div className="table-toolbar integration-toolbar">
        <div className="tab-strip">
          {[
            "All",
            "Connected",
            "Available",
            "Analytics",
            "Messaging",
            "Automation",
          ].map((t) => (
            <button
              key={t}
              className={filter === t ? "active" : ""}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <span>{integrations.filter((x) => x.connected).length} connected</span>
      </div>
      <div className="integration-grid">
        {visible.map((x) => (
          <article className="integration-card" key={x.name}>
            <div className="integration-card-top">
              <span
                className={`integration-mark mark-${x.name.toLowerCase().replaceAll(" ", "-")}`}
              >
                {x.mark}
              </span>
              <span
                className={`status ${x.connected ? "status-connected" : "status-available"}`}
              >
                {x.connected ? "Connected" : "Available"}
              </span>
            </div>
            <div>
              <span className="eyebrow">{x.category.toUpperCase()}</span>
              <h3>{x.name}</h3>
              <p>{x.description}</p>
            </div>
            <button
              className={`button ${x.connected ? "subtle" : "primary"}`}
              onClick={() =>
                x.connected
                  ? toggleIntegration(x.name)
                  : openModal("integration", x.name)
              }
            >
              {x.connected ? "Disconnect" : "Connect"} <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
      {visible.length === 0 && (
        <EmptyState
          title="No integrations in this category"
          text="Choose another category to browse the available connections."
        />
      )}
    </div>
  );
}

function Settings({ subpage }: { subpage: string }) {
  const { version, toast } = useApp();
  const active = subpage || "general";
  const [values, setValues] = useState({
    workspace: "5W Media Group",
    domain: "5wmedia.com",
    timezone: "America/New_York",
  });
  const [toggles, setToggles] = useState([true, true, false, true]);
  const toggle = (i: number) =>
    setToggles((v) => v.map((x, j) => (j === i ? !x : x)));
  return (
    <div className={`page settings-page settings-${version}`}>
      <PageHead
        eyebrow="WORKSPACE / PREFERENCES"
        title="Settings"
        desc="Manage workspace preferences, connections, access, and billing."
      />
      {active === "general" && (
        <div className="professional-settings-tiles">
          <button
            onClick={() =>
              document
                .getElementById("workspace-details")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>
              <Settings2 size={19} />
            </span>
            <strong>Workspace details</strong>
            <small>Name, domain, and time zone</small>
            <ArrowRight size={15} />
          </button>
          <Link to="/v2/sites">
            <span>
              <Globe2 size={19} />
            </span>
            <strong>Connected sites</strong>
            <small>Publishing and lead capture</small>
            <ArrowRight size={15} />
          </Link>
          <Link to="/v2/integrations">
            <span>
              <LayoutGrid size={19} />
            </span>
            <strong>Integrations</strong>
            <small>Connected tools and services</small>
            <ArrowRight size={15} />
          </Link>
          <Link to="/v2/settings/security">
            <span>
              <ShieldCheck size={19} />
            </span>
            <strong>Security & access</strong>
            <small>Sign-in and account protection</small>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}
      <div className="settings-layout">
        <nav className="settings-nav">
          {[
            ["general", "General settings", Settings2],
            ["notifications", "Notifications", Bell],
            ["billing", "Billing", FileText],
            ["security", "Security", ShieldCheck],
          ].map(([key, label, Icon]) => (
            <Link
              key={key as string}
              className={active === key ? "active" : ""}
              to={`/${version}/settings${key === "general" ? "" : `/${key}`}`}
            >
              <Icon size={18} />
              {label as string}
              <ArrowRight size={15} />
            </Link>
          ))}
        </nav>
        <section className="settings-content">
          {active === "general" ? (
            <>
              <div className="settings-section-heading" id="workspace-details">
                <div>
                  <h2>Workspace details</h2>
                  <p>Basic information and defaults for the 5W network.</p>
                </div>
                <span className="status status-connected">
                  Active workspace
                </span>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast("Workspace settings saved");
                }}
              >
                <label className="field">
                  <span>Workspace name</span>
                  <input
                    value={values.workspace}
                    onChange={(e) =>
                      setValues({ ...values, workspace: e.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>Primary domain</span>
                  <input
                    value={values.domain}
                    onChange={(e) =>
                      setValues({ ...values, domain: e.target.value })
                    }
                  />
                </label>
                <label className="field">
                  <span>Time zone</span>
                  <select
                    value={values.timezone}
                    onChange={(e) =>
                      setValues({ ...values, timezone: e.target.value })
                    }
                  >
                    <option>America/New_York</option>
                    <option>America/Chicago</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/Madrid</option>
                  </select>
                </label>
                <button className="button primary" type="submit">
                  Save changes
                </button>
              </form>
              <div className="settings-subsection">
                <h3>Team access</h3>
                <p>
                  Invite collaborators and decide who can manage the workspace.
                </p>
                <div className="team-row">
                  <span className="avatar">LM</span>
                  <span>
                    <strong>Luis Antonio M.</strong>
                    <small>luis@5wmedia.com</small>
                  </span>
                  <span className="status status-connected">Admin</span>
                </div>
                <button
                  className="button subtle"
                  onClick={() => toast("Invite flow opened")}
                >
                  Invite team member
                </button>
              </div>
            </>
          ) : active === "notifications" ? (
            <>
              <div className="settings-section-heading">
                <div>
                  <h2>Notifications</h2>
                  <p>Choose which signals reach you and your team.</p>
                </div>
              </div>
              {[
                [
                  "New lead alerts",
                  "Get notified when a contact enters the workspace",
                ],
                [
                  "Campaign milestones",
                  "Track launches, sends, and engagement peaks",
                ],
                [
                  "Weekly performance digest",
                  "A concise summary delivered every Monday",
                ],
                [
                  "Integration errors",
                  "Know immediately when a connection needs attention",
                ],
              ].map(([title, desc], i) => (
                <div className="toggle-row" key={title}>
                  <span>
                    <strong>{title}</strong>
                    <small>{desc}</small>
                  </span>
                  <button
                    role="switch"
                    aria-checked={toggles[i]}
                    className={`toggle ${toggles[i] ? "on" : ""}`}
                    onClick={() => toggle(i)}
                  >
                    <i />
                  </button>
                </div>
              ))}
              <button
                className="button primary"
                onClick={() => toast("Notification preferences saved")}
              >
                Save preferences
              </button>
            </>
          ) : active === "billing" ? (
            <>
              <div className="settings-section-heading">
                <div>
                  <h2>Billing & plan</h2>
                  <p>Review your current plan and payment details.</p>
                </div>
              </div>
              <div className="billing-card">
                <span className="eyebrow">CURRENT PLAN</span>
                <h3>Growth</h3>
                <p>For a connected marketing team.</p>
                <strong>
                  $299 <small>/ month</small>
                </strong>
                <div>
                  <Check size={16} /> 10,000 contacts <Check size={16} />{" "}
                  Unlimited campaigns
                </div>
                <button
                  className="button primary"
                  onClick={() => toast("Plan options opened")}
                >
                  Manage plan
                </button>
              </div>
              <div className="simple-list">
                <div>
                  Next invoice <span>Oct 1, 2026</span>
                </div>
                <div>
                  Payment method <span>Visa ending in 4242</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="settings-section-heading">
                <div>
                  <h2>Security</h2>
                  <p>Keep customer and campaign data protected.</p>
                </div>
                <span className="status status-connected">Protected</span>
              </div>
              <div className="security-list">
                <div>
                  <ShieldCheck size={23} />
                  <span>
                    <strong>Two-factor authentication</strong>
                    <small>Extra protection for workspace sign-in.</small>
                  </span>
                  <button
                    className="button subtle"
                    onClick={() => toast("Security setup opened")}
                  >
                    Manage
                  </button>
                </div>
                <div>
                  <Activity size={23} />
                  <span>
                    <strong>Active sessions</strong>
                    <small>2 devices signed in recently.</small>
                  </span>
                  <button
                    className="button subtle"
                    onClick={() => toast("Sessions reviewed")}
                  >
                    Review
                  </button>
                </div>
                <div>
                  <FileText size={23} />
                  <span>
                    <strong>Audit log</strong>
                    <small>Review changes to contacts and campaigns.</small>
                  </span>
                  <button
                    className="button subtle"
                    onClick={() => toast("Audit log opened")}
                  >
                    Open
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

function Companies() {
  const { version, site } = useApp();
  const rows = companies.filter((c) => site === "All sites" || c.site === site);
  return (
    <div className="page">
      <PageHead
        eyebrow="CONTACTS / ORGANIZATIONS"
        title="Companies"
        desc="The organizations behind your strongest relationships."
        action={
          <Link className="button primary" to={`/${version}/contacts`}>
            <Users size={17} /> View contacts
          </Link>
        }
      />
      <div className="metric-strip">
        <Stat label="Companies" value="418" delta="+11.2%" icon={Users} />
        <Stat
          label="With active leads"
          value="186"
          delta="+16.4%"
          icon={Target}
        />
        <Stat
          label="Pipeline value"
          value="$482.6k"
          delta="+21.7%"
          icon={TrendingUp}
        />
      </div>
      <div className="content-panel">
        <SectionTitle
          title="Company directory"
          meta={`${rows.length} featured accounts`}
        />
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Contacts</th>
                <th>Potential value</th>
                <th>Momentum</th>
                <th>Site</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.name}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>{c.industry}</td>
                  <td>{c.contacts}</td>
                  <td>{money(c.value)}</td>
                  <td>
                    <span
                      className={
                        c.trend.startsWith("âˆ’")
                          ? "negative-text"
                          : "positive-text"
                      }
                    >
                      {c.trend}
                    </span>
                  </td>
                  <td>{c.site}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
function Segments() {
  const { segments, openModal, version } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="CONTACTS / AUDIENCES"
        title="Segments"
        desc="Reach the right people with dynamic, behavior-based audiences."
        action={
          <ActionButton onClick={() => openModal("segment")}>
            <Plus size={17} /> Create segment
          </ActionButton>
        }
      />
      <div className="segment-grid">
        {segments.map((s, i) => (
          <Link
            to={`/${version}/contacts`}
            className="segment-card"
            key={s.name}
          >
            <div>
              <span className="segment-icon">
                <Users size={20} />
              </span>
              <span className="eyebrow">AUDIENCE 0{i + 1}</span>
            </div>
            <h3>{s.name}</h3>
            <p>{s.rule}</p>
            <div>
              <strong>{s.count.toLocaleString()} contacts</strong>
              <span>{s.growth}</span>
              <ArrowRight size={17} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
function Tags() {
  const { version } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="CONTACTS / ORGANIZATION"
        title="Tags"
        desc="A flexible vocabulary for every relationship and campaign."
      />
      <div className="content-panel">
        <SectionTitle
          title="Workspace tags"
          meta="Organize people by interests, intent, and industry"
        />
        <div className="tags-grid">
          {tags.map((t, i) => (
            <Link to={`/${version}/contacts`} key={t}>
              <span
                className="tag-color"
                style={{
                  background: ["#91b8ed", "#f5b992", "#bca5e7", "#a9d9c1"][
                    i % 4
                  ],
                }}
              />
              {t}
              <strong>
                {[324, 82, 146, 186, 142, 96, 215, 74, 188, 42][i]}
              </strong>
              <ArrowRight size={15} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
function Templates() {
  const { openModal } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="MARKETING / LIBRARY"
        title="Email templates"
        desc="Reusable starting points for thoughtful messages."
        action={
          <ActionButton onClick={() => openModal("template")}>
            <Plus size={17} /> New template
          </ActionButton>
        }
      />
      <div className="template-grid">
        {templates.map((t) => (
          <article className="template-card" key={t.name}>
            <div className="template-preview" style={{ background: t.color }}>
              <div className="template-paper">
                <small>5W / {t.type.toUpperCase()}</small>
                <strong>
                  Something
                  <br />
                  worth opening.
                </strong>
                <span />
                <span />
                <span />
              </div>
            </div>
            <div>
              <span className="eyebrow">{t.type.toUpperCase()}</span>
              <h3>{t.name}</h3>
              <p>Updated {t.updated}</p>
              <button onClick={() => openModal("template", t.name)}>
                Edit template <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function Funnels() {
  const { version } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="MARKETING / CONVERSION"
        title="Funnels"
        desc="Understand the path from first visit to lasting customer."
      />
      <div className="metric-strip">
        <Stat label="Visitors" value="78.4k" delta="+18.4%" icon={Globe2} />
        <Stat label="Leads" value="2,749" delta="+14.7%" icon={Users} />
        <Stat label="Qualified" value="836" delta="+12.8%" icon={Target} />
        <Stat label="Customers" value="284" delta="+7.1%" icon={CheckCircle2} />
      </div>
      <div className="content-panel funnel-panel">
        <SectionTitle title="Acquisition funnel" meta="Last 30 days" />
        <div className="funnel-wide">
          {[
            ["Site visits", "78,400", "100%", 100],
            ["Form starts", "8,560", "10.9%", 82],
            ["Lead captures", "2,749", "3.5%", 64],
            ["Qualified leads", "836", "1.1%", 46],
            ["Customers", "284", "0.4%", 29],
          ].map(([name, count, rate, width], i) => (
            <div key={name}>
              <span>0{i + 1}</span>
              <strong>{name}</strong>
              <div>
                <i style={{ width: `${width}%` }} />
              </div>
              <b>{count}</b>
              <small>{rate}</small>
            </div>
          ))}
        </div>
        <Link className="text-button" to={`/${version}/reports`}>
          Explore conversion reports <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
function Forms() {
  const { openModal, leadForms } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="MARKETING / LEAD CAPTURE"
        title="Forms & lead intake"
        desc="Turn interest into opportunity across every connected site."
        action={
          <ActionButton onClick={() => openModal("form")}>
            <Plus size={17} /> New form
          </ActionButton>
        }
      />
      <div className="forms-layout">
        <section className="content-panel">
          <SectionTitle
            title="Hosted forms"
            meta={`${leadForms.length} forms in the workspace`}
          />
          <div className="forms-list">
            {leadForms.map((f) => (
              <div key={f.name}>
                <span className="forms-icon">
                  <FileText size={19} />
                </span>
                <span>
                  <strong>{f.name}</strong>
                  <small>{f.site}</small>
                </span>
                <span>{f.submissions} submissions</span>
                <span>{f.rate} conversion</span>
                <span className={`status status-${f.status.toLowerCase()}`}>
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="content-panel">
          <SectionTitle title="Recent intake" />
          <ActivityList />
        </section>
      </div>
    </div>
  );
}
function Sites() {
  const { openModal, connectedSites } = useApp();
  return (
    <div className="page">
      <PageHead
        eyebrow="NETWORK / WEBSITES"
        title="Sites"
        desc="Every site connected to the same customer view and campaign engine."
        action={
          <ActionButton onClick={() => openModal("site")}>
            <Plus size={17} /> Connect site
          </ActionButton>
        }
      />
      <div className="site-cards">
        {connectedSites.map((s) => (
          <article className="site-card" key={s.name}>
            <div>
              <span className="site-icon">
                <Globe2 size={22} />
              </span>
              <span
                className={`status ${s.status === "Healthy" ? "status-connected" : "status-paused"}`}
              >
                {s.status}
              </span>
            </div>
            <h2>{s.name}</h2>
            <p>{s.domain}</p>
            <div className="site-card-stats">
              <span>
                <strong>{s.visits}</strong> visits
              </span>
              <span>
                <strong>{s.leads}</strong> leads
              </span>
              <span>
                <strong>{s.rate}</strong> conversion
              </span>
            </div>
            <button className="text-button" onClick={() => openModal("site")}>
              Site details <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
function NewBiz() {
  const { toast } = useApp();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const run = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    toast("Research brief is being prepared", "loading");
    window.setTimeout(() => {
      setLoading(false);
      toast("Research brief ready in the preview");
    }, 800);
  };
  return (
    <div className="page">
      <PageHead
        eyebrow="AI AGENTS / LEAD INTELLIGENCE"
        title="New Biz Intake"
        desc="Turn inbound interest into a researched, prioritized brief for your team."
      />
      <div className="agent-hero">
        <span className="ai-orb">
          <Bot size={26} />
        </span>
        <div>
          <span className="eyebrow">ACTIVE AGENT</span>
          <h2>Know the story behind every lead.</h2>
          <p>
            The intake agent enriches each new contact, scores fit, and suggests
            the next move.
          </p>
        </div>
        <span className="status status-live">Running</span>
      </div>
      <div className="agent-layout">
        <section className="content-panel">
          <SectionTitle
            title="Test on one lead"
            meta="Run a simulated research brief"
          />
          <form className="agent-form" onSubmit={run}>
            <label className="field">
              <span>Lead email</span>
              <input
                required
                type="email"
                placeholder="jane@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="button primary" disabled={loading}>
              {loading ? "Preparing briefâ€¦" : "Run test"}
            </button>
          </form>
          <div className="insight-callout">
            <Sparkles size={21} />
            <strong>Example insight</strong>
            <p>
              Northstar Studio is actively researching brand transformation.
              Recommend a creative strategy call this week.
            </p>
          </div>
        </section>
        <section className="content-panel">
          <SectionTitle title="Recent agent runs" />
          <div className="simple-list">
            <div>
              Maya Chen <span>Qualified Â· 84 score</span>
            </div>
            <div>
              Jordan Ellis <span>Research complete</span>
            </div>
            <div>
              Theo Ramirez <span>Qualified Â· 81 score</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
function MediaPitch() {
  return (
    <div className="page">
      <PageHead
        eyebrow="AI AGENTS / UPCOMING"
        title="Media Pitch"
        desc="A new way to connect the right story with the right outlet."
      />
      <div className="coming-soon">
        <span>
          <Sparkles size={32} />
        </span>
        <span className="eyebrow">COMING SOON</span>
        <h2>Better pitches start with better signals.</h2>
        <p>
          Discover relevant reporters, map story angles, and craft outreach with
          context from your network.
        </p>
      </div>
    </div>
  );
}
function Traffic() {
  return (
    <div className="page">
      <PageHead
        eyebrow="ANALYTICS / TRAFFIC"
        title="Traffic"
        desc="Where your audience comes from and what keeps them engaged."
        action={<PeriodSelect />}
      />
      <div className="metric-strip">
        <Stat label="Visitors" value="78.4k" delta="+18.4%" icon={Users} />
        <Stat label="Page views" value="186k" delta="+12.1%" icon={Globe2} />
        <Stat
          label="Engaged sessions"
          value="46.2k"
          delta="+9.6%"
          icon={Activity}
        />
        <Stat
          label="Avg. session"
          value="3m 42s"
          delta="+18 sec"
          icon={Clock3}
        />
      </div>
      <div className="reports-grid">
        <section className="panel report-trend">
          <SectionTitle title="Traffic over time" />
          <TrendChart dataKey="visits" color="#607ff0" height={290} />
        </section>
        <section className="panel report-sources">
          <SectionTitle title="Source mix" />
          <SourceList />
        </section>
      </div>
    </div>
  );
}
function Conversions() {
  return (
    <div className="page">
      <PageHead
        eyebrow="ANALYTICS / OUTCOMES"
        title="Conversions"
        desc="See which interactions become meaningful business outcomes."
        action={<PeriodSelect />}
      />
      <div className="metric-strip">
        <Stat label="Conversions" value="2,749" delta="+14.7%" icon={Target} />
        <Stat
          label="Lead to qualified"
          value="30.4%"
          delta="+2.1 pts"
          icon={TrendingUp}
        />
        <Stat
          label="Form conversion"
          value="5.8%"
          delta="+0.7 pts"
          icon={FileText}
        />
        <Stat
          label="Customer wins"
          value="92"
          delta="+6.9%"
          icon={CheckCircle2}
        />
      </div>
      <div className="reports-grid">
        <section className="panel report-trend">
          <SectionTitle title="Conversion volume" />
          <TrendChart dataKey="conversions" color="#54ad9c" height={290} />
        </section>
        <section className="panel report-sources">
          <SectionTitle title="Top converting forms" />
          <div className="simple-list">
            {forms.map((f) => (
              <div key={f.name}>
                {f.name}
                <span>{f.rate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
function UTM() {
  const { toast } = useApp();
  const [fields, setFields] = useState({
    url: "https://5wmedia.com/growth",
    source: "google",
    medium: "cpc",
    campaign: "fall-growth",
  });
  const url = `${fields.url}?utm_source=${encodeURIComponent(fields.source)}&utm_medium=${encodeURIComponent(fields.medium)}&utm_campaign=${encodeURIComponent(fields.campaign)}`;
  return (
    <div className="page">
      <PageHead
        eyebrow="ANALYTICS / CAMPAIGN TRACKING"
        title="Paid Ads UTM"
        desc="Build consistent tracking links for every paid campaign."
      />
      <div className="utm-layout">
        <section className="content-panel">
          <SectionTitle
            title="Campaign URL builder"
            meta="Set the destination and tracking parameters"
          />
          <div className="utm-fields">
            {[
              ["url", "Destination URL"],
              ["source", "Campaign source"],
              ["medium", "Campaign medium"],
              ["campaign", "Campaign name"],
            ].map(([key, label]) => (
              <label className="field" key={key}>
                <span>{label}</span>
                <input
                  value={fields[key as keyof typeof fields]}
                  onChange={(e) =>
                    setFields({ ...fields, [key]: e.target.value })
                  }
                />
              </label>
            ))}
          </div>
          <div className="utm-output">
            <span className="eyebrow">YOUR TRACKED URL</span>
            <code>{url}</code>
            <button
              className="button primary"
              onClick={() => {
                navigator.clipboard?.writeText(url);
                toast("Tracking URL copied");
              }}
            >
              <Copy size={16} /> Copy URL
            </button>
          </div>
        </section>
        <section className="content-panel">
          <SectionTitle title="Tracking checklist" />
          <div className="connection-steps">
            <span>
              <Check size={16} /> Use lowercase source names
            </span>
            <span>
              <Check size={16} /> Keep campaign naming consistent
            </span>
            <span>
              <Check size={16} /> Verify destination before launch
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
export function Page() {
  const { section } = useApp();
  if (section.startsWith("contacts/"))
    return <ContactDetail id={section.split("/")[1]} />;
  if (section.startsWith("settings"))
    return <Settings subpage={section.split("/")[1] || ""} />;
  switch (section) {
    case "dashboard":
      return <Dashboard />;
    case "contacts":
      return <Contacts />;
    case "companies":
      return <Companies />;
    case "segments":
      return <Segments />;
    case "tags":
      return <Tags />;
    case "new-biz-intake":
      return <NewBiz />;
    case "media-pitch":
      return <MediaPitch />;
    case "campaigns":
      return <Campaigns />;
    case "automations":
      return <Automations />;
    case "email-templates":
      return <Templates />;
    case "funnels":
      return <Funnels />;
    case "forms":
      return <Forms />;
    case "sites":
      return <Sites />;
    case "reports":
      return <Reports />;
    case "traffic":
      return <Traffic />;
    case "conversions":
      return <Conversions />;
    case "paid-ads-utm":
      return <UTM />;
    case "paid-ads-analytics":
      return <PaidAds />;
    case "integrations":
      return <Integrations />;
    default:
      return (
        <div className="page">
          <PageHead
            title="Page not found"
            desc="This module is not available in the prototype."
          />
        </div>
      );
  }
}
