import ethers from "ethers"

export default async function mintERC721(uri) {
    const provider = new ethers.JsonRpcApiProvider(TESTNET_URL)
    const accounts = await provider.getSigner()
    //To someaddr need to
    const ERC721Market = new ethers.BaseContract(ERC721Market_addr, ERC721Market_abi, accounts)
    const tx = ERC721Market.mintERC721(platForm1_addr, uri)
}
