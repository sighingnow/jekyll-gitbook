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

This diagram shows the oracle flow in Fyde:

<img src="{{site.baseurl}}/illustrations/OracleFlow.svg">

* see next graph for the circuit breaker implementation


<img src="{{site.baseurl}}/illustrations/CircuitBreaker.svg">

