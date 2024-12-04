import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TokenEscrow } from "../target/types/token_escrow";
import { createConfig, updateConfig, getConfig } from "../sdk";

describe("token-escrow", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.TokenEscrow as Program<TokenEscrow>;

  const user = anchor.web3.Keypair.generate();
  let configPubkey;

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