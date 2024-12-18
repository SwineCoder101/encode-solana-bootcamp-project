import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { withdrawAll } from "../sdk/src";
import { Tokenescrow } from "../target/types/tokenescrow";
import { setup } from "./common-setup";

describe("withdraw-all", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Tokenescrow as Program<Tokenescrow>;

  let configPubkey: anchor.web3.PublicKey;
  let fakeAdmin: Keypair, tokenescrowProgram: Program<Tokenescrow>, sdkConfig: any;

  beforeAll(async () => {
    // Setup the test environment
    const setupResult = await setup();
    configPubkey = setupResult.configPubkey;
    fakeAdmin = setupResult.fakeAdmin;
    tokenescrowProgram = setupResult.tokenescrowProgram;
    sdkConfig = setupResult.sdkConfig;
  });

  it("Withdraws all funds", async () => {
    const result = await withdrawAll({ sdkConfig });
    expect(result.tx).toBeDefined();
  });
});