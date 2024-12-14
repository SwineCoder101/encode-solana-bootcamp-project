use anchor_lang::prelude::*;
use crate::state::{Config, Status};
use crate::constants::CONFIG_SEED;

#[derive(Accounts)]
pub struct UpdateConfig<'info> {
    #[account(mut, seeds = [CONFIG_SEED, &config.escrow_id.to_le_bytes()], bump, has_one = authority)]
    pub config: Account<'info, Config>,
    pub authority: Signer<'info>,
}

pub fn run_update_config(ctx: Context<UpdateConfig>, new_status: Status, new_settlement_amount: u64, new_authority: Pubkey) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.status = new_status;
    config.settlement_amount = new_settlement_amount;
    config.authority = new_authority;
    Ok(())
}