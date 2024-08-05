use anchor_lang::prelude::*; // Import the anchor language prelude

declare_id!("4mB9gJZEy1NKEv8ZXoRVWtfVC2c2bsgBsmVKyEUxidqa"); // Program ID / Address

#[program]
pub mod counter {
    use super::*; // Imports everything from the parent module

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> { // init is same as constructor
        let counter = &mut ctx.accounts.counter; // Get the counter account and make it mutable
        counter.count = 1; // Start the counter at 1
        msg!("Counter initialized! at: {}", counter.count); // Log the counter value
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> { // Increment function
        let counter = &mut ctx.accounts.counter; // Get the counter account and make it mutable
        counter.count += 1; // Increment the counter
        msg!("Counter incremented! to: {}", counter.count); // Log the counter value
        Ok(())
    }
}

// Account for the Initialize function
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>, // Account that will sign the transaction
    
    #[account(init, payer = user, space = 8 + 8)] // Account that will be created
    pub counter: Account<'info, Counter>, // Account datafield
    pub system_program: Program<'info, System>, // Account must System program
}

// Account for increment function
#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub counter: Account<'info, Counter>, // Account that will be modified
}


// Storage account for current counter value
#[account]
pub struct Counter {
    pub count: u64, // Counter datafield
}

