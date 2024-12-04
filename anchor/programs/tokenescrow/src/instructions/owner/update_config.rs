use anchor_lang::prelude::*;
use crate::state::{Config, Status};

#[derive(Accounts)]
pub struct UpdateConfig<'info> {
    #[account(mut, has_one = owner)]
    pub config: Account<'info, Config>,
    pub owner: Signer<'info>,
}

pub fn run_update_config(ctx: Context<UpdateConfig>, new_owner: Pubkey, status: Status) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.owner = new_owner;
    config.status = status;
    Ok(())
}
