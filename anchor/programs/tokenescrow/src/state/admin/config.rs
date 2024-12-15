use anchor_lang::prelude::*;

#[account(seeds = [CONFIG_SEED, escrow_id])]
#[derive(InitSpace, Debug)]
pub struct Config {
    pub authority: Pubkey,
    pub creation_timestamp: i64,
    pub status: Status,
    pub escrow_id: u8,
    pub settlement_amount: u64,
}

impl anchor_lang::Owner for Config {
    fn owner() -> Pubkey {
        crate::ID
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq,InitSpace)]
pub enum Status {
    Pending = 0,
    Active = 1,
    Cancelled = 2,
    Complete = 3,
}