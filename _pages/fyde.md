---
title: Fyde contract
author: Fyde  
date: 2022-02-04
category: Jekyll
layout: post
---

## Main overview

The Fyde contract serves as the core contract of the Fyde protocol. It handles the logic for depositing, withdrawing, and swapping assets within the protocol.

Fyde acts as an index pool that accepts certain assets and sets a target concentration, which represents the desired weight of the asset in the protocol relative to the TVL in USD. Target concentrations represent the ideal weight of a given asset in the protocol as part of our portfolio management strategy. In the event of an action (deposit, withdraw, swap) that unbalances the target concentration, a tax is applied to penalize these actions in order to maintain the current concentrations close to the portfolio management strategy. For example, depositing an asset that will change the concentration towards overweighing concentration will be taxed, same for withdrawing an asset that is underweight.

Approved assets can be deposited by users, and upon deposit, TRSY is minted to the user. This represents a share of the pool that is proportional to the deposited amount denominated in USD. For example, if a user deposits 100 TokenA representing 100k and the TVL is 1M USD with a circulation of 500k TRSY, the user will receive 50k TRSY.

Users can withdraw assets by burning their TRSY, using a mechanism similar to depositing. For example, if a user has 50,000 TRSY and the total value locked (TVL) is 1 million USD, with a total circulation of 500,000 TRSY, the user owns 10% of the index pool and can withdraw the equivalent of 100,000 USD.

Users can swap assetIn for assetOut. During the swap, we exchange the USD value of assetIn for an amount of assetOut with the same USD value.


## Smart contract overview


## Computation of the tax 

### Deposit tax

This system is encapsulated by the following function, which charges no tax if the deposit remains underneath the target concentration of the token pool. A tax proportional to the difference between the current ($C_{i}$) and target concentrations ($C_{i}^0$) will be levied on the portion of assets that are deposited into overweight pools ($D_{i}^a$). This tax is calculated for every pool being deposited into, where $D_{i}$ is the USDC value of each individual deposit and $T_{D}$ is the sum of all deposits.