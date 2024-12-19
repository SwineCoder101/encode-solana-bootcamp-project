import { Account, createTransferInstruction, getAccount, getOrCreateAssociatedTokenAccount, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SendTransactionOptions } from '@solana/wallet-adapter-base';
import { Connection, Keypair, PublicKey, Transaction, TransactionMessage, TransactionSignature, VersionedTransaction } from '@solana/web3.js';
import dotenv from 'dotenv';
const { LAMPORTS_PER_SOL } = require('@solana/web3.js').LAMPORTS_PER_SOL;



/**
 * Load the keypair from the environment variable.
 * @returns {Keypair} The Solana keypair.
 */
export const getKeypair = (): Keypair => {
    dotenv.config();
    const secretKeyString = process.env.KEYPAIR_SECRET;

    if (!secretKeyString) {
        throw new Error('Operator keypair not found');
    }
    
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));

    const keypair = Keypair.fromSecretKey(secretKey);

    console.log('using keypair.publicKey:', keypair.publicKey.toBase58());
    return Keypair.fromSecretKey(secretKey);
};

/**
 * Create a connection to the Solana cluster.
 * @returns {Connection} The Solana connection.
 */
export const getConnection = (): Connection => {
    return new Connection('https://api.devnet.solana.com');
};


export const fetchTokenBalance = (mintAddress: PublicKey, publicKey: PublicKey, connection: Connection) => {
    
}

const DEVNET_TOKEN_PROGRAM = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');


/**
 * Fetch the balance of a specific token for a given public key.
 * @param {Connection} connection - The Solana connection.
 * @param {PublicKey} publicKey - The public key of the account.
 * @param {PublicKey} mintAddress - The mint address of the token.
 * @returns {Promise<number>} The balance of the token.
 */
export const getTokenAccountInfo = async (connection: Connection, publicKey: PublicKey, mintAddress: PublicKey): Promise<Account> => {
    try {


        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
            mint: mintAddress,
            programId: TOKEN_PROGRAM_ID,
        });

        console.log('tokenAccounts:', tokenAccounts);

        console.log('tokenAccounts.value[0].pubkey:', tokenAccounts.value[0].pubkey.toBase58());

        const accountInfo = await getAccount(connection, tokenAccounts.value[0].pubkey, 'confirmed', TOKEN_PROGRAM_ID);
        if (!accountInfo.owner.equals(publicKey)) {
            console.error(`Token account owner mismatch: expected ${publicKey.toBase58()}, got ${accountInfo.owner.toBase58()}`);
            throw new Error('TokenInvalidAccountOwnerError');
        }

        return accountInfo;
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error; // Propagate the error up the call stack
    }
};

/**
 * Fetch the balance of a specific token for a given public key.
 * @param {Connection} connection - The Solana connection.
 * @param {PublicKey} publicKey - The public key of the account.
 * @param {PublicKey} mintAddress - The mint address of the token.
 * @returns {Promise<number>} The balance of the token.
 */
export const getTokenBalance = async (connection: Connection, publicKey: PublicKey, mintAddress: PublicKey): Promise<number> => {
    try {
        const accountInfo = await getTokenAccountInfo(connection, publicKey, mintAddress);
        if (!accountInfo.owner.equals(publicKey)) {
            console.error(`Token account owner mismatch: expected ${publicKey.toBase58()}, got ${accountInfo.owner.toBase58()}`);
            throw new Error('TokenInvalidAccountOwnerError');
        }

        return Number(accountInfo.amount) / Number(LAMPORTS_PER_SOL_APP);
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error; // Propagate the error up the call stack
    }
};


export const getFormmattedSolBalance = async (connection: Connection, publicKey: PublicKey): Promise<string> => {
    try {
        const balance = await connection.getBalance(publicKey);
        return (balance / 1_000_000_000).toFixed(2);
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error; // Propagate the error up the call stack
    }
}


export const getTokenUIBalance = async (connection: Connection, publicKey: PublicKey, mintAddress: PublicKey): Promise<string> => {
    try {

        const tkAcccount = await getTokenAccountInfo(connection, publicKey, mintAddress);
        const tokenMintInfo = await getMint(connection, mintAddress);
        const balance = convertTokenBalance(tkAcccount.amount,tokenMintInfo.decimals);

        return balance || "0.00";
    } catch (error) {
        console.error('Error fetching token balance:', error);
        return "0.00";
    }
};


/**
 * Convert token balance from smallest unit to user-friendly unit
 * @param {bigint} amount - The balance in the smallest unit.
 * @param {number} decimals - The number of decimals defined by the token mint.
 * @returns {string} The balance in a user-friendly format.
 */
export const convertTokenBalance = (amount: bigint, decimals: number): string => {
    const divisor = BigInt(10 ** decimals);
    const balance = Number(amount) / Number(divisor);
    return balance.toFixed(2);
};

export const LAMPORTS_PER_SOL_APP: number = Number(LAMPORTS_PER_SOL || 100_000);

/**
 * Transfer tokens from one account to multiple accounts using VersionedTransaction
 * @param {Connection} connection - The Solana connection.
 * @param {Keypair} payerKey - The keypair of the payer for transaction fees.
 * @param {Keypair} fromKeypair - The keypair of the sender.
 * @param {Array<{toPublicKey: PublicKey, mintAddress: PublicKey, amount: number}>} transfers - The array of recipient public keys, mint addresses, and amounts to transfer.
 * @returns {Promise<string>} The transaction signature.
 */
export const transferMultipleTokens = async (
    connection: Connection,
    payerKey: Keypair,
    fromKeypair: Keypair,
    transfers: Array<{ toPublicKey: PublicKey, mintAddress: PublicKey, amount: number }>
): Promise<string> => {
    try {
        const transferInstructions = [];

        // Loop through all transfers and create instructions
        for (const transfer of transfers) {
            const { toPublicKey, mintAddress, amount } = transfer;

            console.log('fromKeypair.publicKey:', fromKeypair.publicKey.toBase58());
            console.log('toPublicKey:', toPublicKey.toBase58());
            console.log('mintAddress:', mintAddress.toBase58());
            console.log('payerKey.publicKey:', payerKey.publicKey.toBase58());
            console.log('amount:', amount, 'type of:', typeof amount);

            const tokenMintInfo = await getMint(connection, mintAddress);

            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payerKey,
                mintAddress,
                fromKeypair.publicKey,
                false,
                'confirmed',
                undefined,
                TOKEN_2022_PROGRAM_ID,
            );

            const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                payerKey,
                mintAddress,
                toPublicKey,
                false,
                'confirmed',
                undefined,
                TOKEN_2022_PROGRAM_ID,
            );

            const amountInSmallestUnit = amount * Math.pow(10, tokenMintInfo.decimals);

            console.log('amountInSmallestUnit: ', amountInSmallestUnit);

            // Check if the source account has enough tokens
            const fromTokenAccountInfo = await connection.getTokenAccountBalance(fromTokenAccount.address);
            console.log('fromTokenAccount balance:', fromTokenAccountInfo.value.amount);

            if (Number(fromTokenAccountInfo.value.amount) < amountInSmallestUnit) {
                throw new Error(`Insufficient funds in source account for mint ${mintAddress.toBase58()}`);
            }

            const transferInstruction = createTransferInstruction(
                fromTokenAccount.address,
                toTokenAccount.address,
                fromKeypair.publicKey,
                amountInSmallestUnit,
                [],
                TOKEN_2022_PROGRAM_ID
            );

            transferInstructions.push(transferInstruction);
        }

        const latestBlockhash = await connection.getLatestBlockhash('confirmed');
        const message = new TransactionMessage({
            payerKey: payerKey.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: transferInstructions,
        }).compileToV0Message();

        const transaction = new VersionedTransaction(message);
        transaction.sign([payerKey, fromKeypair]);

        const signature = await connection.sendTransaction(transaction, {
            skipPreflight: false,
            preflightCommitment: 'confirmed'
        });

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
        }, 'confirmed');

        if (confirmation.value.err) {
            throw new Error('Transaction failed: ' + confirmation.value.err);
        }

        return signature;
    } catch (error) {
        console.error('Error transferring tokens:', error);
        throw error; // Propagate the error up the call stack
    }
};


/**
 * Transfer tokens from one account to another using VersionedTransaction
 * @param {Connection} connection - The Solana connection.
 * @param {Keypair} payerKey - The keypair of the payer for transaction fees.
 * @param {Keypair} fromKeypair - The keypair of the sender.
 * @param {PublicKey} toPublicKey - The public key of the recipient.
 * @param {PublicKey} mintAddress - The mint address of the token.
 * @param {number} amount - The amount of tokens to transfer.
 * @returns {Promise<string>} The transaction signature.
 */
// const sendTransaction: (transaction: Transaction | VersionedTransaction, connection: Connection, options?: SendTransactionOptions) => Promise<TransactionSignature>
export const transferTokens = async (
    connection: Connection,
    fromKeypair: PublicKey,
    toPublicKey: PublicKey,
    mintAddress: PublicKey,
    amount: number,
    sendTransaction: (transaction: Transaction | VersionedTransaction, connection: Connection, options?: SendTransactionOptions) => Promise<TransactionSignature>,
    signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined    ,
): Promise<string> => {
    try {
        const payerKey = getKeypair();
        console.log('fromKeypair.publicKey:', fromKeypair.toBase58());
        console.log('toPublicKey:', toPublicKey.toBase58());
        console.log('mintAddress:', mintAddress.toBase58());
        console.log('payerKey.publicKey:', payerKey.publicKey.toBase58());
        console.log('amount:', amount, 'type of:', typeof amount);

        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payerKey,
            mintAddress,
            fromKeypair,
            false,
            'confirmed',
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            payerKey,
            mintAddress,
            toPublicKey,
            false,
            'confirmed',
            undefined,
            TOKEN_2022_PROGRAM_ID,
        );

        const tokenMintInfo = await getMint(connection, mintAddress);
        const amountInSmallestUnit = amount * Math.pow(10, tokenMintInfo.decimals);

        console.dir(tokenMintInfo);
        console.log('amountInSmallestUnit: ', amountInSmallestUnit);

        const transferInstruction = createTransferInstruction(
            fromTokenAccount.address,
            toTokenAccount.address,
            fromKeypair,
            amountInSmallestUnit,
            [],
            TOKEN_2022_PROGRAM_ID
        );

        const latestBlockhash = await connection.getLatestBlockhash('confirmed');
        const message = new TransactionMessage({
            payerKey: payerKey.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: [transferInstruction],
        }).compileToV0Message();

        const transaction = new VersionedTransaction(message);
        transaction.sign([payerKey, fromKeypair]);

        // const signature = await connection.sendTransaction(transaction, {
        //     skipPreflight: false,
        //     preflightCommitment: 'confirmed'
        // });

        const signature = await sendTransaction(transaction, connection);

        // Wait for confirmation
        const confirmation = await connection.confirmTransaction({
            signature,
            blockhash: latestBlockhash.blockhash,
            lastValidBlockHeight: latestBlockhash.lastValidBlockHeight
        }, 'confirmed');

        if (confirmation.value.err) {
            throw new Error('Transaction failed: ' + confirmation.value.err);
        }

        return signature;
    } catch (error) {
        console.error('Error transferring tokens:', error);
        throw error; // Propagate the error up the call stack
    }

};


/**
 * Get mint information for a given token address
 * @param {Connection} connection - The Solana connection.
 * @param {PublicKey} mintAddress - The mint address of the token.
 * @returns {Promise<MintInfo>} The mint information.
 */
export const getMint = async (
    connection: Connection,
    mintAddress: PublicKey
): Promise<any> => {
    try {
        const mintInfo = await connection.getParsedAccountInfo(mintAddress, 'confirmed');
        if (!mintInfo.value || !('parsed' in mintInfo.value.data)) {
            throw new Error('Unable to fetch mint information');
        }
        const parsedInfo = mintInfo.value.data;
        return parsedInfo.parsed.info;
    } catch (error) {
        console.error('Error fetching mint information:', error);
        throw error; // Propagate the error up the call stack
    }
};