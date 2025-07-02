Certainly! Below is the content you provided, properly formatted into a professional and comprehensive `README.md` file for your **Nero-2-vest dApp**:

---

# Nero-2-vest dApp

![Logo](./public/logo.png)

## Overview

**Nero-2-vest** is a decentralized application (dApp) developed for the **NERO Chain Hackathon 2025**, designed to facilitate blockchain-based startup funding using **Account Abstraction (AA)** on the NERO Testnet. Built with TypeScript and React, the app integrates advanced EVM-compatible libraries (`ethers.js`, `userop`, `viem`) and authentication SDKs (`@web3auth/modal`) for secure, gas-optimized wallet interactions. It features a dual-view dashboard for both startups and investors, prioritizing modularity, scalability, and seamless integration within the NERO ecosystem.

* **Repository**: *\[GitHub Link Placeholder]*
* **Live Demo**: *\[Demo Link Placeholder]*
* **Hackathon**: NERO Chain Hackathon 2025
* **Build Status**: Alpha Release
* **Network**: NERO Testnet (Chain ID: `0x2b1`)
* **RPC URL**: `https://rpc-testnet.nerochain.io`

---

## 🔧 Functional Specifications

* **Core Features**:

  * Startup project creation and fund management
  * Investor dashboard for project discovery
  * AA-enabled wallet interactions (MetaMask & Web3Auth)
* **Transaction Layer**:

  * Built on `userop` for gasless, AA-based UserOperations
* **UI/UX**:

  * Built with React, Tailwind CSS, and Framer Motion for modular design and animation

---

## 🚀 Problem It Solves

* **Gas Fees**: Reduces gas complexity using UserOperation bundling
* **Onboarding Complexity**: Simplifies wallet interaction for non-technical users
* **Funding Gap**: Bridges Web2-style fundraising and decentralized capital allocation
* **Scalability**: Prepared for cross-chain and high-volume scalability

---

## 🧱 Software Architecture

### Frontend

| Tech          | Version | Description                       |
| ------------- | ------- | --------------------------------- |
| React         | 18.2.0  | SPA architecture with React hooks |
| TypeScript    | 5.8.3   | Strong typing & dev productivity  |
| React Router  | 6.27.0  | Page routing with lazy load       |
| Tailwind CSS  | 3.4.13  | Utility-first styling             |
| Framer Motion | 10.18.0 | UI Animations                     |

### Web3 Integration

| Library         | Purpose                            |
| --------------- | ---------------------------------- |
| ethers.js       | Contract & wallet interactions     |
| userop          | Build & submit UserOperations (AA) |
| viem            | Type-safe EVM client               |
| @web3auth/modal | Social wallet authentication       |

### Dev Tools & Utilities

* **Build**: `craco` (custom Webpack) → Vite (recommended)
* **Notification**: `react-toastify`
* **Icons & Components**: `@heroicons/react`, `@headlessui/react`

---

## ⚙️ Build & Integration Process

### Build System

#### Current (CRA with craco)

```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

#### Vite Migration (Recommended)

```json
"scripts": {
  "start": "vite",
  "build": "tsc && vite build",
  "serve": "vite preview"
}
```

### `vite.config.ts` Example

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@react-native-async-storage/async-storage': false,
    },
  },
});
```

---

## 🔄 Integration Workflow

1. **Wallet Connectivity**:

   * MetaMask: Detected via `ethers.BrowserProvider`
   * Web3Auth: Initialized with NERO-specific `chainConfig`
2. **Routing**:

   * Routes: `/`, `/startup`, `/investor`
   * Lazy loading with `React Router`
3. **AA Flow**:

   * UserOps built via `userop.Presets.Builder`
   * EntryPoint and Paymaster addresses configured in `src/config.ts`
4. **State Management**:

   * Global context for EOA, AA, project data

---

## 🧪 TypeScript & Config

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "module": "esnext",
    "types": ["node", "./src/types"],
    ...
  },
  "include": ["src"]
}
```

Extend `Window` with `ethereum` in `src/types/window.d.ts`.

---

## 🛠️ Installation Guide

### Prerequisites

* Node.js >= 16.x (Recommended: 18.x)
* MetaMask (NERO Testnet RPC configured)
* Web3Auth Client ID

### Setup

```bash
git clone <your-repo-url>
cd nero-2-vest
npm install --legacy-peer-deps
```

### `.env` Example

```env
REACT_APP_WEB3AUTH_CLIENT_ID=your-client-id
REACT_APP_PAYMASTER_API_KEY=your-paymaster-key
```

### Update `config.ts`

```ts
export const NERO_CHAIN_CONFIG = {
  chainId: '0x2b1',
  rpcUrl: 'https://rpc-testnet.nerochain.io',
  entryPoint: '0x...',
  accountFactory: '0x...',
};
```

### Run App

```bash
npm start
```

Build:

```bash
npm run build
```

---

## 🧭 Usage Guide

* **Startup View**: `/startup`
* **Investor View**: `/investor`
* **Authentication**: Web3Auth modal or MetaMask
* **AA Transactions**: Trigger `getSigner` and `getAAWalletAddress`

---

## 🧗 Challenges Faced

* React-scripts & TypeScript conflicts resolved via `craco`
* Missing `userop`/`viem` types fixed via manual install
* Manual AA config for NERO due to lack of official docs
* Web3Auth upgrade required API changes

---

## 📚 Lessons Learned

* Vite offers significant build performance advantages
* `userop` requires accurate EntryPoint alignment
* `ethers` and `viem` interoperate well if contracts are configured correctly
* Type-safe error handling improves debuggability

---

## 🗺 Roadmap

### 🧩 Wave 1 – Community Tools (July 2025)

* Quadratic voting smart contract
* Token-gated mentorship marketplace
* Real-time investor dashboard with Chart.js

### 🌉 Wave 2 – Multi-Chain + Mainnet (August 2025)

* LayerZero-based bridge integration
* NFT module (ERC-721, `openzeppelin`)
* Mainnet staking with `viem` tracking

---

## 🤝 Contribution Guide

```bash
git checkout -b feature/<name>
```

* Lint: ESLint + Prettier
* Test: Add Jest unit tests (if applicable)
* Push PR with description and screenshots

```bash
git commit -m "feat: <description>"
```

---

## 📜 License

[MIT License](./LICENSE)

---

## 💬 Acknowledgments

* **NERO Chain Team** – RPC & AA testnet support
* **xAI/Grok** – Development feedback
* **Web3Auth** – Authentication SDK
* **OpenZeppelin** – Smart contract libraries

---

## 📞 Contact

* **Developer**: *\[Your Name]*
* **Email**: *\[Your Email]*
* **X (Twitter)**: \[@YourHandle]

---

## 🧠 Notes & Enhancements

* Configure `.gitignore` to exclude `node_modules`, `build`, `.env`
* Replace all placeholder URLs and keys
* Deploy via [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
* Add screenshots or GIF demos under `/public` and embed them

---

Let me know if you’d like:

* Auto-generated API reference docs
* Smart contract stubs
* Deployment walkthrough
* Hackathon pitch deck write-up

You're all set to showcase Nero-2-vest!
