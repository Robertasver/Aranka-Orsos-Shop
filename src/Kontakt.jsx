import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import "./styles/contact.css";
import { CONTACT_CFG } from "./contact.config";

const CONTACT = {
  email: "arankaorsos80@gmail.com",
  phone: "+4790060336",
  whatsapp: "https://wa.me/4790060336",
  facebook: "https://www.facebook.com/aranka.orsos2",
};

export default function Kontakt() {
  const { t } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const item = params.get("item");
  const cat = params.get("cat");

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const FORM_ENDPOINT = CONTACT_CFG?.FORMSPREE_FORM_ID
    ? `https://formspree.io/f/${CONTACT_CFG.FORMSPREE_FORM_ID}`
    : null;

  // Autofill starting text from URL params
  const autofill = useMemo(() => {
    if (!item && !cat) return "";
    return t("contact.autofill", { cat: cat || "", item: item || "" });
  }, [item, cat, t]);

  // Prime the textarea on first load, if empty
  useEffect(() => {
    const el = document.querySelector("textarea[name='message']");
    if (el && autofill && !el.value) el.value = autofill;
  }, [autofill]);

  const subject = t("contact.email_subject");
  const pickTyped = () => {
    const typed = document.querySelector("textarea[name='message']")?.value?.trim() || "";
    return typed || autofill || "";
  };

  // Optional quick actions (still available)
  const buildMailHref = () =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(pickTyped())}`;
  const buildWaHref = () => `${CONTACT.whatsapp}?text=${encodeURIComponent(pickTyped())}`;
  const telHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  // --- Submit WITHOUT a mail app (via Formspree) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      alert("Set your Formspree form ID in src/contact.config.js to enable direct sending without a mail app.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    // ensure message present even if user left textarea empty
    if (!data.get("message")) data.set("message", autofill || "");
    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="container contact-wrap">
      <section className="contact-card" aria-labelledby="contact-title">
        <header className="contact-head">
          <h1 id="contact-title">{t("contact.title")}</h1>
          <p>{t("contact.lead", "Have questions or special requests? Send us a message.")}</p>
        </header>

        {/* Status banner */}
        {status === "sent" && (
          <div role="status" style={{marginBottom:12, padding:"10px 12px", borderRadius:10, background:"rgba(36,160,120,.18)", border:"1px solid rgba(120,255,200,.25)"}}>
            ✅ {t("contact.sent", "Thanks! Your message was sent.")}
          </div>
        )}
        {status === "error" && (
          <div role="alert" style={{marginBottom:12, padding:"10px 12px", borderRadius:10, background:"rgba(255,60,60,.12)", border:"1px solid rgba(255,120,120,.35)"}}>
            ⚠️ {t("contact.error", "Something went wrong. Please try again or use Email/WhatsApp.")}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="label">{t("contact.name")}</span>
            <input className="input" placeholder={t("contact.placeholder.name")} name="name" autoComplete="name" />
          </label>

          <label className="field">
            <span className="label">{t("contact.email")}</span>
            <input className="input" placeholder={t("contact.placeholder.email")} name="email" autoComplete="email" />
          </label>

          <label className="field col-span-2">
            <span className="label">{t("contact.message")}</span>
            <textarea rows={6} className="input" placeholder={t("contact.placeholder.message")} name="message" />
          </label>

          <div className="actions col-span-2">
            <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
              {status === "sending" ? t("contact.sending", "Sending…") : t("contact.send")}
            </button>

            {/* Optional quick actions remain available */}
            <a
              className="btn btn-ghost"
              href={buildMailHref()}
              onClick={(e) => { e.preventDefault(); window.location.href = buildMailHref(); }}
            >
              {t("contact.actions.email")}
            </a>
            <a
              className="btn btn-ghost"
              href={buildWaHref()}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => { e.preventDefault(); window.open(buildWaHref(), "_blank", "noreferrer"); }}
            >
              {t("contact.actions.whatsapp")}
            </a>
            <a className="btn btn-ghost" href={telHref}>{t("contact.actions.call")}</a>
            <a className="btn btn-ghost" href={CONTACT.facebook} target="_blank" rel="noreferrer">
              {t("contact.actions.facebook")}
            </a>
          </div>
        </form>

        <div className="contact-info" role="list">
          <div className="info-item" role="listitem">✉️ <a href={buildMailHref()}>{CONTACT.email}</a></div>
          <div className="info-item" role="listitem">📞 <a href={telHref}>{CONTACT.phone}</a></div>
          <div className="info-item" role="listitem">💬 <a href={buildWaHref()} target="_blank" rel="noreferrer">WhatsApp</a></div>
          <div className="info-item" role="listitem">📘 <a href={CONTACT.facebook} target="_blank" rel="noreferrer">Facebook</a></div>
        </div>

        <div className="contact-footer-spacer" />
      </section>
    </main>
  );
}