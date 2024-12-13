use anchor_lang::prelude::*;
use crate::state::config::{Config, Status};

#[derive(Accounts)]
pub struct CreateConfig<'info> {
    #[account(init, seeds = [CONFIG_SEED, &escrow_id.to_le_bytes()], bump, payer = authority, space = 8 + 32 + 8 + 1 + 32 + 1 + 8)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn create_config(ctx: Context<CreateConfig>, escrow_id: u8, escrow_account: Pubkey, settlement_amount: u64) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.authority = *ctx.accounts.authority.key;
    config.creation_timestamp = Clock::get()?.unix_timestamp;
    config.status = Status::Pending;
    config.escrow_account = escrow_account;
    config.escrow_id = escrow_id;
    config.settlement_amount = settlement_amount;
    Ok(())
}