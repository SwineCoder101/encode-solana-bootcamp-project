//TODO Created by Aaron Ong/Gitter-block

use anchor_lang::prelude::*;

#[program]
pub mod deposit_dapp {
    use super::*;

    // Initialize a new deposit account
    pub fn initialize_deposit_account(ctx: Context<InitializeDepositAccount>, authority: Pubkey) -> Result<()> {
        let deposit_account = &mut ctx.accounts.deposit_account;
        deposit_account.authority = authority;
        deposit_account.balance = 0;
        Ok(())
    }

    // Deposit funds into the account
    pub fn deposit(ctx: Context<DepositContext>, amount: u64) -> Result<()> {
        let deposit_account = &mut ctx.accounts.deposit_account;
        let transfer_account = &ctx.accounts.transfer_account;

        // Validate that the depositor is the account authority
        require!(
            transfer_account.key() == deposit_account.authority, 
            DepositError::UnauthorizedDepositor
        );

        // Check for minimum deposit amount
        require!(amount > 0, DepositError::InvalidDepositAmount);

        // Transfer tokens and update balance
        deposit_account.balance += amount;
        
        Ok(())
    }

    // Withdraw funds from the account
    pub fn withdraw(ctx: Context<WithdrawContext>, amount: u64) -> Result<()> {
        let deposit_account = &mut ctx.accounts.deposit_account;

        // Validate that the withdrawer is the account authority
        require!(
            ctx.accounts.user.key() == deposit_account.authority, 
            DepositError::UnauthorizedWithdrawer
        );

        // Check sufficient balance
        require!(
            deposit_account.balance >= amount, 
            DepositError::InsufficientBalance
        );

        // Update balance and transfer tokens
        deposit_account.balance -= amount;

        Ok(())
    }

    // Check account balance
    pub fn get_balance(ctx: Context<GetBalanceContext>) -> Result<u64> {
        let deposit_account = &ctx.accounts.deposit_account;
        Ok(deposit_account.balance)
    }
}

// Define custom error types
#[error_code]
pub enum DepositError {
    #[msg("Unauthorized depositor")]
    UnauthorizedDepositor,
    #[msg("Unauthorized withdrawer")]
    UnauthorizedWithdrawer,
    #[msg("Invalid deposit amount")]
    InvalidDepositAmount,
    #[msg("Insufficient balance")]
    InsufficientBalance,
}

// Account structures
#[derive(Accounts)]
pub struct InitializeDepositAccount<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        init, 
        payer = authority, 
        space = 8 + 32 + 8  // Discriminator + Authority + Balance
    )]
    pub deposit_account: Account<'info, DepositData>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositContext<'info> {
    #[account(mut)]
    pub deposit_account: Account<'info, DepositData>,
    #[account(mut)]
    pub transfer_account: Signer<'info>,
}

#[derive(Accounts)]
pub struct WithdrawContext<'info> {
    #[account(mut)]
    pub deposit_account: Account<'info, DepositData>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[derive(Accounts)]
pub struct GetBalanceContext<'info> {
    pub deposit_account: Account<'info, DepositData>,
}

// Account data structure
#[account]
pub struct DepositData {
    pub authority: Pubkey,
    pub balance: u64,
}
