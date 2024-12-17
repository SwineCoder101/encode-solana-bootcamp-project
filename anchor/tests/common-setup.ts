import * as anchor from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { createConfig } from "../sdk/src";
import { ConfigData, convertConfigProgramDataToData, findConfigAddress } from "../sdk/src/accounts/config-account";
import { Tokenescrow } from "../target/types/tokenescrow";
import * as Util from "./test-utils";
import { waitAndConfirmSignature } from "./test-utils";
import { SdkConfig } from "../sdk/src/types";
import { assert } from "console";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
// @ts-ignore
const adminPayer = provider.wallet.payer;
const adminKp = Keypair.fromSecretKey(adminPayer.secretKey);

let fakeAdmin: Keypair;

export const setup = async function (): Promise<{
  configPubkey: PublicKey;
  configData: ConfigData;
  fakeAdmin: Keypair;
  tokenescrowProgram: anchor.Program<Tokenescrow>;
  sdkConfig: SdkConfig;
}> {
  Util.log("admin:", adminPayer.publicKey.toString());

  const tokenescrowProgram = anchor.workspace.Tokenescrow as anchor.Program<Tokenescrow>;

  let configData: ConfigData;
  let configPubkey: PublicKey;
  let configAccount: any;

  const sdkConfig: SdkConfig = {
    program: tokenescrowProgram,
    signer: adminKp,
    idl: tokenescrowProgram.idl,
    url: provider.connection.rpcEndpoint,
    connection: provider.connection,
    debug: Util.loggingOn,
}

  try {
    configPubkey = new PublicKey(findConfigAddress(tokenescrowProgram.programId.toString()));
    configAccount = await tokenescrowProgram.account.config.fetch(configPubkey);
    configData = convertConfigProgramDataToData(configAccount);
  } catch {
    console.log("Config not found, creating new config");

    const confirmedTx = await createConfig({
      createConfigData: {
        escrowId: 0,
        settlementAmount: 100000,
      },
      sdkConfig,
    });

    assert(confirmedTx);

    configPubkey = new PublicKey(findConfigAddress(tokenescrowProgram.programId.toString()));
    configAccount = await tokenescrowProgram.account.config.fetch(configPubkey);
    configData = convertConfigProgramDataToData(configAccount);
    Util.log("config created:", configData);
  }

  await Util.logSolBalance("Admin balance", adminPayer.publicKey);

  if (!fakeAdmin) {
    fakeAdmin = Keypair.generate();

    let airTx = await provider.connection.requestAirdrop(fakeAdmin.publicKey, LAMPORTS_PER_SOL);
    await waitAndConfirmSignature(provider.connection, airTx);
    Util.log("fakeAdmin created:", fakeAdmin.publicKey.toString());
  }

  return {
    configPubkey,
    configData,
    fakeAdmin,
    tokenescrowProgram,
    sdkConfig,
  };
};