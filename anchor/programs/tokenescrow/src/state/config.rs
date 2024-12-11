use anchor_lang::prelude::*;

#[account]
pub struct Config {
    pub owner: Pubkey,
    pub creation_timestamp: i64,
    pub status: Status,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq)]
pub enum Status {
    Pending,
    Active,
    Cancelled,
    Complete,
}