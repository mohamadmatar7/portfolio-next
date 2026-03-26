import InfoCard from "@/components/InfoCard";
import Pill from "@/components/infrastructure/Pill";
import type { I18nText, StatusTone } from "@/(site)/infrastructure/types";
import { getToneStyles } from "@/(site)/infrastructure/utils";

type Props = {
  t: I18nText;
  loading: boolean;
  online: boolean;
  overallTone: StatusTone;
  realtimeConnected: boolean;
  fetchError: string | null;
  chips: string[];
  servicesSummary: string;
};

export default function InfrastructureHero({
  t,
  loading,
  online,
  overallTone,
  realtimeConnected,
  fetchError,
  chips,
  servicesSummary,
}: Props) {
  return (
    <div className="px-1 py-2">
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  getToneStyles(loading ? "warn" : overallTone).dot
                }`}
              />
              {t.infra.status.title} •{" "}
              {loading
                ? t.infra.ui.loading
                : online
                  ? t.infra.status.online
                  : t.infra.status.offline}
            </div>

            <Pill tone={realtimeConnected ? "ok" : "warn"}>
              {realtimeConnected ? t.infra.ui.realtimeConnected : t.infra.ui.realtimePolling}
            </Pill>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              {t.infra.heading}
            </span>
          </h1>

          <p className="mt-4 max-w-2xl leading-relaxed text-neutral-300">{t.infra.subtitle}</p>

          <div className="mt-6 space-y-3">
            {t.infra.paragraphs.map((p: string) => (
              <p key={p} className="leading-relaxed text-neutral-300">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              {t.infra.values.security}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              {t.infra.values.access}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200">
              {t.infra.values.source}
            </span>
          </div>

          {fetchError ? (
            <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
              {t.infra.ui.fetchError}: {fetchError}
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-5">
          <InfoCard
            title={t.infra.ui.stackTitle}
            chips={chips}
            rows={[
              { label: t.infra.badges.frontend, value: t.infra.values.frontend },
              { label: t.infra.badges.source, value: t.infra.values.source },
              { label: t.infra.badges.services, value: servicesSummary },
            ]}
            footerLeft={t.infra.badges.access}
            footerRight={t.infra.values.access}
          />
        </div>
      </div>
    </div>
  );
}