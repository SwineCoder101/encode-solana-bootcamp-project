#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount};//Added import

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
      ctx: Context<MakeOffer>, 
      id:u64, 
      token_a_offered_amount: u64, 
      token_b_wanted_amount: u64
  ) -> Result<()> {
   require!(token_a_offered_amount > 0, ErrorCode::InvalidAmount);
   require!(token_b_wanted_amount > 0, ErrorCode::InvalidAmount);

        // Transfer tokens to vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.token_a_account.to_account_info(),
                    to: ctx.accounts.vault_token_a.to_account_info(),
                    authority: ctx.accounts.maker.to_account_info(),
                },
                ),
            token_a_offered_amount,token_b_wanted_amount
        )?;

        Ok(())
    }        
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
// Added token program account to relevant structs
#[derive(Accounts)]
pub struct MakeOffer<'info> {
    pub maker: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub token_a_account: Account<'info, TokenAccount>,
    pub token_b_account: Account<'info, TokenAccount>,
    pub vault_token_a: Account<'info, TokenAccount>,
    
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
  // Added authority check
  #[account(constraint = authority.key() == tokenescrow.authority @ ErrorCode::UnauthorizedAccess)]
  pub authority: Signer<'info>,  
}
//Event added. Need to check for order.
#[event]
pub struct OfferCreated {
    pub offer_id: u64,
    pub maker: Pubkey,
    pub token_a_amount: u64,
    pub token_b_amount: u64,
    pub timestamp: i64,
}
#[account]
#[derive(InitSpace)]
pub struct Tokenescrow {
    count: u8,
    // Added these fields
    pub authority: Pubkey,
    pub token_a_mint: Pubkey,
    pub token_b_mint: Pubkey,
    pub vault_token_a: Pubkey,
    pub vault_token_b: Pubkey,
    pub offers_count: u64,
    
}
#[error_code]
pub enum ErrorCode {
    InvalidAmount,
    InvalidOwner,
    ArithmeticError,
}

#[test]
fn test_make_offer() {
    let (mut banks_client, payer, recent_blockhash) = setup().await;
    
    // Create token mint and accounts
    let token_mint = create_mint(&mut banks_client, &payer).await;
    let maker_token_account = create_token_account(
        &mut banks_client,
        &payer,
        &token_mint,
        &payer.pubkey(),
    ).await;
    
    // Initialize escrow
    let (tokenescrow, vault) = initialize_escrow(
        &mut banks_client,
        &payer,
        recent_blockhash,
    ).await;
    
    // Test make_offer
    let amount = 100;
    let result = make_offer(
        &mut banks_client,
        &payer,
        &tokenescrow,
        &maker_token_account,
        &vault,
        amount,
    ).await;
    
    assert!(result.is_ok());
}
