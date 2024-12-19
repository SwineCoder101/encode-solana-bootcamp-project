import { NextApiRequest, NextApiResponse } from 'next';
import { PublicKey } from '@solana/web3.js';
import dotenv from 'dotenv';
import { getConnection, getKeypair, transferTokens } from '@/app/util/spl-utils';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { recipient, amount, mintAddress } = req.body;

  if (!recipient || !amount || !mintAddress) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Load the private key from environment variables
    const payer = getKeypair();
    const connection = getConnection();

    // Convert recipient and mintAddress to PublicKey
    const recipientPublicKey = new PublicKey(recipient);
    const mintPublicKey = new PublicKey(mintAddress);

    // Transfer tokens
    const signature = await transferTokens(
      connection,
      payer,
      payer,
      recipientPublicKey,
      mintPublicKey,
      amount
    );

    return res.status(200).json({ success: true, signature });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}