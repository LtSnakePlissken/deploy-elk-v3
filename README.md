# Deploy Elk V3 Script

This Package includes a CLI script for deploying Elk's V3 on any EVM compatible network/chain
This package Simplifies testing and deploying Elk V3 on any chain/network with simple script

## Prerequisites

Yarn
Linux Environment or WSL
This Repo
Node 16.9.1

## Usage

Clone this repo, by running `git clone https://github.com/elkfinance/deploy-elk-v3` in your terminal/bash
Use NVM to install and use Node version 16.9.1
if you don't know how to do that, go to [nvm-windows](https://github.com/coreybutler/nvm-windows) for Windows or run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh`  for Linux.
Confirm you are using the correct version of Node by running `nvm list` on your terminal or bash

Install Yarn, if you don't already have that, from [yarn](https://yarnpkg.com/)

In the root directory of the Repo run `yarn` to install the package dependencies

Make sure too run `yarn testAll`, this is important to compile the V3 contracts

As of this version the arguments are:

```text
> yarn @elk/deploy-v3 --help
Usage: yarn @elk/deploy-v3 [options]

Options:
  -pk, --private-key <string>               Private key used to deploy all contracts
  -j, --json-rpc <url>                      JSON RPC URL where the program should be deployed
  -w9, --weth9-address <address>            Address of the WETH9 contract on this chain
  -ncl, --native-currency-label <string>    Native currency label, e.g. ETH
  -o, --owner-address <address>             Contract address that will own the deployed artifacts after the script runs
  -s, --state <path>                        Path to the JSON file containing the migrations state (optional) (default: "./state.json")
  -v2, --v2-core-factory-address <address>  The V2 core factory address used in the swap router (optional)
  -g, --gas-price <number>                  The gas price to pay in GWEI for each transaction (optional)
  -c, --confirmations <number>              How many confirmations to wait for after each transaction (optional) (default: "2")
  -V, --version                             output the version number
  -h, --help                                display help for command
```

The script runs a set of migrations, each migration deploying a contract or executing a transaction. Migration state is
saved in a JSON file at the supplied path (by default `./state.json`).

The `state.template.json` shows a template of what the output should look like.

To use the script, you must fund an address, and pass the private key of that address to the script so that it can construct
and broadcast the deployment transactions.

Note that in between deployment steps, the script waits for confirmations. By default, this is set to `2`. If the network
only mines blocks when the transactions is queued (e.g. a local testnet), you must set confirmations to `0`.

## Development

run `yarn testAll` To run unit tests in the whole Repository including Deployment Implementation, Elk's V3 Core and Periphery

run `yarn start -pk <your private key> -j <json rpc of the chain> -w9 <w9 contract on the chain i.e the wrapped gas token of the chain> -ncl<The Native token Name> -o <owner of the proxy contract> -c <amount of confirmations per transaction>` TO deploy on a new chain instantly
Example `yarn start -pk 0xusjksososaa9a27296f861aad99so0uwelkisthebest94387iskoo09sujd71ec93 -j https://rpc.ankr.com/polygon_mumbai -w9 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889 -ncl MATIC -o 0xcd3f42e990c8f094a4f3c4256c42d742321424242 -c 1`

run `yarn compile` To compile all contracts in the Repository

To run unit tests, run `yarn test`. N.B. This tests just the deployment implementation

For testing the script, run `yarn start`.

### N.B. If you are going to deploy on several chains ensure you change the name of the created `./state.json` before attempting to deploy on another chain. e.g after deploying on Polygon change `./state.json` to `polygon.json`

## FAQs

### How much gas should I expect to use for full completion?

We estimate 30M - 40M gas needed to run the full deploy script, and it's very dependent on each individual chain.

### Where can I see all the addresses where each contract is deployed?

Check out `state.json`. It'll show you the final deployed addresses.

### When I run the script, it says "Contract was already deployed..."

If you intend to deploy on multiple chains then make sure you rename the `state.json` file before running the script, if not Delete `state.json` before a fresh deploy or. `state.json` tracks which steps have already occurred. If there are any entries, the deploy script will attempt to pick up from the last step in `state.json`.

### How long will the script take?

Depends on the Rpc used, chain speed and condition, confirmation times and gas parameter. The deploy script sends up to a total of 14 transactions.

### Where should I ask questions or report issues?

You can file them in `issues` on this repo and we'll try our best to respond.

### I got this error `Yarn requires Node.js 4.0 or higher to be installed.`

If you already installed Nvm and Node 16.9.1 as directed above, then just run again `nvm use 16.9.1`
