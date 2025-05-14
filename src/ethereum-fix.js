// This script prevents the "Cannot redefine property: ethereum" error
// by checking if window.ethereum is already defined before trying to set it

export function safelyInitializeEthereum() {
  // Only run on the client side
  if (typeof window === 'undefined') return;
  
  // If we have a flag to disable ethereum, stop here
  if (window.DISABLE_ETHEREUM_INJECTION) return;
  
  // Check if the MetaMask or other wallets have already injected ethereum
  const hasEthereum = Object.prototype.hasOwnProperty.call(window, 'ethereum');
  
  if (!hasEthereum) {
    // Only define the property if it doesn't exist
    Object.defineProperty(window, 'ethereum', {
      value: null,
      writable: true,
      configurable: true
    });
    
    console.log('Safely initialized ethereum placeholder');
  } else {
    console.log('Ethereum object already exists, skipping initialization');
  }
}

// If this script is imported directly in a browser, run the initialization
if (typeof window !== 'undefined') {
  safelyInitializeEthereum();
} 