const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log("\nContract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  let waverCount = 0

  const listWavers = async (waveContract) => {
    waverCount = await waveContract.getNoWavers()
    console.log(`\nWe've been waved at ${ waverCount } times!`)
    for (waverNo = 0; waverNo < waverCount; waverNo++) {
      let waver = await waveContract.getWaver(waverNo)
      console.log("...waved at by :", waver)
    } 
  }
  
  waveCount = await waveContract.getTotalWaves()
  
  let waveTxn = await waveContract.wave()
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()
  await listWavers(waveContract)

  waveTxn = await waveContract.connect(randomPerson).wave()
  await waveTxn.wait()

  waveCount = await waveContract.getTotalWaves()
  await listWavers(waveContract)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()