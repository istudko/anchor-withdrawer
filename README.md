# anchor-withdrawer
A simple tool for withdraw UST from Anchor protocol

## How to use
1. Install package
``` bash
npm install
```
2. Edit index.js file filling mnemonic and withdraw amount at the Configuration part of the file
``` js
// ==== Configuration ====
const mnemonic = ""; // input your 24-word mnemonic key here
const amount = ""; // input your aUST amount here (ex. 100500000 for 100.500000 aUST)
```
3. Run the program
``` bash
node index.js
```
4. Delete mnomonic from the code for your safety