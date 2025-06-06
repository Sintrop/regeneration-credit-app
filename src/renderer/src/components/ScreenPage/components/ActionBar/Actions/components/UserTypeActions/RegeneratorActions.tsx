import {
  regeneratorAbi,
  regeneratorAddress,
  sequoiaRegeneratorAbi,
  sequoiaRegeneratorAddress,
  inspectionAbi,
  inspectionAddress,
  sequoiaInspectionAbi,
  sequoiaInspectionAddress
} from '@renderer/services/contracts'
import { useChainId } from 'wagmi'
import { ActionComponent } from '../ActionComponent/ActionComponent'
import { Abi } from 'viem'

interface Props {
  mainAction?: boolean
}
export function RegeneratorActions({ mainAction }: Props): JSX.Element {
  const chainId = useChainId()

  const regeneratorContractAddressToUse =
    chainId === 250225 ? regeneratorAddress : sequoiaRegeneratorAddress
  const regeneratorAbiToUse = chainId === 250225 ? regeneratorAbi : sequoiaRegeneratorAbi

  const inspectionContractAddressToUse =
    chainId === 250225 ? inspectionAddress : sequoiaInspectionAddress
  const inspectionAbiToUse = chainId === 250225 ? inspectionAbi : sequoiaInspectionAbi

  if (mainAction) {
    return (
      <ActionComponent
        actionName="requestInspection"
        addressContract={inspectionContractAddressToUse}
        abi={inspectionAbiToUse as Abi}
        mainAction
      />
    )
  }

  return (
    <div className="flex flex-col">
      <ActionComponent
        actionName="withdraw"
        addressContract={regeneratorContractAddressToUse}
        abi={regeneratorAbiToUse as Abi}
      />

      <ActionComponent
        actionName="requestInspection"
        addressContract={inspectionContractAddressToUse}
        abi={inspectionAbiToUse as Abi}
      />
    </div>
  )
}
