import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ContractPoolData } from './components/ContractPoolData'
import { ContractsPoolName } from './contractsPoolList'
import { ScreenPage } from '@renderer/components/ScreenPage/ScreenPage'

export function PoolPage(): JSX.Element {
  const { t } = useTranslation()
  const params = useParams()
  const poolName = params.poolName as ContractsPoolName

  return (
    <ScreenPage pageTitle={t(poolName)}>
      <ContractPoolData poolName={poolName} />
    </ScreenPage>
  )
}
