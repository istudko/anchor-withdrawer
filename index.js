import fetch from "isomorphic-fetch";
import { Coins, LCDClient, MnemonicKey, MsgExecuteContract } from "@terra-money/terra.js";

// ==== Configuration ====
const mnemonic = ""; // input your 24-word mnemonic key here
const amount = ""; // input your aUST amount here (ex. 100500000 for 100.500000 aUST)

// ==== Initialize client ====
const gasPrices = await fetch(
    "https://columbus-api.terra.dev/gas-prices", { redirect: 'follow' }
);
const gasPricesJson = await gasPrices.json();
const gasPricesCoins = new Coins(gasPricesJson);
const lcd = new LCDClient({
    URL: "https://columbus-lcd.terra.dev/",
    chainID: "columbus-5",
    gasPrices: gasPricesCoins,
    gasAdjustment: "1.5",
    gas: 10000000,
    isClassic: true,
});

// ==== Inintialize wallet ====
const mk = new MnemonicKey({
    mnemonic: mnemonic,
});
const wallet = lcd.wallet(mk);

// ==== Withdraw all UST from Anchor protocol ====
const aUSTContract = "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu";
const anchorMarketContract = "terra1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s";
const withdrawMsg = "eyJyZWRlZW1fc3RhYmxlIjp7fX0="; // base64 of {"redeem_stable":{}}
const execute = new MsgExecuteContract(
    wallet.key.accAddress,
    aUSTContract,
    {
        send: {
            contract: anchorMarketContract,
            amount: amount,
            msg: withdrawMsg,
        },
    }
);
const executeTx = await wallet.createAndSignTx({ msgs: [execute] });
const executeTxResult = await lcd.tx.broadcast(executeTx);
console.log(executeTxResult);
console.log("===== Success =====");