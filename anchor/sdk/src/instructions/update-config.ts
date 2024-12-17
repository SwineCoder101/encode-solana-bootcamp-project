import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { convertUpdateConfigDataToProgramData, findConfigAddress, UpdateConfigData } from "../accounts/config-account";
import { SdkConfig } from "../types";

export async function updateConfig({
  updateConfigData,
  sdkConfig,
}: {
  updateConfigData: UpdateConfigData;
  sdkConfig: SdkConfig;
}) {
  let configUpdateProgramData = convertUpdateConfigDataToProgramData(updateConfigData);
  let [config, _] = findConfigAddress(sdkConfig.program.programId.toString());

  if (sdkConfig.debug) console.log("config", config.toString());
  if (sdkConfig.debug) console.log("updateConfigData", updateConfigData);
  if (sdkConfig.debug) console.log("configProgramData", configUpdateProgramData);

  const ix = await sdkConfig.program.methods
    .updateConfig(configUpdateProgramData.newStatus, configUpdateProgramData.newSettlementAmount, configUpdateProgramData.newAuthority)
    .accounts({
      config,
      authority: sdkConfig.signer.publicKey,
    })
    .instruction();

  const message = new TransactionMessage({
    payerKey: sdkConfig.signer.publicKey,
    recentBlockhash: (await sdkConfig.connection.getLatestBlockhash()).blockhash,
    instructions: [ix],
  }).compileToV0Message();

  const tx = new VersionedTransaction(message);
  tx.sign([sdkConfig.signer]);
  const txid = await sdkConfig.connection.sendTransaction(tx);

  return {
    txid,
    configAddress: config,
  };
}