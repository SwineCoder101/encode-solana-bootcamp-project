import * as anchor from "@coral-xyz/anchor";
import { Tokenescrow } from "@project/anchor";

export async function createConfig(
  program: anchor.Program<Tokenescrow>,
  user: anchor.web3.Keypair
) {
  const configAccount = anchor.web3.Keypair.generate();

  await program.methods.createConfig()
    .accounts({
      config: configAccount.publicKey,
      user: user.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([user])
    .rpc();
}