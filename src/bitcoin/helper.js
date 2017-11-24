import bitcoin from 'bitcoinjs-lib'
import { accMul, accSub } from '../lib/cal'

export default class BitcoinHelper {

  /**
   * initial method
   * @param network [mainnet or testnet]
   * @param wif wallet import format
   * @param satuxiRate
   */
  constructor({ network, wif, satuxiRate }) {
    this._network = network === 'mainnet' ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
    this._wif = wif
    this._satuxiRate = satuxiRate
  }

  /**
   * 生成比特币地址
   * @returns { {wif, address} }
   */
  generateAddress() {
    const pair = bitcoin.ECPair.makeRandom({ network: this._network })
    return {
      wif: pair.toWIF(),
      address: pair.getAddress()
    }
  }

  /**
   * 根据 Wallet Import Format 生成比特币地址
   * @param wif
   */
  getAddressByWIF() {
    const keyPair = bitcoin.ECPair.fromWIF(this._wif, this._network)
    return keyPair.getAddress()
  }

  toSatuxi(amount) {
    return accMul(amount, this._satuxiRate)
  }

  async buildTransaction({ txId, txOutputIndex, totalBalance, targetAddress, sendValue, fee }) {
    const keyPair = bitcoin.ECPair.fromWIF(this._wif, this._network) ,
        chargeAddress = this.getAddressByWIF(this._wif),
        tx = new bitcoin.TransactionBuilder(this._network),
        charge = accSub(accSub(totalBalance, sendValue), fee),
        satuxiCharge = this.toSatuxi(charge),
        satuxiSendValue = this.toSatuxi(sendValue)

    logger.info(`TRADE_INFO => total_balance: ${totalBalance}, 
                 target_address: ${targetAddress}, charge: ${charge}, 
                 send_value: ${sendValue}, fee: ${fee}`
    )

    tx.setVersion(2)
    tx.addInput(txId, txOutputIndex)
    tx.addOutput(targetAddress, satuxiSendValue)
    tx.addOutput(chargeAddress, satuxiCharge)
    tx.sign(0, keyPair)

    const txBuild = tx.build()
    return {
      txHex: txBuild.toHex(),
      txId: txBuild.getId()
    }

  }

}
