// import UniswapInterfaceMulticall from '@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json'
import ElkDexInterfaceMulticall from '@elkdex/v3-periphery/artifacts/contracts/lens/ElkDexInterfaceMulticall.sol/ElkDexInterfaceMulticall.json'
import createDeployContractStep from './meta/createDeployContractStep'

export const DEPLOY_MULTICALL2 = createDeployContractStep({
  key: 'multicall2Address',
  artifact: ElkDexInterfaceMulticall,
})
