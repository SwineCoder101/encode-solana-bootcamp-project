import * as anchor from "@coral-xyz/anchor";

export async function getConfig(program: anchor.Program, configPubkey: anchor.web3.PublicKey) {
  return await program.account.config.fetch(configPubkey);
}