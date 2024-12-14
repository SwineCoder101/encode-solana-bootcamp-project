import { SystemProgram, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { ConfigData, convertConfigDataToProgramData, findConfigAddress } from "../accounts/config-account";
import { SdkConfig } from "../types";

export async function createConfig({
  configData,
  sdkConfig,
}: {
  configData: ConfigData;
  sdkConfig: SdkConfig;
}) {
  // Convert ConfigData to ConfigProgramData structure
  let configProgramData = convertConfigDataToProgramData(configData);
  let [config, _] = findConfigAddress(sdkConfig.program.programId.toString());

  if (sdkConfig.debug) console.log("config", config.toString());
  if (sdkConfig.debug) console.log("configData", configData);
  if (sdkConfig.debug) console.log("configProgramData", configProgramData);

  // Create instruction
  const ix = await sdkConfig.program.methods
    .createConfig(configProgramData.escrowId, configProgramData.settlementAmount)
    .accountsStrict({
      config,
      authority: sdkConfig.signer.publicKey,
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
    }

  return {
    tx: confirmedTx,
    configAddress: config,
  };
}