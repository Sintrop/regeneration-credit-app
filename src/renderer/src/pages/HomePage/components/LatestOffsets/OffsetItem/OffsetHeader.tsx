import {
  sequoiaSupporterAbi,
  sequoiaSupporterAddress,
  supporterAbi,
  supporterAddress
} from '@renderer/services/contracts'
import { SupporterProps } from '@renderer/types/supporter'
import { Jazzicon } from '@ukstv/jazzicon-react'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import { formatUnits } from 'viem'
import { useChainId, useReadContract } from 'wagmi'

interface Props {
  address?: string
  isLoading?: boolean
  publishedAt?: string
}

export function OffsetHeader({ address, publishedAt }: Props): JSX.Element {
  const navigate = useNavigate()
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? supporterAddress : sequoiaSupporterAddress,
    abi: chainId === 250225 ? supporterAbi : sequoiaSupporterAbi,
    functionName: 'getSupporter',
    args: [address]
  })

  const supporter = data as SupporterProps

  function handleGoToUserDetails(): void {
    navigate(`/user-details/${address}`)
  }

  return (
    <div className="flex items-center gap-3 border-b border-container-secondary pb-3">
      {address && <Jazzicon address={address} className="w-10 h-10" />}

      <div className="flex flex-col">
        <p
          className="text-white hover:cursor-pointer hover:underline"
          onClick={handleGoToUserDetails}
        >
          {supporter ? supporter?.name : address}
        </p>

        {publishedAt && (
          <p className="text-gray-300 text-xs">
            {t('publishedAt')}: {formatUnits(BigInt(publishedAt), 0)}
          </p>
        )}
      </div>
    </div>
  )
}
