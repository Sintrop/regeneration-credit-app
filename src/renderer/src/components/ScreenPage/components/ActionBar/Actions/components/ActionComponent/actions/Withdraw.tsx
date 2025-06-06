/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { useTranslation } from 'react-i18next'
import { SendTransactionButton } from '../../SendTransactionButton/SendTransactionButton'
import { TransactionData } from '@renderer/components/TransactionData/TransactionData'
import { WriteContractErrorType } from 'viem'
import { ActionContractProps } from '../ActionComponent'

export function Withdraw({ abi, addressContract }: ActionContractProps): JSX.Element {
  const { t } = useTranslation()

  const { writeContract, isPending, data: hash, error } = useWriteContract()
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash })

  function handleSendTransaction(): void {
    writeContract({
      //@ts-ignore
      address: addressContract ? addressContract : '',
      abi: abi ? abi : [],
      functionName: 'withdraw'
    })
  }

  return (
    <div className="flex flex-col pt-5">
      <SendTransactionButton
        label={t('withdraw')}
        handleSendTransaction={handleSendTransaction}
        disabled={isPending || isLoading}
      />

      <TransactionData
        hash={hash}
        isLoading={isLoading}
        isPending={isPending}
        isSuccess={isSuccess}
        errorTx={error as WriteContractErrorType}
      />
    </div>
  )
}
