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

Users are calling the requests function to express their action intent with somes parameters such as : assets, amounts, keep the governance rights, slippage parameters. Then the request is push into the relayer queue and wait to be processed by a keeper.

### Processing


### AUM monitoring