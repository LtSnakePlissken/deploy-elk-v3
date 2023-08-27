import ElkV3Factory from '@elkdex/v3-core/artifacts/contracts/ElkDexV3Factory.sol/ElkDexV3Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: ElkV3Factory,
})
