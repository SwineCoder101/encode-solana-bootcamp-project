import * as anchor from "@coral-xyz/anchor";

export async function updateConfig(
  program: anchor.Program,
  config: anchor.web3.PublicKey,
  owner: anchor.web3.Keypair,
  newOwner: anchor.web3.PublicKey,
  status: any
) {
  await program.rpc.updateConfig(newOwner, status, {
    accounts: {
      config,
      owner: owner.publicKey,
    },
    signers: [owner],
  });
}
