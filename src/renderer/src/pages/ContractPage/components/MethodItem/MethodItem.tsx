/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react'
import { ContractListProps, MethodAbiProps } from '@renderer/types/contract'
import { MethodContent } from './MethodContent/MethodContent'
import { MethodTag } from './MethodTag'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

interface Props {
  method: MethodAbiProps
  contract: ContractListProps
}

export function MethodItem({ method, contract }: Props): JSX.Element {
  const [openMethod, setOpenMethod] = useState(false)

  function toggleOpenMethod(): void {
    setOpenMethod((value) => !value)
  }

  if (!method.name) return <div />

  if (method.type !== 'function') return <div />

  return (
    <div className="flex flex-col w-full px-5 py-2 bg-container-primary rounded-2xl mb-5">
      <button
        className="flex items-center justify-between text-white hover:cursor-pointer"
        onClick={toggleOpenMethod}
      >
        <div className="flex items-center gap-3">
          {method.name}
          <MethodTag methodType={method.stateMutability} />
        </div>

        {openMethod ? <FaChevronUp color="white" /> : <FaChevronDown color="white" />}
      </button>

      {openMethod && <MethodContent method={method} contract={contract} />}
    </div>
  )
}
