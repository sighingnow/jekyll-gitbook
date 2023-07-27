---
title: Relayer contract
author: Fyde  
date: 2022-02-02
category: Jekyll
layout: post
---

## Main overview

The role of the relayer is twofold : 
- First, it serves as the entry point for external users to interact with the protocol through request functions (requestDeposit, requestWithdraw, requestSwap).
- Second, it is used for settlement automation in Fyde through monitoring and updating the protocol AUM, and it manages the process request. Automation is monitored by external keepers, such as Gelato Network and our Fyde Keeper bot.


## Why is a relayer necessary? 

In designing our protocol, we chose to denominate assets and TVL in USD, with on-chain pricing. However, TVL calculation requires iterating through n assets, making on-chain pricing too expensive and not scalable. The keeper's goal is to calculate protocolAUM's value via on-chain functions, but since the computation is off-chain, this process is inexpensive.


## Relayer functionalities

### Requesting

Users are calling the requests function to express their action's intent with somes parameters such as : assets, amounts, keep the governance rights, slippage parameters. Then the request is push into the relayer queue and wait to be processed by a keeper. When user are making a request they will also forward some eth in order to pay the gas fees of the keeper. (See User flow section)

### Processing

The keepers (currently Gelato Bot and a own made keeper) monitor the relayer queue. When the queue fills up, the keeper is triggered and processes the pending requests. The functions's input of the process functions is the protocolAUM, which is calculated off-chain.


### AUM monitoring and protection from keeper manipulation


Since the keeper provides a crucial input for the protocol's operation (protocolAUM), it opens up an important attack vector. For this reason, we store the protocolAUM value inside the fyde contract as well. When the keeper calls the processRequest function, we ensure that the input value falls within a reasonable range to prevent manipulation attacks.

The protocolAUM value is also monitored by off-chain keepers. If the off-chain value deviates beyond a certain percentage, the keeper is triggered to update the internal value to maintain a consistent on-chain protocolAUM value. However, the keepers' actions are limited, and they can only update the protocolAUM within a coherent range to prevent atomic manipulation and draining the protocol in a single tx. By doing so, even if the gelato network is compromised or the private key of the Fyde keeper is stolen, the protocol is protected from single tx manipulation attacks, giving us time to react and pause the protocol.


### Access control and role

Relayer inherit access control logic, with the following roles : 
- User : If whitelist activated only specific user can interact, if zero address is whitelisted, it removes the whitelist logic.
- Owner : Can add/remove the roles below (functions are triggered manually, this will be a Gnosis Safe multisig)
Following roles can have multiple addresses assigned : 
- Keeper : Gelato network and Fyde keeper for updatingAUM and processRequest
- Guard : Can pause/unpause the protocol and add asset to quarantine list
- IncentiveManager : Can set swap incentiveFactor on Fyde

<img src="{{site.baseurl}}/illustrations/AccessControl.svg">



## Quarantine list

In the context of our portfolio management strategy, we may have to quarantine assets based on our risk management strategy. When an asset is quarantined, action for this given asset (deposit, withdraw and swap) are disabled. The quarantine list is managed by the guard role. 