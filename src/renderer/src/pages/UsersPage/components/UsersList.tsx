import { Activists } from './Activists/Activists'
import { Contributors } from './Contributors/Contributors'
import { Developers } from './Developers/Developers'
import { Inspectors } from './Inspectors/Inspectors'
import { Regenerators } from './Regenerators/Regenerators'
import { Researchers } from './Researchers/Researchers'
import { Supporters } from './Supporters/Supporters'

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
  4: Developers,
  5: Contributors,
  6: Activists,
  7: Supporters
}

type UserTypeToListType = keyof typeof userTypeToList
