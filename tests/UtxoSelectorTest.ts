import test from 'ava';
import { selectUtxos } from '../build/main';
import BigNumber from 'bignumber.js';
import { SelectedUtxos, Utxo } from '../src/utxo/Utxo';

test("Should succeed with 2 utxo", t => {
    const tokenId = "A TOKEN";
    const currentUtxo: Utxo[] = [
        {
            address: {cashAddress: '124'}, amount: 5000, index: 0, scriptPubKey: '', slpToken: undefined, txId: ''
        },
        {
            address: {cashAddress: '444'}, amount: 546, index: 0, scriptPubKey: '', slpToken: {
                amount: new BigNumber("500"),
                decimals: 0,
                slpTokenId: tokenId,
                slpTokenName: '',
                tokenTicker: '',
                tokenType: '',
                transactionType: ''
            }, txId: ''
        }
    ];

    const selectedUtxos: SelectedUtxos = selectUtxos(new BigNumber("100"), tokenId, currentUtxo);
    t.is(selectedUtxos.utxos.length, 2);
});

test("Should give to miner utxo", t => {
    const tokenId = "A TOKEN";
    const currentUtxo: Utxo[] = [
        {
            address: {cashAddress: '124'}, amount: 1200, index: 0, scriptPubKey: '', slpToken: undefined, txId: ''
        },
        {
            address: {cashAddress: '444'}, amount: 546, index: 0, scriptPubKey: '', slpToken: {
                amount: new BigNumber("500"),
                decimals: 0,
                slpTokenId: tokenId,
                slpTokenName: '',
                tokenTicker: '',
                tokenType: '',
                transactionType: ''
            }, txId: ''
        }
    ];

    const selectedUtxos: SelectedUtxos = selectUtxos(new BigNumber("100"), tokenId, currentUtxo);
    t.true(selectedUtxos.change <= 546, `change ${selectedUtxos.change}`);
});