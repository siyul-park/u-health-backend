const driver = require('bigchaindb-driver');


async function createEMG(connection, keypair, emg) {
  const txCreateEMG = driver.Transaction.makeCreateTransaction(
    emg,
    {datetime: new Date().toString()},
    [driver.Transaction.makeOutput(
      driver.Transaction.makeEd25519Condition(keypair.publicKey)
    )],
    keypair.publicKey
  );

  const txSigned = driver.Transaction.signTransaction(
    txCreateEMG, keypair.privateKey
  );

  await connection.postTransactionCommit(txSigned);

  return txSigned;
}

module.exports = createEMG;
