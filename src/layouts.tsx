import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  BarChart3,
  Bell,
  Blocks,
  Bot,
  ChevronDown,
  CircleHelp,
  Command,
  Compass,
  ContactRound,
  Globe2,
  Home,
  LayoutGrid,
  Mail,
  Megaphone,
  Menu,
  PanelLeft,
  PlugZap,
  Plus,
  Search,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { navGroups, proposals, sites, type Version } from "./data";
import { useApp } from "./app";

const icons: Record<string, typeof Home> = {
  dashboard: Home,
  contacts: ContactRound,
  companies: Blocks,
  segments: LayoutGrid,
  tags: Blocks,
  "new-biz-intake": Bot,
  "media-pitch": Sparkles,
  campaigns: Megaphone,
  automations: Activity,
  "email-templates": Mail,
  funnels: Compass,
  forms: Blocks,
  sites: Globe2,
  reports: BarChart3,
  traffic: Activity,
  conversions: BarChart3,
  "paid-ads-utm": Megaphone,
  "paid-ads-analytics": BarChart3,
  integrations: PlugZap,
  settings: Settings2,
};
const groupIcons = [
  Home,
  ContactRound,
  Bot,
  Megaphone,
  Globe2,
  BarChart3,
  Settings2,
];
function ToolIcon({ path, size = 17 }: { path: string; size?: number }) {
  const Icon = icons[path.split("/")[0]] || Blocks;
  return <Icon size={size} strokeWidth={1.8} />;
}
function NavItem({
  path,
  label,
  close,
}: {
  path: string;
  label: string;
  close?: () => void;
}) {
  const { version, section } = useApp();
  const active =
    section === path ||
    (path === "contacts" && section.startsWith("contacts/")) ||
    (path === "settings" && section === "settings");
  return (
    <Link
      to={`/${version}/${path}`}
      className={`nav-item ${active ? "active" : ""}`}
      onClick={close}
    >
      <ToolIcon path={path} />
      <span>{label}</span>
      {path === "media-pitch" && <small>soon</small>}
    </Link>
  );
}
function SiteSelect() {
  const { site, setSite, connectedSites } = useApp();
  return (
    <label className="select-wrap site-select">
      <Globe2 size={16} />
      <select
        value={site}
        onChange={(e) => setSite(e.target.value)}
        aria-label="Select site"
      >
        <option>All sites</option>
        {connectedSites.map((s) => (
          <option key={s.name}>{s.name}</option>
        ))}
      </select>
      <ChevronDown size={15} />
    </label>
  );
}
export function PeriodSelect() {
  const { period, setPeriod } = useApp();
  return (
    <label className="select-wrap period-select">
      <select
        value={period}
        onChange={(e) => setPeriod(e.target.value)}
        aria-label="Select period"
      >
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Last 90 days</option>
        <option>This year</option>
      </select>
      <ChevronDown size={15} />
    </label>
  );
}
function VersionSelect() {
  const { version } = useApp();
  const navigate = useNavigate();
  return (
    <label className="select-wrap version-select">
      <select
        value={version}
        onChange={(e) => navigate(`/${e.target.value}/`)}
        aria-label="Switch design concept"
      >
        {proposals.map((p) => (
          <option key={p.version} value={p.version}>
            {p.version.toUpperCase()} Â· {p.name}
          </option>
        ))}
      </select>
      <ChevronDown size={14} />
    </label>
  );
}
function Brand({ full = true }: { full?: boolean }) {
  return (
    <Link to="/" className="product-brand" aria-label="Compare all proposals">
      <span className="brand-mark">5W</span>
      {full && (
        <span className="brand-text">
          5W Marketing
          <br />
          Lead Gen
        </span>
      )}
    </Link>
  );
}
function AllTools({
  open,
  onClose,
  fullscreen = false,
}: {
  open: boolean;
  onClose: () => void;
  fullscreen?: boolean;
}) {
  const { version } = useApp();
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open, onClose]);
  if (!open) return null;
  const search = query.trim().toLowerCase();
  const filteredGroups = navGroups
    .map((group) => ({
      ...group,
      items: group.label.toLowerCase().includes(search)
        ? group.items
        : group.items.filter(([, label]) =>
            label.toLowerCase().includes(search),
          ),
    }))
    .filter((group) => group.items.length > 0);
  return (
    <div
      className={`tools-overlay ${fullscreen ? "fullscreen" : ""}`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="tools-panel">
        <header>
          <div>
            <span className="eyebrow">EXPLORE THE WORKSPACE</span>
            <h2>All tools</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close all tools"
          >
            <X size={21} />
          </button>
        </header>
        <label className="tools-search">
          <Search size={17} />
          <input
            autoFocus
            placeholder="Find a tool or category..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>ESC</kbd>
        </label>
        <div className="tools-grid">
          {filteredGroups.map((g) => {
            const Icon =
              groupIcons[navGroups.findIndex((item) => item.label === g.label)];
            return (
              <section key={g.label}>
                <div className="tools-group-title">
                  <Icon size={19} />
                  <h3>{g.label}</h3>
                </div>
                {g.items.map(([path, label]) => (
                  <NavItem
                    key={path}
                    path={path}
                    label={label}
                    close={onClose}
                  />
                ))}
              </section>
            );
          })}
          {filteredGroups.length === 0 && (
            <p className="tools-empty">No tools match “{query}”.</p>
          )}
        </div>
        <footer>
          <span>5W Marketing Lead Gen</span>
          <VersionSelect />
        </footer>
      </div>
    </div>
  );
}
function MobileNav({ openTools }: { openTools: () => void }) {
  const { version, section } = useApp();
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <Link
        className={section === "dashboard" ? "active" : ""}
        to={`/${version}/dashboard`}
      >
        <Home size={20} />
        <span>Home</span>
      </Link>
      <Link
        className={section.startsWith("contacts") ? "active" : ""}
        to={`/${version}/contacts`}
      >
        <ContactRound size={20} />
        <span>Contacts</span>
      </Link>
      <Link
        className={section === "campaigns" ? "active" : ""}
        to={`/${version}/campaigns`}
      >
        <Megaphone size={20} />
        <span>Campaigns</span>
      </Link>
      <Link
        className={section === "reports" ? "active" : ""}
        to={`/${version}/reports`}
      >
        <BarChart3 size={20} />
        <span>Reports</span>
      </Link>
      <button onClick={openTools}>
        <Menu size={20} />
        <span>More</span>
      </button>
    </nav>
  );
}
function V1Layout({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const { section } = useApp();
  useEffect(() => setActiveGroup(null), [section]);
  useEffect(() => {
    if (!activeGroup) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveGroup(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeGroup]);
  const selectedGroup = navGroups.find((group) => group.label === activeGroup);
  return (
    <>
      <header className="v1-topbar">
        <Brand />
        <button
          className="button all-tools-button"
          onClick={() => setTools(true)}
        >
          <LayoutGrid size={18} /> All tools <ChevronDown size={14} />
        </button>
        <button
          className="global-search"
          onClick={() => window.dispatchEvent(new Event("open-command"))}
        >
          <Search size={18} />
          <span>Search services, people, reports...</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div className="topbar-spacer" />
        <SiteSelect />
        <button
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <i />
        </button>
        <VersionSelect />
      </header>
      <nav className="v1-service-nav" aria-label="Service categories">
        {navGroups.map((group, index) => {
          const Icon = groupIcons[index];
          return (
            <button
              key={group.label}
              className={activeGroup === group.label ? "active" : ""}
              onClick={() =>
                setActiveGroup((current) =>
                  current === group.label ? null : group.label,
                )
              }
              aria-expanded={activeGroup === group.label}
            >
              <Icon size={16} />
              {group.label}
              <ChevronDown size={13} />
            </button>
          );
        })}
      </nav>
      {selectedGroup && (
        <>
          <button
            className="v1-service-scrim"
            aria-label="Close service menu"
            onClick={() => setActiveGroup(null)}
          />
          <div className="v1-service-menu">
            <div>
              <span className="eyebrow">JUMP TO A TOOL</span>
              <h2>{selectedGroup.label}</h2>
              <p>Open a module directly from the operations bar.</p>
            </div>
            <div className="v1-service-links">
              {selectedGroup.items.map(([path, label]) => (
                <NavItem
                  key={path}
                  path={path}
                  label={label}
                  close={() => setActiveGroup(null)}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <div className="v1-breadcrumb">
        <Link to="/v1/">Home</Link>
        <span>/</span>
        <span>
          {section
            .split("/")
            .map((x) => x.replaceAll("-", " "))
            .join(" / ")}
        </span>
        <span className="breadcrumb-right">Operations Console</span>
      </div>
      <main className="v1-main">{children}</main>
      <AllTools open={tools} onClose={() => setTools(false)} />
      <MobileNav openTools={() => setTools(true)} />
    </>
  );
}
function V2Layout({ children }: { children: ReactNode }) {
  const { section, version } = useApp();
  const [tools, setTools] = useState(false);
  const current =
    navGroups.find((g) =>
      g.items.some(
        ([path]) => section === path || section.startsWith(path + "/"),
      ),
    ) || navGroups[0];
  return (
    <div className="v2-layout">
      <aside className="v2-rail">
        <Brand full={false} />
        <div className="rail-icons">
          {navGroups.map((g, i) => {
            const Icon = groupIcons[i];
            return (
              <Link
                key={g.label}
                className={current.label === g.label ? "active" : ""}
                to={`/${version}/${g.items[0][0]}`}
                title={g.label}
              >
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
        <button onClick={() => setTools(true)} title="All tools">
          <Menu size={20} />
        </button>
        <span className="rail-avatar">LM</span>
      </aside>
      <aside className="v2-context">
        <div className="context-header">
          <span>Workspace</span>
          <ChevronDown size={15} />
        </div>
        <button
          className="command-trigger"
          onClick={() => window.dispatchEvent(new Event("open-command"))}
        >
          <Search size={17} /> Search anything <kbd>âŒ˜ K</kbd>
        </button>
        <div className="context-group">
          <small>{current.label.toUpperCase()}</small>
          {current.items.map(([path, label]) => (
            <NavItem key={path} path={path} label={label} />
          ))}
        </div>
        <div className="context-divider" />
        <div className="context-group">
          <small>PINNED</small>
          <NavItem path="contacts" label="All contacts" />
          <NavItem path="segments" label="High intent prospects" />
          <NavItem path="campaigns" label="Active campaigns" />
        </div>
        <div className="context-footer">
          <SiteSelect />
          <VersionSelect />
        </div>
      </aside>
      <div className="v2-workspace">
        <header className="v2-mobile-head">
          <Brand />
          <button className="icon-button" onClick={() => setTools(true)}>
            <Menu />
          </button>
        </header>
        {children}
      </div>
      <AllTools open={tools} onClose={() => setTools(false)} />
      <MobileNav openTools={() => setTools(true)} />
    </div>
  );
}
function V3Layout({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [tools, setTools] = useState(false);
  const { version, section, openModal } = useApp();
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  return (
    <>
      <header className="v3-topbar">
        <div className="v3-brand">
          <Brand />
          <span>CREATIVE STUDIO</span>
        </div>
        <nav className="v3-main-nav">
          <button className="v3-main-tool" onClick={() => setMenu((v) => !v)}>
            <LayoutGrid size={17} /> All tools <ChevronDown size={15} />
          </button>
          <button
            className="v3-search"
            onClick={() => window.dispatchEvent(new Event("open-command"))}
          >
            <Search size={16} /> Search campaigns, people, reports...
            <kbd>Ctrl K</kbd>
          </button>
        </nav>
        <div className="v3-right">
          <SiteSelect />
          <button
            className="icon-button"
            onClick={() => setTools(true)}
            aria-label="Open all tools"
          >
            <LayoutGrid size={20} />
          </button>
          <VersionSelect />
        </div>
      </header>
      <div className="v3-workspace-nav">
        <span>STUDIO / 5W MEDIA</span>
        <nav aria-label="Campaign workspace">
          {[
            ["dashboard", "Overview"],
            ["campaigns", "Campaigns"],
            ["automations", "Automations"],
            ["email-templates", "Templates"],
            ["forms", "Forms"],
            ["contacts", "Audience"],
            ["reports", "Reports"],
          ].map(([path, label]) => (
            <Link
              key={path}
              className={section === path ? "active" : ""}
              to={`/${version}/${path}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button onClick={() => openModal("campaign")}>
          <Plus size={15} /> New
        </button>
      </div>
      {menu && (
        <div className="v3-mega">
          <div>
            <span className="eyebrow">WORKSPACE MODULES</span>
            <h2>Open a tool</h2>
            <p>Build, deliver, and measure from the same workspace.</p>
          </div>
          {navGroups
            .filter((g) =>
              ["Marketing", "Contacts", "Analytics"].includes(g.label),
            )
            .map((g) => (
              <section key={g.label}>
                <strong>{g.label}</strong>
                {g.items.map(([path, label]) => (
                  <NavItem
                    key={path}
                    path={path}
                    label={label}
                    close={() => setMenu(false)}
                  />
                ))}
              </section>
            ))}
        </div>
      )}
      <main
        className="v3-main"
        onClick={() => {
          if (menu) setMenu(false);
        }}
      >
        {children}
      </main>
      <AllTools open={tools} onClose={() => setTools(false)} />
      <MobileNav openTools={() => setTools(true)} />
    </>
  );
}
function V4Layout({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState(false);
  const { version, openModal } = useApp();
  const navigate = useNavigate();
  return (
    <div className="v4-layout">
      <aside className="v4-sidebar">
        <Brand full={false} />
        <div className="v4-sidebar-label">WORKSPACE</div>
        <nav>
          <NavItem path="dashboard" label="Overview" />
          <NavItem path="contacts" label="Contacts" />
          <NavItem path="campaigns" label="Campaigns" />
          <NavItem path="automations" label="Automations" />
          <NavItem path="reports" label="Reports" />
          <NavItem path="paid-ads-analytics" label="Paid ads" />
          <NavItem path="integrations" label="Integrations" />
          <NavItem path="settings" label="Settings" />
        </nav>
        <button className="v4-more" onClick={() => setTools(true)}>
          <LayoutGrid size={17} /> All modules
        </button>
        <div className="v4-side-footer">
          <span className="online-dot" /> System operational
        </div>
      </aside>
      <div className="v4-workspace">
        <header className="v4-topbar">
          <div className="v4-topbar-left">
            <span className="v4-workspace-name">Revenue workspace</span>
            <span className="v4-topbar-slash">/</span>
            <SiteSelect />
          </div>
          <div className="v4-topbar-right">
            <button
              className="button primary v4-quick"
              onClick={() => openModal("contact")}
            >
              <Plus size={15} /> Quick add
            </button>
            <button
              className="icon-button"
              onClick={() => navigate(`/${version}/new-biz-intake`)}
              aria-label="AI agent"
            >
              <Bot size={18} />
            </button>
            <button className="icon-button" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <VersionSelect />
            <span className="v4-user">LM</span>
          </div>
        </header>
        <main className="v4-main">{children}</main>
      </div>
      <AllTools open={tools} onClose={() => setTools(false)} />
      <MobileNav openTools={() => setTools(true)} />
    </div>
  );
}
function V5Layout({ children }: { children: ReactNode }) {
  const [tools, setTools] = useState(false);
  const { version, section } = useApp();
  return (
    <div className="v5-layout">
      <div className="v5-ambient one" />
      <div className="v5-ambient two" />
      <header className="v5-topbar">
        <Brand />
        <div className="v5-top-center">
          <span className="live-pulse" /> NETWORK LIVE{" "}
          <span className="v5-top-divider">/</span>{" "}
          {section.split("/")[0].replaceAll("-", " ").toUpperCase()}
        </div>
        <div className="v5-top-right">
          <SiteSelect />
          <VersionSelect />
          <button
            className="v5-menu-button"
            onClick={() => setTools(true)}
            aria-label="Open network menu"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      <main className="v5-main">{children}</main>
      <nav className="v5-dock" aria-label="Main navigation">
        <Link
          to={`/${version}/dashboard`}
          className={section === "dashboard" ? "active" : ""}
          title="Network"
        >
          <Home size={21} />
          <span>Network</span>
        </Link>
        <Link
          to={`/${version}/contacts`}
          className={section.startsWith("contacts") ? "active" : ""}
          title="People"
        >
          <ContactRound size={21} />
          <span>People</span>
        </Link>
        <Link
          to={`/${version}/campaigns`}
          className={section === "campaigns" ? "active" : ""}
          title="Campaigns"
        >
          <Megaphone size={21} />
          <span>Campaigns</span>
        </Link>
        <button onClick={() => setTools(true)} title="All tools">
          <LayoutGrid size={21} />
          <span>Explore</span>
        </button>
        <Link
          to={`/${version}/reports`}
          className={section === "reports" ? "active" : ""}
          title="Signals"
        >
          <Activity size={21} />
          <span>Signals</span>
        </Link>
      </nav>
      <AllTools open={tools} onClose={() => setTools(false)} fullscreen />
    </div>
  );
}
export function Layout({ children }: { children: ReactNode }) {
  const { version } = useApp();
  switch (version) {
    case "v1":
      return <V1Layout>{children}</V1Layout>;
    case "v2":
      return <V2Layout>{children}</V2Layout>;
    case "v3":
      return <V3Layout>{children}</V3Layout>;
    case "v4":
      return <V4Layout>{children}</V4Layout>;
    case "v5":
      return <V5Layout>{children}</V5Layout>;
  }
}
