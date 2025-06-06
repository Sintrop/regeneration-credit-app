import { CalculatorItemsTab } from './CalculatorItemsTab/CalculatorItemsTab'
import { ResearchersTab } from './ResearchersTab/ResearchersTab'
import { ResearchesTab } from './ResearchesTab/ResearchesTab'

interface Props {
  selectedTab: ResearchesTabs
}

export function TabContent({ selectedTab }: Props): JSX.Element {
  const Tab = tabs[selectedTab]

  return <Tab />
}

const tabs = {
  researches: ResearchesTab,
  researchers: ResearchersTab,
  calculatorItems: CalculatorItemsTab
}

export type ResearchesTabs = keyof typeof tabs
