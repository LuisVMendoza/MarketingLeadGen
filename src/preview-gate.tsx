import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import "./preview-gate.css";

// A lightweight gate for a short-lived public prototype. This is not server auth.
const PASSWORD_HASH =
  "f4283c01d732c6f064d4924af22b52fa28c5237dae72abbca193fa4097791741";
const SESSION_KEY = "5w-preview-session";

function hasPreviewSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === PASSWORD_HASH;
  } catch {
    return false;
  }
}

async function hashPassword(password: string) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export default function PreviewGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(hasPreviewSession);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setChecking(true);
    setError("");
    try {
      if ((await hashPassword(password)) === PASSWORD_HASH) {
        try {
          sessionStorage.setItem(SESSION_KEY, PASSWORD_HASH);
        } catch {
          // Access still works if the browser blocks session storage.
        }
        setUnlocked(true);
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Unable to verify access. Please reload the page.");
    } finally {
      setChecking(false);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <main className="preview-gate" lang="en">
      <form className="preview-login" onSubmit={submit}>
        <div className="preview-login-brand">
          <span className="preview-login-mark">5W</span>
          <span>
            <strong>5W Marketing</strong>
            <small>LEAD GEN SUITE</small>
          </span>
        </div>
        <label htmlFor="preview-password">Password</label>
        <div className="preview-password-field">
          <input
            id="preview-password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            required
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "preview-password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {error && (
          <p
            className="preview-login-error"
            id="preview-password-error"
            role="alert"
          >
            {error}
          </p>
        )}
        <button
          className="preview-login-submit"
          type="submit"
          disabled={checking}
        >
          {checking ? "Checking..." : "Continue"}
          <ArrowRight size={17} />
        </button>
      </form>
    </main>
  );
}
