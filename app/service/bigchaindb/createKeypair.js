const driver = require('bigchaindb-driver');
const bip39 = require('bip39');

const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32);

function createKeypair() {
  return new driver.Ed25519Keypair(seed);
}

module.exports = createKeypair;
