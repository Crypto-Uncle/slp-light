import { BuildTransaction } from './transaction/BuildTransaction';
import { UtxoSelector } from './utxo/UtxoSelector';
import { Address, SelectedUtxos, Utxo } from './utxo/Utxo';
import BigNumber from 'bignumber.js';
import { BchUtxoRetrieverFacade, SlpUtxoRetrieverFacade } from './facade/UtxoRetrieverFacade';
import { BroadcastFacade } from './facade/BroadcastFacade';


import { simpleSend } from './simple';

import { BITBOX } from 'bitbox-sdk';
const bitbox = new BITBOX()

export const createRawTx = (tokenAmount: BigNumber,
                            tokenId: string,
                            sendToAddress: string,
                            changeAddress: string,
                            selectedUtxos: SelectedUtxos): string => {
    return BuildTransaction.createTransaction(tokenAmount, sendToAddress, changeAddress, tokenId, selectedUtxos);
}

export const retrieveBchUtxos = (address: Address, utxoProvider: BchUtxoRetrieverFacade): Promise<Utxo[]> => {
    return utxoProvider.getBchUtxosFromAddress(address);
}

export const retrieveSlpUtxos = (address: Address, tokenId: string, utxoProvider: SlpUtxoRetrieverFacade): Promise<Utxo[]> => {
    return utxoProvider.getSlpUtxosFromAddress(address, tokenId);
}

export const selectUtxos = (tokenAmount: BigNumber, tokenId: string, currentUtxos: Utxo[]): SelectedUtxos => {
    return UtxoSelector.selectUtxo(currentUtxos, tokenId, tokenAmount)
}

export const broadcastTransaction = (rawHex: string, broadcastFacade: BroadcastFacade): Promise<string> => {
    return broadcastFacade.broadcastTransaction(rawHex);
}

// Start function
export const start = async function() {
  const words = '12 words...'
  const seed = bitbox.Mnemonic.toSeed(words)
  // see: https://github.com/simpleledger/bch-hd-keyring/blob/c517f2dd019af2b9874d5f9ca027596f673f85e8/index.js#L189-L190
  const hdnode = bitbox.HDNode.fromSeed(seed, 'bitcoincash')
  console.log(bitbox.HDNode.toWIF(hdnode))
  const txId = await simpleSend(bitbox.HDNode.toWIF(hdnode),
            "simpleledger:...",
            "c198b22489060bdd5e3cea290858901c4b86282a6a023d4d2e36b31ff8688bf5",
            new BigNumber(1));
  console.log(txId);
}

// Call start
start();

