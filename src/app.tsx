import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Command,
  FileUp,
  LoaderCircle,
  Plus,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  automationsSeed,
  campaignsSeed,
  contactsSeed,
  forms,
  integrationsSeed,
  navGroups,
  proposals,
  segmentsSeed,
  sites,
  type Automation,
  type Campaign,
  type Contact,
  type Integration,
  type Version,
} from "./data";
import { Layout } from "./layouts";
import { Page } from "./pages";

type ModalKind =
  | "contact"
  | "import"
  | "segment"
  | "automation"
  | "campaign"
  | "template"
  | "form"
  | "site"
  | "integration"
  | "confirm"
  | null;
type AppContextType = {
  version: Version;
  section: string;
  site: string;
  setSite: (v: string) => void;
  period: string;
  setPeriod: (v: string) => void;
  contacts: Contact[];
  campaigns: Campaign[];
  automations: Automation[];
  integrations: Integration[];
  segments: typeof segmentsSeed;
  connectedSites: typeof sites;
  leadForms: typeof forms;
  modal: ModalKind;
  modalTarget: string;
  openModal: (kind: ModalKind, target?: string) => void;
  closeModal: () => void;
  addContact: (input: Partial<Contact>) => void;
  updateContact: (id: string, changes: Partial<Contact>) => void;
  importContacts: () => void;
  removeContact: (name: string) => void;
  addSite: (name: string, domain: string) => void;
  addForm: (name: string, siteName: string) => void;
  addCampaign: (name: string, audience: string) => void;
  addAutomation: (name: string, trigger: string) => void;
  addSegment: (name: string, rule: string) => void;
  toggleIntegration: (name: string) => void;
  toast: (message: string, type?: "success" | "error" | "loading") => void;
  contactDrawer: string | null;
  setContactDrawer: (id: string | null) => void;
  mobileMenu: boolean;
  setMobileMenu: (v: boolean) => void;
};
const AppContext = createContext<AppContextType | null>(null);
export const useApp = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error("App context missing");
  return value;
};

function VersionApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const version: Version = "v2";
  const [site, setSite] = useState("All sites");
  const [period, setPeriod] = useState("Last 30 days");
  const [contacts, setContacts] = useState(contactsSeed);
  const [campaigns, setCampaigns] = useState(campaignsSeed);
  const [automations, setAutomations] = useState(automationsSeed);
  const [integrations, setIntegrations] = useState(integrationsSeed);
  const [segments, setSegments] = useState(segmentsSeed);
  const [connectedSites, setConnectedSites] = useState(sites);
  const [leadForms, setLeadForms] = useState(forms);
  const [modal, setModal] = useState<ModalKind>(null);
  const [modalTarget, setModalTarget] = useState("");
  const [contactDrawer, setContactDrawer] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState<{
    message: string;
    type: string;
  } | null>(null);
  const section =
    location.pathname
      .replace(new RegExp(`^/${version}/?`), "")
      .replace(/\/$/, "") || "dashboard";
  const toast = useCallback(
    (message: string, type: "success" | "error" | "loading" = "success") => {
      setNotice({ message, type });
      if (type !== "loading") window.setTimeout(() => setNotice(null), 3600);
    },
    [],
  );
  useEffect(() => {
    setMobileMenu(false);
    setContactDrawer(null);
  }, [location.pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        setContactDrawer(null);
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const ctx = useMemo<AppContextType>(
    () => ({
      version,
      section,
      site,
      setSite,
      period,
      setPeriod,
      contacts,
      campaigns,
      automations,
      integrations,
      segments,
      connectedSites,
      leadForms,
      modal,
      modalTarget,
      openModal: (kind, target = "") => {
        setModal(kind);
        setModalTarget(target);
      },
      closeModal: () => setModal(null),
      addContact: (input) => {
        const name = input.name?.trim() || "New Contact";
        const next: Contact = {
          id: `contact-${Date.now()}`,
          name,
          email: input.email || "new@example.com",
          company: input.company || "Independent",
          role: input.role || "Contact",
          status: "New",
          source: "Manual entry",
          site: site === "All sites" ? "5W Media" : site,
          value: 0,
          last: "Just now",
          tags: [],
          initials: name
            .split(" ")
            .map((x) => x[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          color: "#afd7d4",
        };
        setContacts((v) => [next, ...v]);
        toast(`${name} added to contacts`);
        setModal(null);
      },
      updateContact: (id, changes) => {
        setContacts((v) =>
          v.map((c) => (c.id === id ? { ...c, ...changes } : c)),
        );
        toast("Contact profile updated");
      },
      importContacts: () => {
        const names = ["Olivia Reed", "Samir Patel", "Elena Torres"];
        setContacts((v) => [
          ...names.map((name, i) => ({
            id: `contact-import-${Date.now()}-${i}`,
            name,
            email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
            company: ["Evergreen Co", "Brightline", "Aperture Labs"][i],
            role: "Marketing Lead",
            status: "New" as const,
            source: "CSV import",
            site: site === "All sites" ? "5W Media" : site,
            value: 0,
            last: "Just now",
            tags: [],
            initials: name
              .split(" ")
              .map((x) => x[0])
              .join(""),
            color: "#c9d4ef",
          })),
          ...v,
        ]);
        toast("3 contacts imported into preview");
        setModal(null);
      },
      removeContact: (name) => {
        setContacts((v) => v.filter((c) => c.name !== name));
        toast(`${name} removed from contacts`);
        setModal(null);
        setContactDrawer(null);
      },
      addSite: (name, domain) => {
        setConnectedSites((v) => [
          {
            name,
            domain,
            visits: "0",
            leads: 0,
            rate: "0%",
            status: "Needs review",
          },
          ...v,
        ]);
        toast(`${name} connected to the network`);
        setModal(null);
      },
      addForm: (name, siteName) => {
        setLeadForms((v) => [
          { name, site: siteName, submissions: 0, rate: "0%", status: "Draft" },
          ...v,
        ]);
        toast(`${name} form draft created`);
        setModal(null);
      },
      addCampaign: (name, audience) => {
        setCampaigns((v) => [
          {
            id: `campaign-${Date.now()}`,
            name,
            channel: "Email",
            status: "Draft",
            audience,
            sent: 0,
            open: 0,
            click: 0,
            date: "Today",
            color: "#c5b7ee",
          },
          ...v,
        ]);
        toast("Campaign draft created");
        setModal(null);
      },
      addAutomation: (name, trigger) => {
        setAutomations((v) => [
          {
            id: `automation-${Date.now()}`,
            name,
            trigger,
            steps: [trigger, "Wait 1 day", "Send email"],
            status: "Draft",
            enrolled: 0,
            completion: 0,
          },
          ...v,
        ]);
        toast("Automation draft created");
        setModal(null);
      },
      addSegment: (name, rule) => {
        setSegments((v) => [{ name, rule, count: 0, growth: "New" }, ...v]);
        toast("Segment created");
        setModal(null);
      },
      toggleIntegration: (name) => {
        setIntegrations((v) =>
          v.map((x) =>
            x.name === name ? { ...x, connected: !x.connected } : x,
          ),
        );
        toast(`${name} connection updated`);
        setModal(null);
      },
      toast,
      contactDrawer,
      setContactDrawer,
      mobileMenu,
      setMobileMenu,
    }),
    [
      version,
      section,
      site,
      period,
      contacts,
      campaigns,
      automations,
      integrations,
      segments,
      connectedSites,
      leadForms,
      modal,
      modalTarget,
      toast,
      contactDrawer,
      mobileMenu,
    ],
  );
  return (
    <AppContext.Provider value={ctx}>
      <div className={`app-shell theme-${version}`}>
        <Layout>
          <Page />
        </Layout>
        <ModalLayer />
        <ContactDrawer />
        <CommandPalette />
        {notice && (
          <div role="status" className={`toast toast-${notice.type}`}>
            {notice.type === "loading" ? (
              <LoaderCircle className="spin" size={18} />
            ) : notice.type === "error" ? (
              <AlertTriangle size={18} />
            ) : (
              <Check size={18} />
            )}
            <span>{notice.message}</span>
            <button
              onClick={() => setNotice(null)}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

function ModalLayer() {
  const {
    modal,
    modalTarget,
    closeModal,
    addContact,
    importContacts,
    removeContact,
    addSite,
    addForm,
    addCampaign,
    addAutomation,
    addSegment,
    toggleIntegration,
    toast,
  } = useApp();
  const [form, setForm] = useState<Record<string, string>>({});
  useEffect(() => setForm({}), [modal]);
  if (!modal) return null;
  const titles: Record<Exclude<ModalKind, null>, string> = {
    contact: "Add contact",
    import: "Import contacts from CSV",
    segment: "Create segment",
    automation: "Create automation",
    campaign: "Create campaign",
    template: "Edit email template",
    form: "Create lead form",
    site: "Connect site",
    integration: `Connect ${modalTarget}`,
    confirm: "Confirm removal",
  };
  const field = (
    name: string,
    label: string,
    placeholder: string,
    type = "text",
  ) => (
    <label className="field" key={name}>
      <span>{label}</span>
      <input
        type={type}
        required={name !== "company"}
        placeholder={placeholder}
        value={form[name] || ""}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
      />
    </label>
  );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (modal === "contact") addContact(form);
    else if (modal === "campaign")
      addCampaign(
        form.name || "Untitled campaign",
        form.audience || "All subscribers",
      );
    else if (modal === "automation")
      addAutomation(
        form.name || "Untitled automation",
        form.trigger || "Form submitted",
      );
    else if (modal === "segment")
      addSegment(form.name || "New segment", form.rule || "All contacts");
    else if (modal === "integration") toggleIntegration(modalTarget);
    else if (modal === "import") {
      if (!form.file) {
        toast("Choose a CSV file first", "error");
        return;
      }
      importContacts();
    } else if (modal === "site")
      addSite(form.name || "New site", form.domain || "example.com");
    else if (modal === "form")
      addForm(form.name || "New form", form.site || "5W Media");
    else if (modal === "confirm") removeContact(modalTarget);
    else {
      closeModal();
      toast(modal === "template" ? "Template saved" : "Changes saved");
    }
  };
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={titles[modal]}
      >
        <header>
          <div className="modal-symbol">
            {modal === "import" ? (
              <FileUp size={21} />
            ) : modal === "confirm" ? (
              <AlertTriangle size={21} />
            ) : (
              <Plus size={21} />
            )}
          </div>
          <div>
            <span className="eyebrow">5W WORKSPACE</span>
            <h2>{titles[modal]}</h2>
          </div>
          <button
            className="icon-button"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </header>
        <form onSubmit={submit}>
          <div className="modal-body">
            {modal === "contact" && (
              <>
                {field("name", "Full name", "Alex Morgan")}
                {field("email", "Email address", "alex@company.com", "email")}
                {field("company", "Company", "Company name")}
                {field("role", "Job title", "Marketing Director")}
              </>
            )}
            {modal === "import" && (
              <>
                <p>
                  Upload a CSV with name and email columns. A preview of the
                  imported contacts will be added to this prototype.
                </p>
                <label className="upload-box">
                  <FileUp size={28} />
                  <strong>{form.file || "Choose a CSV file"}</strong>
                  <small>CSV only · max 10 MB</small>
                  <input
                    type="file"
                    accept=".csv,text/csv"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        file: e.target.files?.[0]?.name || "",
                      })
                    }
                  />
                </label>
              </>
            )}
            {modal === "segment" && (
              <>
                {field("name", "Segment name", "High intent prospects")}
                {field("rule", "Audience rule", "Lead score above 75")}
                <p className="hint">
                  The segment will use a simulated audience until a backend is
                  connected.
                </p>
              </>
            )}
            {modal === "automation" && (
              <>
                {field("name", "Workflow name", "Post-event follow-up")}
                <label className="field">
                  <span>Start trigger</span>
                  <select
                    value={form.trigger || "Form submitted"}
                    onChange={(e) =>
                      setForm({ ...form, trigger: e.target.value })
                    }
                  >
                    <option>Form submitted</option>
                    <option>Lead score above 80</option>
                    <option>Tag added</option>
                    <option>Contact inactive</option>
                  </select>
                </label>
                <div className="flow-mini">
                  <span>Trigger</span>
                  <ArrowRight size={15} />
                  <span>Wait</span>
                  <ArrowRight size={15} />
                  <span>Send email</span>
                </div>
              </>
            )}
            {modal === "campaign" && (
              <>
                {field("name", "Campaign name", "October Growth Brief")}
                {field("audience", "Audience", "All subscribers")}
                <label className="field">
                  <span>Channel</span>
                  <select>
                    <option>Email</option>
                    <option>Newsletter</option>
                    <option>Lifecycle</option>
                  </select>
                </label>
              </>
            )}
            {modal === "template" && (
              <>
                {field(
                  "name",
                  "Template name",
                  modalTarget || "New email template",
                )}
                {field(
                  "subject",
                  "Subject line",
                  "A new perspective for your team",
                )}
                <label className="field">
                  <span>Preview text</span>
                  <textarea placeholder="Write a brief email preview..." />
                </label>
              </>
            )}
            {modal === "form" && (
              <>
                {field("name", "Form name", "Book a strategy call")}
                <label className="field">
                  <span>Connected site</span>
                  <select
                    value={form.site || "5W Media"}
                    onChange={(e) => setForm({ ...form, site: e.target.value })}
                  >
                    <option>5W Media</option>
                    <option>5W PR</option>
                    <option>5W Insights</option>
                  </select>
                </label>
                <p className="hint">
                  The new form starts as a draft with a simulated submission
                  count.
                </p>
              </>
            )}
            {modal === "site" && (
              <>
                {field("name", "Site name", "Your brand")}
                {field("domain", "Domain", "example.com")}
                <p className="hint">
                  A new connected site will appear in the network preview.
                </p>
              </>
            )}
            {modal === "integration" && (
              <>
                <p>
                  Connect {modalTarget} to bring its signals into your 5W
                  workspace.
                </p>
                <div className="connection-steps">
                  <span>
                    <Check size={16} /> Review permissions
                  </span>
                  <span>
                    <Check size={16} /> Sync historical data
                  </span>
                  <span>
                    <Check size={16} /> Turn on live events
                  </span>
                </div>
              </>
            )}
            {modal === "confirm" && (
              <p>
                This will remove{" "}
                <strong>{modalTarget || "the selected item"}</strong> from the
                current prototype session. You can close this dialog to keep it.
              </p>
            )}
          </div>
          <footer>
            <button
              type="button"
              className="button subtle"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button type="submit" className="button primary">
              {modal === "confirm"
                ? "Remove"
                : modal === "integration"
                  ? "Connect"
                  : modal === "import"
                    ? "Import contacts"
                    : modal === "template"
                      ? "Save template"
                      : modal === "site"
                        ? "Connect site"
                        : "Create"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function ContactDrawer() {
  const {
    contactDrawer,
    setContactDrawer,
    contacts,
    version,
    openModal,
    toast,
  } = useApp();
  const contact = contacts.find((c) => c.id === contactDrawer);
  if (!contact) return null;
  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setContactDrawer(null);
      }}
    >
      <aside className="contact-drawer">
        <header>
          <span className="eyebrow">CONTACT RECORD</span>
          <button
            className="icon-button"
            onClick={() => setContactDrawer(null)}
            aria-label="Close contact detail"
          >
            <X size={20} />
          </button>
        </header>
        <div className="drawer-person">
          <span className="avatar big" style={{ background: contact.color }}>
            {contact.initials}
          </span>
          <h2>{contact.name}</h2>
          <p>
            {contact.role} at {contact.company}
          </p>
          <span
            className={`status status-${contact.status.toLowerCase().replace(" ", "-")}`}
          >
            {contact.status}
          </span>
        </div>
        <div className="drawer-actions">
          <Link
            className="button primary"
            to={`/${version}/contacts/${contact.id}`}
          >
            Open full profile
          </Link>
          <button
            className="button subtle"
            onClick={() => toast(`Email draft started for ${contact.name}`)}
          >
            Send email
          </button>
        </div>
        <div className="drawer-section">
          <h3>Overview</h3>
          <dl>
            <div>
              <dt>Email</dt>
              <dd>{contact.email}</dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>{contact.site}</dd>
            </div>
            <div>
              <dt>Source</dt>
              <dd>{contact.source}</dd>
            </div>
            <div>
              <dt>Potential value</dt>
              <dd>${contact.value.toLocaleString()}</dd>
            </div>
          </dl>
        </div>
        <div className="drawer-section">
          <h3>Recent activity</h3>
          <div className="timeline-item">
            <i />
            Engaged with Fall Growth Playbook <small>2 days ago</small>
          </div>
          <div className="timeline-item">
            <i />
            Visited 3 pages on {contact.site}
            <small>4 days ago</small>
          </div>
        </div>
        <button
          className="text-danger"
          onClick={() => openModal("confirm", contact.name)}
        >
          Remove contact
        </button>
      </aside>
    </div>
  );
}

function CommandPalette() {
  const { version } = useApp();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-command", onOpen);
    return () => window.removeEventListener("open-command", onOpen);
  }, []);
  if (!open) return null;
  const links = navGroups
    .flatMap((g) => g.items)
    .filter(([, label]) => label.toLowerCase().includes(query.toLowerCase()));
  return (
    <div
      className="modal-backdrop palette-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="command-palette">
        <label>
          <Search size={20} />
          <input
            autoFocus
            placeholder="Search tools, contacts, actions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>ESC</kbd>
        </label>
        <div className="command-results">
          <span className="eyebrow">GO TO</span>
          {links.slice(0, 9).map(([path, label]) => (
            <button
              key={path}
              onClick={() => {
                navigate(`/${version}/${path}`);
                setOpen(false);
                setQuery("");
              }}
            >
              <Command size={15} />
              {label}
              <ArrowRight size={14} />
            </button>
          ))}
          {links.length === 0 && <p>No matching tools. Try another search.</p>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<VersionApp />} />
      <Route path="/v2/*" element={<VersionApp />} />
      <Route path="*" element={<Navigate to="/v2/" replace />} />
    </Routes>
  );
}
