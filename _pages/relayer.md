---
title: Relayer contract
author: Fyde  
date: 2022-02-05
category: Jekyll
layout: post
---

## Main overview

The relayer serves as the primary entry point for external users through the request functions (requestDeposit, requestWithdraw, requestSwap). A keeper, such as Gelato bot or Fyde keeper monitor the relayer and then processes the request and passes as input the protocolAUM (which will be used for further computation), which represents the protocol's total value locked (TVL) in USD.

## Why is a relayer necessary? 

In designing our protocol, we chose to denominate assets and TVL in USD, with on-chain pricing. However, TVL calculation requires iterating through n assets, making on-chain pricing too expensive and not scalable. The keeper's goal is to calculate protocolAUM's value via on-chain functions, but since the computation is off-chain, this process is inexpensive.


## Relayer functionalities

### Requesting

Users are calling the requests function to express their action's intent with somes parameters such as : assets, amounts, keep the governance rights, slippage parameters. Then the request is push into the relayer queue and wait to be processed by a keeper. When user are making a request they will also forward some eth in order to pay the gas fees of the keeper.

### Processing

The keepers (currently Gelato Bot and a own made keeper) monitor the relayer queue. When the queue fills up, the keeper is triggered and processes the pending requests. The functions's input of the process functions is the protocolAUM, which is calculated off-chain.


### AUM monitoring and protection from keeper manipulation


Since the keeper provides a crucial input value for the protocol's operation (protocolAUM), it opens up an important attack vector. For this reason, we store the protocolAUM value inside the fyde contract as well. When the keeper calls the process function, we ensure that the input value falls within a reasonable range to prevent manipulation attacks.

The protocolAUM value is also monitored by the keepers. If the off-chain value deviates beyond a certain percentage, the keeper is triggered to update the internal value to maintain a consistent on-chain protocolAUM value. However, the keepers' actions are limited, and they can only update the protocolAUM within a coherent range to prevent atomic manipulation and draining the protocol.