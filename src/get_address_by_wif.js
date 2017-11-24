import BitcoinHelper from './bitcoin/helper'
import Logger from './lib/log4js'
import path from 'path'
import { pbcopy } from './lib/cmd'

(async () => {

  global['logger'] = await Logger(path.basename(__filename))

  const INITIAL_PARAMS = {
    network: '', // mainnet or testnet
    wif: ''
  }

  const bitcoinHelper = new BitcoinHelper(INITIAL_PARAMS)
  const address = await bitcoinHelper.getAddressByWIF()

  logger.info(`address: ${address} \n`)
  pbcopy(address)

})().catch((err) => {
  logger.error(err)
  process.exit(1)
})