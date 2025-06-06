import { useState } from 'react'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'
import { TabItem } from '@renderer/components/TabItem/TabItem'
import { useTranslation } from 'react-i18next'
import { ContributionsTab, TabContent } from './components/TabContent'

export function ContributionsPage(): JSX.Element {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState('contributions')

  return (
    <ScreenPage pageTitle={t('contributions')}>
      <div className="flex items-center gap-5">
        <TabItem
          label={t('contributions')}
          value="contributions"
          onChange={setSelectedTab}
          isSelected={selectedTab === 'contributions'}
        />

        <TabItem
          label={t('contributors')}
          value="contributors"
          onChange={setSelectedTab}
          isSelected={selectedTab === 'contributors'}
        />
      </div>

      <div className="flex flex-col">
        <TabContent selectedTab={selectedTab as ContributionsTab} />
      </div>
    </ScreenPage>
  )
}
