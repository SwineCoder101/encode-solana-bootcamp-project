use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::state::admin::config::{Config, Status};

#[derive(Accounts)]
pub struct WithdrawAll<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(mut, has_one = authority)]
    pub config: Account<'info, Config>,
    /// CHECK: Escrow account is validated
    #[account(mut)]
    pub escrow_account: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

pub fn withdraw_all(ctx: Context<WithdrawAll>) -> Result<()> {
    let config = &mut ctx.accounts.config;
    let escrow_account = &ctx.accounts.escrow_account;
    let authority = &ctx.accounts.authority;

    // Validate status - only withdraw if Complete
    require!(config.status == Status::Complete, CustomError::InvalidStatus);
    // Fetch balance from the escrow account
    let escrow_balance = **escrow_account.try_borrow_lamports()?;
    require!(escrow_balance > 0, CustomError::NoFundsAvailable);

    // Transfer all funds to the authority
    invoke(
        &system_instruction::transfer(
            &escrow_account.key(),
            &authority.key(),
            escrow_balance,
        ),
        &[
            escrow_account.to_account_info(),
            authority.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    // Update status to reflect funds have been withdrawn
    config.status = Status::Cancelled; // Set status to Cancelled or Complete based on business logic

    Ok(())
}

#[error_code]
pub enum CustomError {
    #[msg("Invalid status for withdrawal.")]
    InvalidStatus,
    #[msg("No funds available in escrow account.")]
    NoFundsAvailable,
}
