use anchor_lang::prelude::*;

#[account(seeds = [CONFIG_SEED, escrow_id])]
pub struct Config {
    pub authority: Pubkey,
    pub creation_timestamp: i64,
    pub status: Status,
    pub escrow_account: Pubkey,
    pub escrow_id: u8,
    pub settlement_amount: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum Status {
    Pending,
    Active,
    Cancelled,
    Complete,
}