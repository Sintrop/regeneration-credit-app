import { Developers } from './Developers/Developers'
import { Inspectors } from './Inspectors/Inspectors'
import { Regenerators } from './Regenerators/Regenerators'
import { Researchers } from './Researchers/Researchers'

interface Props {
  userType: number
  idsList: number[]
}

export function UsersList({ idsList, userType }: Props): JSX.Element {
  const List = userTypeToList[userType as UserTypeToListType]

  return <List idsList={idsList} />
}

const userTypeToList = {
  1: Regenerators,
  2: Inspectors,
  3: Researchers,
  4: Developers
}

type UserTypeToListType = keyof typeof userTypeToList
