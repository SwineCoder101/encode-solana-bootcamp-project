#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod tokenescrow {
    use super::*;

  pub fn close(_ctx: Context<CloseTokenescrow>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tokenescrow.count = ctx.accounts.tokenescrow.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.tokenescrow.count = ctx.accounts.tokenescrow.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn make_offer(
      context: Context<MakeOffer>, 
      id:u64, token_a_offered_amount: u64, 
      token_b_wanted_amount: u64
  ) -> Result<()> {
    instructions::make_offer::send_offered_tokens_to_vault(&context, token_a_offered_amount)?;
    instructions::make_offer::save_offer(context,id, token_b_wanted_amount)
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
