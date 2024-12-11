import * as anchor from "@coral-xyz/anchor";


export async function getConfig<T extends anchor.Idl>(program: anchor.Program<T>, configPubkey: anchor.web3.PublicKey) {
  return await program.account.config.fetch(configPubkey);
}

// export async function getConfig(program: anchor.Program, configPubkey: anchor.web3.PublicKey) {
//   return await program.account.config.fetch(configPubkey);
// }