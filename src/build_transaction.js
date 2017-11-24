import BitcoinHelper from './bitcoin/helper'
import Logger from './lib/log4js'
import path from 'path'
import { pbcopy } from './lib/cmd'

(async () => {

  global['logger'] = await Logger(path.basename(__filename))

  const INITIAL_PARAMS = {
    wif: '', // Your wallet import format private key
    network: '', // mainnet or testnet
    satuxiRate: 100000000
  }

  const TX_PARAMS = {
    txId: '',
    txOutputIndex: 0, // Your transaction output index
    totalBalance: 0,
    targetAddress: '',
    sendValue: 0,
    fee: 0
  }

  const bitcoinHelper = new BitcoinHelper(INITIAL_PARAMS)
  const { txHex, txId } = await bitcoinHelper.buildTransaction(TX_PARAMS)

  logger.info(`TX_HEX => ${txHex}`)
  logger.info(`TX_ID => ${txId} \n`)
  pbcopy(txHex)


})().catch((err) => {
  logger.error(err)
  process.exit(1)
})