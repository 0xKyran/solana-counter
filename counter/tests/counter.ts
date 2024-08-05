import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";

const { expect } = require("chai");


describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  // const counterAccount = new Keypair();


  const program = anchor.workspace.Counter as Program<Counter>;

  const [counterPDA] = PublicKey.findProgramAddressSync([Buffer.from("counter")], program.programId);

  

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().accounts({
      counter: counterPDA,
    }).rpc();

    // Get accountdata

    const accountData = await program.account.counter.fetch(
      counterPDA,
    );

    // Counter should be 1 chain and mocha

    expect(accountData.count.toNumber()).to.equal(1);
  });
  it("Should increment", async () => {

  const tx = await program.methods.increment().accounts({
    counter: counterPDA,
  }).rpc();

  const accountData = await program.account.counter.fetch(
    counterPDA,
  );

  expect(accountData.count.toNumber()).to.equal(2);
  
  });
});
