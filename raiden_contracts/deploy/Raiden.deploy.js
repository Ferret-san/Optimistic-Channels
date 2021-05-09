/**
 * 
 * Deploys the main Raiden contracts and Services contracts
 */

//Deploys the main Raiden contracts
const func = async(hre) => {

    const { deployments, getNamedAccounts } = hre
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    console.log('Deployer address: ', deployer)
    /**MAIN RAIDEN CONTRACTS */
    /**
     * Deploys:
     *  - SecretRegistry (No args)
     */

    const secretRegistry = await deploy('SecretRegistry', {
        from: deployer,
        args: [],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed SecretRegistry at address: ", secretRegistry.address)

    /**
     * @param _secret_registry_address The address of SecretRegistry that's used by all
     * TokenNetworks created by this contract
     * @param _chain_id EIP-155 Chain-ID of the chain where this contract is deployed
     * @param _settlement_timeout_min The shortest settlement period (in number of blocks)
     * that can be chosen at the channel opening
     * @param _settlement_timeout_max The longest settlement period (in number of blocks)
     * that can be chosen at the channel opening
     * @param _max_token_networks the number of tokens that can be registered
       Note: passing MAX_UINT256 means no limits
    **/
    const network = await hre.ethers.provider.getNetwork()
    const tokenNetworkRegistry = await deploy('TokenNetworkRegistry', {
        from: deployer,
        args: [secretRegistry.address, network.chainId, 10, 50, 1], //Last 3 args should be different during production
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed TokenNetworkRegistry at address: ", tokenNetworkRegistry.address)

    /**SERVICES */
    const serviceToken = await deploy('CustomToken', {
        from: deployer,
        args: [20000000, 18, 'ServiceToken', 'SVT'],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed ServiceToken at address: ", serviceToken.address)

    /**
     * Deploys:
     *  - SecretRegistry 
     */
    const serviceRegistry = await deploy('ServiceRegistry', {
        from: deployer,
        args: [serviceToken.address, deployer, 100000 , 6, 5, 17280000, 1000, 15552000],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed ServiceRegistry at address: ", serviceRegistry.address)

    /**
     * Deploys:
     *  - User Deposit Contract 
     */
    const userDepositContract = await deploy('UserDeposit', {
        from: deployer,
        args: [serviceToken.address, 9007199254740990], //Using MAX_SAFE_INTEGER - 1 for testing purposes
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed UserDepositContract at address: ", userDepositContract.address)


    /**
     * Deploys:
     *  - Monitoring Service
     */
     const monitoringService = await deploy('MonitoringService', {
        from: deployer,
        args: [serviceToken.address, serviceRegistry.address, userDepositContract.address, tokenNetworkRegistry.address],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed MonitoringService at address: ", monitoringService.address)

    /**
     * Deploys:
     *  - Monitoring Service
     */
     const oneToN = await deploy('OneToN', {
        from: deployer,
        args: [userDepositContract.address, network.chainId, serviceRegistry.address],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed OneToN at address: ", oneToN.address)

    /** Test token */
    const testToken = await deploy('CustomToken', {
        from: deployer,
        args: [10000000 , 18, 'TestToken', 'TTT'],
        log: true,
        gasPrice: 0,
        gasLimit: 6000000,
    })

    console.log("Succesfully deployed TestToken at address: ", testToken.address)

    /**Register the TTT token */
    console.log("Registering TestToken to the TokenNetworkRegistry...")

    console.log(tokenNetworkRegistry)
    //await tokenNetworkRegistry.createERC20TokenNetwork(testToken.address, 115792089237316195423570985008687907853269984665640564039457584007913129639935, 115792089237316195423570985008687907853269984665640564039457584007913129639935)

}

func.tags = ['Raiden']
module.exports = func