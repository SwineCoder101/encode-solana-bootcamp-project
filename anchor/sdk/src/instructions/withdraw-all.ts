import { SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { SdkConfig } from "../types";
import { findConfigAddress } from "../accounts/config-account";

export async function withdraw_all({
  sdkConfig,
}: {
  sdkConfig: SdkConfig;
}) {
  let [config, _] = findConfigAddress(sdkConfig.program.programId.toString());

  if (sdkConfig.debug) console.log("config", config.toString());

  const ix = await sdkConfig.program.methods
    .withdraw_all()
    .accounts({
      config,
      authority: sdkConfig.signer.publicKey,
      escrowAccount: sdkConfig.escrowAccount,
      systemProgram: SystemProgram.programId,
    })
    .instruction();

  const message = new TransactionMessage({
    payerKey: sdkConfig.signer.publicKey,
    recentBlockhash: (await sdkConfig.connection.getLatestBlockhash()).blockhash,
    instructions: [ix],
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);

  let confirmedTx;

  if (sdkConfig.program.provider && sdkConfig.program.provider.sendAndConfirm) {
    confirmedTx = await sdkConfig.program.provider.sendAndConfirm(tx, [sdkConfig.signer]);
  } else {
    confirmedTx = await sdkConfig.connection.sendTransaction(tx, [sdkConfig.signer]);
  }

  return {
    tx: confirmedTx,
    configAddress: config,
  };
}