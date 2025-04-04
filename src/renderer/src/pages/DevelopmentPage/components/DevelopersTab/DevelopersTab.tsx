import {
  userAbi,
  userAddress,
  sequoiaUserAbi,
  sequoiaUserAddress
} from '@renderer/services/contracts'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'
import { useChainId, useReadContract } from 'wagmi'
import { DeveloperItem } from './DeveloperItem'

export function DevelopersTab(): JSX.Element {
  const { t } = useTranslation()
  const chainId = useChainId()

  const { data } = useReadContract({
    address: chainId === 250225 ? userAddress : sequoiaUserAddress,
    abi: chainId === 250225 ? userAbi : sequoiaUserAbi,
    functionName: 'userTypesTotalCount',
    args: [4]
  })

  let developersCount: number = 0
  let developersIds: number[] = []

  if (data) {
    const count = parseInt(formatUnits(BigInt(data as string), 0))
    developersCount = count

    const ids = Array.from({ length: count }, (_, i) => i + 1)
    developersIds = ids.reverse()
  }

  return (
    <div className="flex flex-col">
      <p className="text-white">
        {t('developersCount')}: {developersCount}
      </p>
      <div className="flex flex-col overflow-x-auto bg-container-primary rounded-2xl">
        <div className="flex items-center px-5 h-10 border-b-2 border-container-secondary">
          <div className="border-r border-container-secondary min-w-[50px]">
            <p className="text-white font-semibold">ID</p>
          </div>

          <div className="border-r border-container-secondary min-w-[400px] pl-5">
            <p className="text-white font-semibold">{t('wallet')}</p>
          </div>

          <div className="border-r border-container-secondary min-w-[300px] pl-5">
            <p className="text-white font-semibold">{t('name')}</p>
          </div>

          <div className="border-r border-container-secondary min-w-[120px] pl-5">
            <p className="text-white font-semibold">{t('createdAt')}</p>
          </div>

          <div className="border-r border-container-secondary min-w-[120px] pl-5">
            <p className="text-white font-semibold">{t('totalReports')}</p>
          </div>

          <div className="border-r border-container-secondary min-w-[100px] pl-5">
            <p className="text-white font-semibold">{t('level')}</p>
          </div>

          <div className="border-r border-container-secondary min-w-[120px] pl-5">
            <p className="text-white font-semibold">{t('actions')}</p>
          </div>
        </div>

        {developersIds.length === 0 ? (
          <div></div>
        ) : (
          <>
            {developersIds.map((id, index) => (
              <DeveloperItem key={index} id={id} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
