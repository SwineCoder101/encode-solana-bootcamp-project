// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import TokenescrowIDL from '../target/idl/tokenescrow.json'
import type { Tokenescrow } from '../target/types/tokenescrow'

// Re-export the generated IDL and type
export { Tokenescrow, TokenescrowIDL }

// The programId is imported from the program IDL.
export const TOKENESCROW_PROGRAM_ID = new PublicKey(TokenescrowIDL.address)

// This is a helper function to get the Tokenescrow Anchor program.
export function getTokenescrowProgram(provider: AnchorProvider) {
  return new Program(TokenescrowIDL as Tokenescrow, provider)
}

// This is a helper function to get the program ID for the Tokenescrow program depending on the cluster.
export function getTokenescrowProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Tokenescrow program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return TOKENESCROW_PROGRAM_ID
  }
}
