
import BitcoinHelper from './bitcoin/helper'
import Logger from './lib/log4js'
import path from 'path'
import { pbcopy } from './lib/cmd'

(async () => {

  global['logger'] = await Logger(path.basename(__filename))

  const INITIAL_PARAMS = {
    network: '', // mainnet or testnet
  }

  const bitcoinHelper = new BitcoinHelper(INITIAL_PARAMS)
  const { wif, address } = await bitcoinHelper.generateAddress()

  logger.info(`wif: ${wif}, address: ${address} \n`)
  pbcopy(`wif: ${wif}, address: ${address}`)

})().catch((err) => {
  logger.error(err)
  process.exit(1)
})