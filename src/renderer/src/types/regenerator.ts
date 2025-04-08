export interface RegeneratorProps {
  id: number
  regeneratorWallet: string
  name: string
  proofPhoto: string
  pendingInspection: boolean
  totalInspections: number
  lastRequestAt: number
  totalArea: number
  regenerationScore: {
    score: number
    average: number
  }
  pool: {
    onContractPool: boolean
    currentEra: number
  }
  createdAt: number
}
