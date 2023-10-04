const hre = require("hardhat");
const { ethers } = hre;
const { items } = require("../src/items.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n, 'ether');
};

async function main() {
  try {

    const [deployer] = await ethers.getSigners();

    const Juniper = await hre.ethers.getContractFactory("Juniper");
    const juniper = await Juniper.deploy();
    await juniper.deployed();

    console.log(`Deployed Contract at: ${juniper.address}\n`);

    for (const item of items) {
      const transaction = await juniper.connect(deployer).list(
        item.id,
        item.name,
        item.category,
        item.vendor,
        item.color,
        item.image,
        tokens(item.cost),
        item.rating,
        item.stock,
        item.size
      );

      await transaction.wait();

      console.log(`Listed item ${item.id}: ${item.name}`);
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

main();
