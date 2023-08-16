import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeElkV3Pool } from '../../typechain/MockTimeElkV3Pool'
import { TestERC20 } from '../../typechain/TestERC20'
import { ElkV3Factory } from '../../typechain/ElkV3Factory'
import { TestElkV3Callee } from '../../typechain/TestElkV3Callee'
import { TestElkV3Router } from '../../typechain/TestElkV3Router'
import { MockTimeElkV3PoolDeployer } from '../../typechain/MockTimeElkV3PoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: ElkV3Factory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('ElkV3Factory')
  const factory = (await factoryFactory.deploy()) as ElkV3Factory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestElkV3Callee
  swapTargetRouter: TestElkV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeElkV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeElkV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeElkV3PoolDeployer')
  const MockTimeElkV3PoolFactory = await ethers.getContractFactory('MockTimeElkV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestElkV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestElkV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestElkV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestElkV3Router

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeElkV3PoolDeployerFactory.deploy()) as MockTimeElkV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeElkV3PoolFactory.attach(poolAddress) as MockTimeElkV3Pool
    },
  }
}
