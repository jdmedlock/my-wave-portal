const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners()
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal')
  const waveContract = await waveContractFactory.deploy()
  await waveContract.deployed()

  console.log("Contract deployed to:", waveContract.address)
  console.log("Contract deployed by:", owner.address)

  let waveCount

  const listWavers = async (waveContract) => {
    let noWavers = await waveContract.getNoWavers()
    console.log("noWavers: ", noWavers)
    for (i = 0; i < noWavers; i++) {
      let waver = await waveContract.getWaver(i)
      console.log(waver)
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