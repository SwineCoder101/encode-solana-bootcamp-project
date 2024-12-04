use anchor_lang::prelude::*;
use crate::state::Config;

#[derive(Accounts)]
pub struct CreateConfig<'info> {
    #[account(init, payer = user, space = 8 + 32 + 8 + 1)]
    pub config: Account<'info, Config>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn run_create_config(ctx: Context<CreateConfig>) -> Result<()> {
    let config = &mut ctx.accounts.config;
    config.owner = *ctx.accounts.user.key;
    config.creation_timestamp = Clock::get()?.unix_timestamp;
    config.status = Status::Active;
    Ok(())
}
