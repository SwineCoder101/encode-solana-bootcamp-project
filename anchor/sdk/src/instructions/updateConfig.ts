import * as anchor from "@coral-xyz/anchor";

export async function updateConfig<T extends anchor.Idl>(
  program: anchor.Program<T>,
  config: anchor.web3.PublicKey,
  owner: anchor.web3.Keypair,
  newOwner: anchor.web3.PublicKey,
  status: any
) {
  await program.methods.updateConfig(newOwner, status, {
    accounts: {
      config,
      owner: owner.publicKey,
    },
    signers: [owner],
  });
}
