/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useTranslation } from 'react-i18next'
import { ActionComponent } from '../ActionComponent/ActionComponent'

export function GeneralActions(): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <p className="text-white">{t('generalActions')}</p>
      <ActionComponent actionName="burnTokens" />
    </div>
  )
}
