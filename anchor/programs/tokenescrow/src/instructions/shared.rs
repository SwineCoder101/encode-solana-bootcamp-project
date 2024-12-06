use anchor_lang::prelude::*;
use anchor_spl::token_interface::TokenAccount;

pub fn transfer_tokens<'info>(
    from: &InterfaceAccount<'info, TokenAccounts>,
    to: &InterfaceAccount<'info, TokenAccounts>,
    amount: &u64,
    mint:&InterfaceAccount<'info,Mint>,
    authority:&Signer<'info>,
    token_program: &Interface<'info,TokenInterface>
) ->Result<()>{
    let transfer_accounts_options =TransferChecked{
        from: from.to_account_info(),
        mint: mint.to_account_info(),
        to: to.to_account_info(),
        authority: authority.to_account_info(),
    }
}
