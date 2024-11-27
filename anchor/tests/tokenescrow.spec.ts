import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Tokenescrow} from '../target/types/tokenescrow'

describe('tokenescrow', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Tokenescrow as Program<Tokenescrow>

  const tokenescrowKeypair = Keypair.generate()

  it('Initialize Tokenescrow', async () => {
    await program.methods
      .initialize()
      .accounts({
        tokenescrow: tokenescrowKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([tokenescrowKeypair])
      .rpc()

    const currentCount = await program.account.tokenescrow.fetch(tokenescrowKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Tokenescrow', async () => {
    await program.methods.increment().accounts({ tokenescrow: tokenescrowKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenescrow.fetch(tokenescrowKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Tokenescrow Again', async () => {
    await program.methods.increment().accounts({ tokenescrow: tokenescrowKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenescrow.fetch(tokenescrowKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Tokenescrow', async () => {
    await program.methods.decrement().accounts({ tokenescrow: tokenescrowKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenescrow.fetch(tokenescrowKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set tokenescrow value', async () => {
    await program.methods.set(42).accounts({ tokenescrow: tokenescrowKeypair.publicKey }).rpc()

    const currentCount = await program.account.tokenescrow.fetch(tokenescrowKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the tokenescrow account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        tokenescrow: tokenescrowKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.tokenescrow.fetchNullable(tokenescrowKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
