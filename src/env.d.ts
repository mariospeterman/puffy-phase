/// <reference types="astro/client" />
import type { ui } from './i18n/ui';

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_ID: string;
  readonly VITE_INFURA_ID: string;
  readonly VITE_NETWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    lang: keyof typeof ui;
  }
} 