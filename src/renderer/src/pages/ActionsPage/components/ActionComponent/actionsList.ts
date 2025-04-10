import { AcceptInspection } from './actions/Inspectors/AcceptInspection'
import { AddCalculatorItem } from './actions/Researchers/AddCalculatorItem'
import { AddDelation } from './actions/AddDelation'
import { AddResearch } from './actions/Researchers/AddResearch'
import { AddResearchValidation } from './actions/Researchers/AddResearchValidation'
import { BurnTokens } from './actions/BurnTokens'
import { AddReport } from './actions/Developers/AddReport'
import { AddReportValidation } from './actions/Developers/AddReportValidation'
import { Invite } from './actions/Invite'
import { RequestInspection } from './actions/Producers/RequestInspection'
import { Withdraw } from './actions/Withdraw'
import { AddContribution } from './actions/Contributors/AddContribution'

export const actionsList = {
  burnTokens: {
    name: 'burnTokens',
    description: 'shortDescriptionBurntokens',
    component: BurnTokens
  },
  invite: {
    name: 'invite',
    description: 'shortDescriptionInvite',
    component: Invite
  },
  addDelation: {
    name: 'addDelation',
    description: 'shortDescriptionAddDelation',
    component: AddDelation
  },
  withdraw: {
    name: 'withdraw',
    description: 'shortDescriptionWithdraw',
    component: Withdraw
  },
  requestInspection: {
    name: 'requestInspection',
    description: 'shortDescriptionRequestInspection',
    component: RequestInspection
  },
  acceptInspection: {
    name: 'acceptInspection',
    description: 'shortDescriptionAcceptInspection',
    component: AcceptInspection
  },
  addResearch: {
    name: 'addResearch',
    description: 'shortDescriptionaddResearch',
    component: AddResearch
  },
  addResearchValidation: {
    name: 'addResearchValidation',
    description: 'shortDescriptionaddResearchValidation',
    component: AddResearchValidation
  },
  addCalculatorItem: {
    name: 'addCalculatorItem',
    description: 'shortDescriptionaddCalculatorItem',
    component: AddCalculatorItem
  },
  addReport: {
    name: 'addReport',
    description: 'shortDescriptionaddReport',
    component: AddReport
  },
  addReportValidation: {
    name: 'addReportValidation',
    description: 'shortDescriptionaddReportValidation',
    component: AddReportValidation
  },
  addContribution: {
    name: 'addContribution',
    description: 'shortDescriptionaddContribution',
    component: AddContribution
  }
}

export type ActionsNameType = keyof typeof actionsList
