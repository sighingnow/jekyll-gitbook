---
layout: home
title: Introduction to Fyde
permalink: /
---

## What is Fyde ? 

Fyde Protocol introduces a trustless treasury management solution that addresses the four pillars of cryptocurrency treasury management: diversification, asset liquidity, yield generation, and governance. It tackles the DAO treasury conundrum by incentivizing users to deposit into a diversified pool of assets, while allowing for the retention of governance rights and preserving direct user control over their allocations. 


Fyde introduces an on-chain exchange pool, where tokens over a range of sub-sectors come together to compose a portfolio management strategy---tracking the market performance of each asset and implementing a dynamic weight mechanism that targets a range of volatility metrics (beta-targeting) for the pool.


## How it works ? 

TODO : Andrey can you write few lines explaining the protocol as you would for the whitepaper


## Architecture

The protocol architecture is composed of four main smart contracts:

- The Relayer: contains the entry points into the protocol for external users, as well as the protocol automation logic.
- Fyde: contains the main logic of the protocol, allowing for depositing, withdrawing, and swapping assets.
- OracleModule: allows for obtaining on-chain pricing of assets.
- GovernanceModule: contains the logic allowing a user to retain governance rights over their assets.
  

![Architecture](/illustrations/ContractOverview.png)
