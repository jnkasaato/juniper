const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Juniper", () => {
  let juniper;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const Juniper = await ethers.getContractFactory("Juniper");
    juniper = await Juniper.deploy();
  });

  describe("Deployment", () => {
    it("Sets the owner", async () => {
      expect(await juniper.owner()).to.equal(deployer.address);
    });
  });

  describe("Listing", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await juniper.connect(deployer).list(1, "Item 1", "Object 1", "Vendor 1", "Category 1", "Image 1", 100, 4, 10);
      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await juniper.items(1);

      expect(item.id).to.equal(1);
      expect(item.name).to.equal("Item 1");
      expect(item.object).to.equal("Object 1");
      expect(item.vendor).to.equal("Vendor 1");
      expect(item.category).to.equal("Category 1");
      expect(item.image).to.equal("Image 1");
      expect(item.cost).to.equal(100);
      expect(item.rating).to.equal(4);
      expect(item.stock).to.equal(10);
    });

    it("Emits ItemListed event", () => {
      expect(transaction).to.emit(juniper, "ItemListed");
    });

    it("Prevents non-owners from listing items", async () => {
      await expect(
        juniper.connect(buyer).list(2, "Item 2", "Object 2", "Vendor 2", "Category 2", "Image 2", 200, 3, 5)
      ).to.be.revertedWith("Only the owner can call this function");
    });
  });

  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await juniper.connect(deployer).list(1, "Item 1", "Object 1", "Vendor 1", "Category 1", "Image 1", 100, 4, 10);
      await transaction.wait();
    });

    it("Updates buyer's order count", async () => {
      const result = await juniper.orderCount(buyer.address);
      expect(result).to.equal(0);

      await juniper.connect(buyer).buy(1, { value: 100 });
      
      const updatedResult = await juniper.orderCount(buyer.address);
      expect(updatedResult).to.equal(1);
    });

    it("Adds the order", async () => {
      await juniper.connect(buyer).buy(1, { value: 100 });

      const order = await juniper.orders(buyer.address, 1);

      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal("Item 1");
    });

    it("Updates the contract balance", async () => {
      const balanceBefore = await ethers.provider.getBalance(juniper.address);
      expect(balanceBefore).to.equal(0);

      await juniper.connect(buyer).buy(1, { value: 100 });

      const balanceAfter = await ethers.provider.getBalance(juniper.address);
      expect(balanceAfter).to.equal(100);
    });

    it("Emits ItemPurchased event", async () => {
      const tx = await juniper.connect(buyer).buy(1, { value: 100 });
      await tx.wait();

      expect(tx).to.emit(juniper, "ItemPurchased");
    });

    it("Prevents buying when not enough ether is sent", async () => {
      await expect(
        juniper.connect(buyer).buy(1, { value: 50 })
      ).to.be.revertedWith("Insufficient funds to purchase this item");
    });

    it("Prevents buying when the item is out of stock", async () => {
      for (let i = 0; i < 10; i++) {
        await juniper.connect(buyer).buy(1, { value: 100 });
      }

      await expect(
        juniper.connect(buyer).buy(1, { value: 100 })
      ).to.be.revertedWith("This item is out of stock");
    });
  });
});
