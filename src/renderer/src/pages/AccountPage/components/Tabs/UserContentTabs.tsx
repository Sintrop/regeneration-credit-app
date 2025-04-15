import { useState } from 'react'
import { TabItem } from '@renderer/components/TabItem/TabItem'
import { ContentTab, UserTypeContentTabsName } from './ContentTab'
import { useTranslation } from 'react-i18next'

interface Props {
  address: string
  availableTabs: UserTypeContentTabsName[]
}

export function UserContentTabs({ address, availableTabs }: Props): JSX.Element {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState('invitationTab')

  return (
    <div className="flex flex-col my-10">
      <div className="flex gap-5">
        {availableTabs.map((tab, index) => (
          <TabItem
            key={index}
            label={t(tab)}
            onChange={setSelectedTab}
            value={tab}
            isSelected={selectedTab === tab}
          />
        ))}
      </div>

      <ContentTab selectedTab={selectedTab as UserTypeContentTabsName} address={address} />
    </div>
  )
}
