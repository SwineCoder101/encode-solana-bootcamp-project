#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

pub mod instructions;
use instructions::owner::*;
pub mod state;
use crate::state::config::Status;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod tokenescrow {
    use state::config::Status;

    use super::*;

  pub fn close(_ctx: Context<CloseTokenescrow>) -> Result<()> {
    Ok(())
  }

  pub fn create_config(ctx: Context<CreateConfig>) -> Result<()> {
    run_create_config(ctx)
  }

  pub fn update_config(ctx: Context<UpdateConfig>, owner: Pubkey, status: Status) -> Result<()> {
      run_update_config(ctx, owner, status)
  }

  pub fn initialize(_ctx: Context<InitializeTokenescrow>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.tokenescrow.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeTokenescrow<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Tokenescrow::INIT_SPACE,
  payer = payer
  )]
  pub tokenescrow: Account<'info, Tokenescrow>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseTokenescrow<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub tokenescrow: Account<'info, Tokenescrow>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub tokenescrow: Account<'info, Tokenescrow>,
}

#[account]
#[derive(InitSpace)]
pub struct Tokenescrow {
  count: u8,
}
