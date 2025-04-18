import { useChainId, useReadContract } from 'wagmi'
import {
  contributorAbi,
  contributorAddress,
  sequoiaContributorAbi,
  sequoiaContributorAddress
} from '@renderer/services/contracts'
import { formatUnits } from 'viem'
import { ContributionProps } from '@renderer/types/contributor'
import { UserAddressLink } from '@renderer/components/UserAddressLink/UserAddressLink'
import { PdfHashLink } from '@renderer/components/PdfHashLink/PdfHashLink'

interface Props {
  id: number
}

export function ContributionItem({ id }: Props): JSX.Element {
  const chainId = useChainId()
  const { data } = useReadContract({
    address: chainId === 250225 ? contributorAddress : sequoiaContributorAddress,
    abi: chainId === 250225 ? contributorAbi : sequoiaContributorAbi,
    functionName: 'getContribution',
    args: [id]
  })

  const contribution = data as ContributionProps

  return (
    <tr className="border-b border-container-primary text-white">
      <td className="p-2">{id}</td>
      <td className="p-2">{contribution && <UserAddressLink address={contribution?.user} />}</td>
      <td className="p-2">
        {contribution && formatUnits(BigInt(contribution?.createdAtBlockNumber), 0)}
      </td>
      <td className="p-2">{contribution && formatUnits(BigInt(contribution?.era), 0)}</td>
      <td className="p-2">{contribution && <PdfHashLink hash={contribution.report} />}</td>
      <td className="p-2"></td>
    </tr>
  )
}
