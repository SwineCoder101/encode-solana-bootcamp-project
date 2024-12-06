use anchor_lang::prelude::*;
use anchor_spl::token_interface::TokenAccount;

pub fn transfer_tokens<'info>(
    from: &InterfaceAccount<'info, TokenAccounts>,
    to: &InterfaceAccount<'info, TokenAccounts>,
    amount: &u64,
    mint:&InterfaceAccount<'info,Mint>,
    authority:&Signer<'info>,
    token_program: &Interface<'info,TokenInterface>
) ->Result<()>{}
