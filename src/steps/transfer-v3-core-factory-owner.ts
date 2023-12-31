import ElkV3Factory from '@elkdex/v3-core/artifacts/contracts/ElkDexV3Factory.sol/ElkDexV3Factory.json';
import { Contract } from '@ethersproject/contracts'
import { MigrationStep } from '../migrations'

export const TRANSFER_V3_CORE_FACTORY_OWNER: MigrationStep = async (state, { signer, gasPrice, ownerAddress }) => {
  if (state.v3CoreFactoryAddress === undefined) {
    throw new Error('Missing ElkV3Factory')
  }

  const v3CoreFactory = new Contract(state.v3CoreFactoryAddress, ElkV3Factory.abi, signer)

  const owner = await v3CoreFactory.owner()
  if (owner === ownerAddress)
    return [
      {
        message: `ElkV3Factory owned by ${ownerAddress} already`,
      },
    ]

  if (owner !== (await signer.getAddress())) {
    throw new Error('ElkV3Factory.owner is not signer')
  }

  const tx = await v3CoreFactory.setOwner(ownerAddress, { gasPrice })

  return [
    {
      message: `ElkV3Factory ownership set to ${ownerAddress}`,
      hash: tx.hash,
    },
  ]
}
