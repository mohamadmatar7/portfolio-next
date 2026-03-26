import Panel from "@/components/infrastructure/Panel";
import Pill from "@/components/infrastructure/Pill";
import ServiceRow from "@/components/infrastructure/ServiceRow";
import type {
  I18nText,
  ServiceItem,
  ServiceStatusLabels,
} from "@/(site)/infrastructure/types";

type Props = {
  t: I18nText;
  services: ServiceItem[];
  online: boolean;
  serviceStatusLabels: ServiceStatusLabels;
};

export default function ServicesPanel({
  t,
  services,
  online,
  serviceStatusLabels,
}: Props) {
  return (
    <Panel
      title={t.infra.ui.containersTitle}
      hint={t.infra.ui.containersHint}
      right={<Pill tone={online ? "ok" : "warn"}>{t.infra.ui.docker}</Pill>}
    >
      <div className="grid gap-3">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceRow key={service.name} item={service} labels={serviceStatusLabels} />
          ))
        ) : (
          <div className="rounded-xl border border-white/10 bg-neutral-950/40 px-4 py-4 text-sm text-neutral-400">
            {t.infra.ui.noServiceData}
          </div>
        )}
      </div>
    </Panel>
  );
}