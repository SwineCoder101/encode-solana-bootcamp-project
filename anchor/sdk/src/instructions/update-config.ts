import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { convertConfigDataToProgramData, convertUpdateConfigDataToProgramData, findConfigAddress, UpdateConfigData } from "../accounts/config-account";
import { SdkConfig } from "../types";

export async function updateConfigInstruction({
  updateConfigData,
  sdkConfig,
}: {
  updateConfigData: UpdateConfigData;
  sdkConfig: SdkConfig;
}) {
  // Convert UpdateConfigData to ConfigProgramData structure
  let configUpdateProgramData = convertUpdateConfigDataToProgramData(updateConfigData);
  let [config, _] = findConfigAddress(sdkConfig.program.programId.toString());

  if (sdkConfig.debug) console.log("config", config.toString());
  if (sdkConfig.debug) console.log("updateConfigData", updateConfigData);
  if (sdkConfig.debug) console.log("configProgramData", configUpdateProgramData);

  // Create instruction
  const ix = await sdkConfig.program.methods
    .updateConfig(configUpdateProgramData.newStatus, configUpdateProgramData.newSettlementAmount, configUpdateProgramData.newAuthority)
    .accounts({
      config,
      authority: sdkConfig.signer.publicKey,
    })
    .instruction();

  // Create a TransactionMessage
  const message = new TransactionMessage({
    payerKey: sdkConfig.signer.publicKey,
    recentBlockhash: (await sdkConfig.connection.getLatestBlockhash()).blockhash,
    instructions: [ix],
  }).compileToV0Message();

  // Create a VersionedTransaction
  const tx = new VersionedTransaction(message);

  // Sign the transaction
  tx.sign([sdkConfig.signer]);

  // Send and confirm the transaction
  const txid = await sdkConfig.connection.sendTransaction(tx);

  return {
    txid,
    configAddress: config,
  };
}