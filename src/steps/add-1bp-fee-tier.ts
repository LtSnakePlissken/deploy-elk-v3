// import UniswapV3Factory from '@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json'
import ElkV3Factory from '../../contracts/Elk-v3-core/artifacts/contracts/ElkV3Factory.sol/ElkV3Factory.json'
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

const ONE_BP_FEE = 100
const ONE_BP_TICK_SPACING = 1

export const ADD_1BP_FEE_TIER: MigrationStep = async (state, { signer, gasPrice }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing ElkV3Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, ElkV3Factory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner !== (await signer.getAddress())) {
    throw new Error('ElkV3Factory.owner is not signer')
  }
  const tx = await v3CoreFactory.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING, { gasPrice })

  return [
    {
      message: `ElkV3Factory added a new fee tier ${ONE_BP_FEE / 100} bps with tick spacing ${ONE_BP_TICK_SPACING}`,
      hash: tx.hash,
    },
  ]
}
