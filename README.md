# BTC Retirement DAO

A decentralized Bitcoin retirement platform with tax-optimized pools, automatic risk management, and time-locked tranches for secure long-term savings.

## Features

- **Time-locked BTC Pools**: Choose from 5, 10, 15, or 20-year lock periods
- **Monthly Subscriptions**: Start with as little as €50/month via Stripe → MoonPay → BTC
- **Risk Management**: Automatic -20% stop-loss and +50% take-profit mechanisms
- **DAO Governance**: Vote on key decisions using your PoolShare tokens
- **Referral System**: Earn rewards for inviting new members
- **Interactive Dashboard**: Track your investment growth in real-time

## Technology Stack

- **Frontend**: Astro, React, Tailwind CSS
- **Web3**: WalletConnect, MetaMask, ethers.js
- **Backend Integrations**: Stripe, The Graph, Chainlink Keepers
- **Smart Contracts**: Solidity (ERC-4626 vaults, ERC-1400 compliance)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/btc-retirement-dao.git
   cd btc-retirement-dao
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Create `.env` file with the following variables:
   ```
   VITE_WALLET_CONNECT_ID=your_wallet_connect_project_id
   VITE_INFURA_ID=your_infura_project_id
   VITE_NETWORK=mainnet
   ```

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Open your browser at `http://localhost:4321`

## Building for Production

```bash
pnpm build
```

The built site will be in the `dist/` directory, ready to be deployed to your hosting provider.

## Project Structure

- `src/pages/` - Astro pages for site routing
- `src/components/` - Reusable UI components and sections
- `src/layouts/` - Page layout templates
- `src/lib/` - Utility functions and helpers
- `public/` - Static assets (images, fonts, etc.)

## Deployment

The site can be deployed to any static hosting provider like Vercel, Netlify, or GitHub Pages.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
