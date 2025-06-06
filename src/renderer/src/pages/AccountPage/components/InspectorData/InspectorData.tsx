import {
  inspectorAbi,
  inspectorAddress,
  sequoiaInspectorAbi,
  sequoiaInspectorAddress
} from '@renderer/services/contracts'
import { InspectorProps } from '@renderer/types/inspector'
import { useTranslation } from 'react-i18next'
import { formatUnits } from 'viem'
import { useChainId, useReadContract } from 'wagmi'
import { UserTypeContentProps } from '../UserTypeContent'
import { ProofPhoto } from '../ProofPhoto/ProofPhoto'
import { UserContentTabs } from '../Tabs/UserContentTabs'
import { VoteToInvalidate } from '@renderer/components/VoteToInvalidate/VoteToInvalidate'

export function InspectorData({ address, profilePage }: UserTypeContentProps): JSX.Element {
  const { t } = useTranslation()
  const chainId = useChainId()

  const { data } = useReadContract({
    address: chainId === 250225 ? inspectorAddress : sequoiaInspectorAddress,
    abi: chainId === 250225 ? inspectorAbi : sequoiaInspectorAbi,
    functionName: 'getInspector',
    args: [address]
  })
  const inspector = data as InspectorProps

  const { data: responsePenalties } = useReadContract({
    address: chainId === 250225 ? inspectorAddress : sequoiaInspectorAddress,
    abi: chainId === 250225 ? inspectorAbi : sequoiaInspectorAbi,
    functionName: 'totalPenalties',
    args: [address]
  })
  const totalPenalties = responsePenalties
    ? parseInt(formatUnits(BigInt(responsePenalties as string), 0))
    : 0

  return (
    <div className="flex flex-col">
      <ProofPhoto address={address} hash={inspector && inspector?.proofPhoto} />

      {inspector && (
        <div className="flex gap-10">
          <div className="flex flex-col gap-2 mt-2">
            <p className="text-white mt-5">{address}</p>
            <p className="text-white">
              <span className="text-white font-bold">{t('id')}: </span>
              {formatUnits(BigInt(inspector?.id), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('name')}: </span>
              {inspector?.name}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('proofPhoto')}: </span>
              {inspector?.proofPhoto}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('totalInspections')}: </span>
              {formatUnits(BigInt(inspector?.totalInspections), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('lastAcceptedAt')}: </span>
              {formatUnits(BigInt(inspector?.lastAcceptedAt), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('lastInspection')}: </span>
              {formatUnits(BigInt(inspector?.lastInspection), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('level')}: </span>
              {formatUnits(BigInt(inspector?.pool?.level), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('eraPool')}: </span>
              {formatUnits(BigInt(inspector?.pool?.currentEra), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('registeredAt')}: </span>
              {formatUnits(BigInt(inspector?.createdAt), 0)}
            </p>
            <p className="text-white">
              <span className="text-white font-bold">{t('userType')}: </span> 2
            </p>

            <p className="text-red-500">
              <span className="font-bold">{t('giveUps')}: </span>
              {formatUnits(BigInt(inspector?.giveUps), 0)}
            </p>

            <p className="text-red-500">
              <span className="font-bold">{t('penalties')}: </span>
              {totalPenalties}
            </p>
          </div>

          {!profilePage && <VoteToInvalidate resourceType="user" userWallet={address} />}
        </div>
      )}

      <UserContentTabs
        address={address}
        availableTabs={['certificates', 'invitation', 'inspections', 'validations']}
      />
    </div>
  )
}
