import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { Keypair } from "@solana/web3.js";

const { expect } = require("chai");


describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const counterAccount = new Keypair();


  const program = anchor.workspace.Counter as Program<Counter>;

  

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      counter: counterAccount.publicKey,
    }).signers([counterAccount]).rpc();

    // Get accountdata

    const accountData = await program.account.counter.fetch(
      counterAccount.publicKey,
    );

    // Counter should be 1 chain and mocha

    expect(accountData.count.toNumber()).to.equal(1);
  });
  it("Should increment", async () => {

  const tx = await program.methods.increment().accounts({
    counter: counterAccount.publicKey,
  }).rpc();

  const accountData = await program.account.counter.fetch(
    counterAccount.publicKey,
  );

  expect(accountData.count.toNumber()).to.equal(2);
  
  });
});
