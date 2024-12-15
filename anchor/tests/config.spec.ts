import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { getConfig, Status, updateConfig } from "../sdk/src"; // Adjust the path as needed
import { Tokenescrow } from "../target/types/tokenescrow";
import { setup } from "./common-setup";

describe("config", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Tokenescrow as Program<Tokenescrow>;

  const user = anchor.web3.Keypair.generate();
  let configPubkey: anchor.web3.PublicKey;
  let configData: any, fakeAdmin: Keypair, tokenescrowProgram: Program<Tokenescrow>, sdkConfig: any;

  beforeAll(async () => {
    // Setup the test environment
    const setupResult = await setup();
    configPubkey = setupResult.configPubkey;
    configData = setupResult.configData;
    fakeAdmin = setupResult.fakeAdmin;
    tokenescrowProgram = setupResult.tokenescrowProgram;
    sdkConfig = setupResult.sdkConfig;
  });

  it("Creates a config and gets it", async () => {
    // check setup config is correct
    expect(configData.settlementAmount).toEqual(100000);
    expect(configData.status).toEqual(Status.Pending);
    expect(configData.authority).toEqual(fakeAdmin.publicKey.toBase58());
    expect(configData.escrowId).toEqual(0);
    expect(configData.creationTimestamp).toBeGreaterThan(0);

    const config = await getConfig(program, configData.configPubkey);
    expect(config.authority.toBase58()).toEqual(user.publicKey.toBase58());
    expect(config.status).toEqual("Pending");
  });

  it("Updates a config", async () => {
    const newStatus = Status.Cancelled;
    const newSettlementAmount = 200000;
    const newAuthority = user.publicKey.toBase58();

    const {txid, configAddress} = await updateConfig({
      updateConfigData: {
        newStatus,
        newSettlementAmount,
        newAuthority,
      },
      sdkConfig,
    });

    expect(txid).toBeDefined();
    expect(configAddress).toBeDefined();

    const config = await getConfig(program, configPubkey);
    expect(config.status).toEqual(newStatus);
    expect(config.settlementAmount).toEqual(newSettlementAmount);
  });
});