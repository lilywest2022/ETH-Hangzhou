const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // get the IPFS hashes of our images

    log("----------------------------------------------------")

    const args = ["Vedio NFT", "VNFT", deployer]
    const erc721PlatformManage = await deploy("ERC721PlatformManage", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("----------------------------------------------------")
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying on Etherscan")

        await verify(erc721PlatformManage.address, args)
    }
    log("------------------------------------")
}

module.exports.tags = ["all", "erc721", "main"]
