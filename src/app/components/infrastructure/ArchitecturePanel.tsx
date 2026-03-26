import Panel from "@/components/infrastructure/Panel";
import FlowList from "@/components/infrastructure/FlowList";
import type {I18nText, FlowItem } from "@/(site)/infrastructure/types";

type Props = {
  t: I18nText;
  flow: FlowItem[];
};

export default function ArchitecturePanel({ t, flow }: Props) {
  return (
    <Panel
      title={t.infra.ui.architectureTitle}
      hint={t.infra.ui.diagramHint}
      right={<span className="text-xs text-neutral-500">{t.infra.ui.flow}</span>}
    >
      <FlowList items={flow} />
    </Panel>
  );
}