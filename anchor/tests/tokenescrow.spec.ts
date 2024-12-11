import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Tokenescrow } from "../target/types/tokenescrow";
import { createConfig, getConfig, updateConfig } from "../sdk/src"; // Adjust the path as needed

describe("token-escrow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Tokenescrow as Program<Tokenescrow>;

  const user = anchor.web3.Keypair.generate();
  let configPubkey: anchor.web3.PublicKey;

  it("Creates a config", async () => {
    await createConfig(program, user);
    configPubkey = anchor.web3.Keypair.generate().publicKey; // Mock for illustration
    const config = await getConfig(program, configPubkey);
    expect(config.owner.toBase58()).toEqual(user.publicKey.toBase58());
    expect(config.status).toEqual("Active");
  });

  it("Updates a config", async () => {
    const newOwner = anchor.web3.Keypair.generate().publicKey;
    await updateConfig(program, configPubkey, user, newOwner, "Cancelled");
    const config = await getConfig(program, configPubkey);
    expect(config.owner.toBase58()).toEqual(newOwner.toBase58());
    expect(config.status).toEqual("Cancelled");
  });
});