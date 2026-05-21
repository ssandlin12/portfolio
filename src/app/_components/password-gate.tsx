"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Figtree } from "next/font/google";
import { useActionState, useEffect, type CSSProperties } from "react";
import { submitCasePassword } from "../_actions/case-access";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
  display: "swap",
});

const INK_DARK = "#292929";

const navItem: CSSProperties = {
  fontSize: 15,
  letterSpacing: "0.01em",
  fontWeight: 500,
  color: "rgba(41,41,41,0.5)",
  textDecoration: "none",
  transition: "color 160ms ease-out",
};

type Props = { title: string };

export default function PasswordGate({ title }: Props) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    submitCasePassword,
    null,
  );

  // Belt-and-suspenders: when the action succeeds the server has set the
  // HttpOnly cookie. Refresh the route so the server component re-runs
  // the cookie check and swaps the gate for the protected content. Without
  // this we depend on Next.js auto-revalidating after a useActionState
  // server-action call, which I don't want to rely on silently.
  useEffect(() => {
    if (state?.ok) router.refresh();
  }, [state, router]);

  return (
    <main
      className={`${figtree.variable} min-h-screen flex flex-col relative`}
      style={{
        fontFamily: "var(--font-figtree), system-ui, sans-serif",
        color: INK_DARK,
        backgroundColor: "#ffffff",
        paddingInline: "clamp(20px, 6vw, 120px)",
        paddingTop: "calc(clamp(24px, 6vh, 72px) - 24px)",
        paddingBottom: "clamp(24px, 6vh, 72px)",
        colorScheme: "light",
      }}
    >
      <style>{`
        .nav-link:hover { color: ${INK_DARK} !important; }

        .back-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f1f1f1;
          border-radius: 999px;
          height: 36px;
          padding: 0 22px 0 16px;
          font-size: 15px;
          font-weight: 400;
          color: ${INK_DARK};
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background-color 160ms ease-out;
        }
        .back-pill:hover {
          background: #e8e8e8;
        }

        .gate-wrap {
          width: 100%;
          max-width: 420px;
          margin-inline: auto;
          margin-top: clamp(72px, 12vh, 160px);
          text-align: center;
        }
        .gate-title {
          font-size: 34px;
          line-height: 1.2;
          letter-spacing: -0.02em;
          font-weight: 300;
          color: ${INK_DARK};
          margin: 0;
        }
        .gate-subtitle {
          font-size: 17px;
          line-height: 1.5;
          color: rgba(41, 41, 41, 0.6);
          margin: 12px 0 0;
        }
        .gate-form {
          display: flex;
          gap: 8px;
          margin-top: 28px;
        }
        .gate-input {
          flex: 1 1 auto;
          height: 44px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid rgba(41, 41, 41, 0.15);
          background: #ffffff;
          font-size: 15px;
          color: ${INK_DARK};
          font-family: inherit;
          outline: none;
          transition: border-color 160ms ease-out, box-shadow 160ms ease-out;
        }
        .gate-input:focus {
          border-color: rgba(41, 41, 41, 0.4);
          box-shadow: 0 0 0 3px rgba(41, 41, 41, 0.06);
        }
        .gate-submit {
          height: 44px;
          padding: 0 20px;
          border-radius: 12px;
          border: none;
          background: ${INK_DARK};
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          font-family: inherit;
          cursor: pointer;
          transition: background-color 160ms ease-out, opacity 160ms ease-out;
        }
        .gate-submit:hover {
          background: #1a1a1a;
        }
        .gate-submit:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .gate-error {
          font-size: 14px;
          color: #b3261e;
          margin: 12px 0 0;
          min-height: 1.4em;
        }
      `}</style>

      {/* Top header — Back pill (left), nav links (right). */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          alignItems: "center",
          columnGap: "clamp(20px, 4vw, 48px)",
        }}
      >
        <Link
          href="/"
          className="back-pill"
          aria-label="Back to home"
          style={{ justifySelf: "start" }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 4L5 8L10 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </Link>
        <nav
          className="flex"
          style={{ justifySelf: "end", columnGap: "clamp(20px, 4vw, 40px)" }}
        >
          <a
            href="https://drive.google.com/file/d/1Vc50sGAOZPn380b65T648lka6LVHIrct/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={navItem}
          >
            Resume
          </a>
          <a
            href="https://www.linkedin.com/in/anna-sandlin/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={navItem}
          >
            LinkedIn
          </a>
        </nav>
      </div>

      <div className="gate-wrap">
        <h1 className="gate-title">{title}</h1>
        <p className="gate-subtitle">
          This case study is password protected.
        </p>
        <form action={formAction} className="gate-form">
          <input
            className="gate-input"
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            autoFocus
            required
          />
          <button
            type="submit"
            className="gate-submit"
            disabled={pending}
          >
            {pending ? "Checking…" : "Continue"}
          </button>
        </form>
        <p className="gate-error" role="alert" aria-live="polite">
          {state?.error ?? ""}
        </p>
      </div>
    </main>
  );
}
