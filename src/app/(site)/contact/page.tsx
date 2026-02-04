"use client";

import { useMemo, useState } from "react";
import PageSection from "@/components/PageSection";
import PageHeader from "@/components/PageHeader";
import Divider from "@/components/Divider";
import BackgroundAccents from "@/components/BackgroundAccents";
import { useI18n } from "@/i18n/i18n";

export default function ContactPage() {
  const { t } = useI18n();

  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
  const linkedin = "https://linkedin.com/in/mohamadm/";

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string>("");


  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot
  });

  const canSend = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.message.trim() && status !== "sending";
  }, [form, status]);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "", company: "" });
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <PageSection>
      {/* background accents */}
      <BackgroundAccents />

      {/* Header */}
      <PageHeader
        title={t.contact.heading}
        subtitle={t.contact.subtitle}
        tags={[t.contact.availabilityTag, t.contact.locationTag]}
      />

      <Divider />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
            <p className="text-sm font-semibold text-white/90">{t.contact.formTitle}</p>

            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              {/* honeypot */}
              <input
                value={form.company}
                onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs text-neutral-300">{t.contact.name}</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                    placeholder="John Doe"
                    required
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs text-neutral-300">{t.contact.email}</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    type="email"
                    className="w-full rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                    placeholder="you@email.com"
                    required
                  />
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-xs text-neutral-300">{t.contact.subject}</span>
                <input
                  value={form.subject}
                  onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                  placeholder="Website / Collaboration / Question"
                />
              </label>

              <label className="space-y-2 block">
                <span className="text-xs text-neutral-300">{t.contact.message}</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-neutral-950/40 px-3 py-2 text-sm text-white outline-none transition focus:border-white/20 focus:ring-2 focus:ring-white/20"
                  placeholder="Tell me about your project..."
                  required
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? t.contact.sending : t.contact.send}
                </button>

                {status === "success" && (
                  <span className="text-sm text-emerald-300">{t.contact.success}</span>
                )}
                {status === "error" && (
                  <span className="text-sm text-red-300">{errorMsg || t.contact.error}</span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Direct */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-end justify-between gap-3">
              <p className="text-sm font-semibold text-white/90">
                {t.contact.directTitle}
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {/* Email row */}
              <div className="rounded-2xl border border-white/10 bg-neutral-950/30 p-4 transition hover:bg-neutral-950/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">{t.contact.emailLabel}</p>
                    <p
                      title={email}
                      aria-label={email}
                      className="mt-1 text-sm font-semibold text-white break-all sm:break-normal sm:truncate"
                    >
                      {email}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {t.contact.emailCta}
                    </a>

                    <button
                      type="button"
                      onClick={onCopy}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-neutral-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                    >
                      {copied ? t.contact.copied : t.contact.copy}
                    </button>
                  </div>
                </div>
              </div>

              {/* LinkedIn row */}
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-white/10 bg-neutral-950/30 p-4 transition hover:bg-neutral-950/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">{t.contact.linkedinLabel}</p>
                    <p
                      title="linkedin.com/in/mohamadsamermatar"
                      aria-label="linkedin.com/in/mohamadsamermatar"
                      className="mt-1 truncate text-sm font-semibold text-white"
                      >
                      linkedin.com/in/mohamadsamermatar
                    </p>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-neutral-300">
                    ↗
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>      
    </PageSection>
  );
}
