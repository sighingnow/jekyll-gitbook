---
title: Oracle module
author: Fyde  
date: 2022-02-06
category: Jekyll
layout: post
---

## Fyde's Need for Oracles
The Fyde Protocol enables people to deposit their assets to mint TRSY, burn their TRSY to withdraw some assets, and swap the USD value of AssetA for the USD value of AssetB. To support these functions, the protocol requires oracles to provide price feeds for all supported assets.

## Fyde's oracle design
Fyde uses a combination of Chainlink and Uniswap V3 TWAP oracles with a 30 minutes time window. Whenever there is a need for an oracle value, the protocol will aggregate price from Chainlink and Uniswap V3 TWAP and implement various circuit breaker along the aggregation.
We acknowledge the limitations of using on-chain TWAP and the high risk of attack and manipulation. To reduce the risk of price manipulation, we have a whitelist criterion for assets in the protocol based on sufficient liquidity in the Uniswap V3 pool.

### Oracle flow 

<img src="{{site.baseurl}}/illustrations/OracleFlow.svg">

* see next graph for the circuit breaker implementation


### Circuit breaker implementation

We have implemented a circuit breaker to prevent the use of incorrect prices. 
When it comes to Chainlink, we mainly check if the price is up-to-date and if the data is correct. 
For Uniswap, we compare the values of the TWAP 30 min and TWAP 1 min to avoid consumming prices during periods of volatility.

<img src="{{site.baseurl}}/illustrations/CircuitBreaker.svg">

