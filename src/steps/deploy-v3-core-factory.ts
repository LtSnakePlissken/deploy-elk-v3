// import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import ElkV3Factory from '../../contracts/Elk-v3-core/artifacts/contracts/ElkV3Factory.sol/ElkV3Factory.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_V3_CORE_FACTORY = createDeployContractStep({
  key: 'v3CoreFactoryAddress',
  artifact: ElkV3Factory,
})
