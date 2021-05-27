Raiden Network Smart Contracts on Optimistic Kovan
==================================================

`Raiden Network Smart Contract specs`_

.. _Raiden Network Smart Contract specs: https://raiden-network-specification.readthedocs.io/en/latest/smart_contracts.html

OG Raiden Network Smart Contract repo: https://github.com/raiden-network/raiden-contracts

Raiden Light client with Kovan Contract Support: https://github.com/Ferret-san/light-client

Note: if you don't see a token you minted or one of test tokens below available, go to devtools in your browser and in the console type: `raiden.monitorToken("address")`

Optimisitc Ethereum Kovan Addresses
-----------------------------------
- SecretRegistry at address:  0x3DF0C6eBb360E6485FcFfFa99Deab39Ed789Baf5
- TokenNetworkRegistry at address:  0xEBD114D78aCe713DBA75e649eb763Eb9A4DeddaA
- ServiceToken at address:  0x806E55Dc852609176F187a5C515393C923179d0C
- ServiceRegistry at address:  0x9b4d7E59f6cA64f37864845966E106cfbe6Eaa10
- UserDepositContract at address:  0xc3Fbcb0aADdFE6399e04fCADa42F92C9104Cb133
- MonitoringService at address:  0xE37d878e97ec516225dC151f4A056e23460e177D
- OneToN at address:  0x3CD189b2FC57BA8456C8060a2B2dDb054B0F4baF
(The following are for testing purposes only!)
- TestToken at address:  0xc6f7F48C1FF8389691464f3fe3AFbc9a8a0BbABC
- TokenNetwork (TestToken): 0xa5D521b23d6765d6c7d329813c36DE05a6FF8A0d
- OptimisticTestToken at address: 0x3c45e74eB3cd97959538789Ad0e821938eF50CE9
- TokenNetwork (OptimisticTestToken): 0x887dCf20d298898989529fd1773886489DE63333

Deployment
----------

In order to get the contracts deployed on an OVM compatible container or the Kovan OVM, hardhat is needed for deployment, as such use the harhdat script under the raiden-contracts/deploy folder in order to deploy the contracts to your desired OVM instance.


