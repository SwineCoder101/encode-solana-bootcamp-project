import * as anchor from "@coral-xyz/anchor";

export async function createConfig(
  program: anchor.Program,
  user: anchor.web3.Keypair
) {
  await program.rpc.createConfig({
    accounts: {
      config: configAccount.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    },
    signers: [user],
  });
}
