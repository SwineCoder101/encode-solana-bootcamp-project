use anchor_lang::prelude::*;
use crate::state::admin::{Config, Status};
use crate::constants::CONFIG_SEED;

#[derive(Accounts)]
pub struct CreateConfig<'info> {
    #[account(init, seeds = [CONFIG_SEED], bump, payer = authority, space = 8 + Config::INIT_SPACE)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn run_create_config(ctx: Context<CreateConfig>, escrow_id: u8, settlement_amount: u64) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.authority = *ctx.accounts.authority.key;
    config.creation_timestamp = Clock::get()?.unix_timestamp;
    config.status = Status::Pending;
    config.escrow_id = escrow_id;
    config.settlement_amount = settlement_amount;
    Ok(())
}