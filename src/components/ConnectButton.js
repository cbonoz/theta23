// ConnectButton.tsx
import { useEtherBalance, useEthers } from "@usedapp/core";
import RenderBalance from "./RenderBalance";

export default function ConnectButton({text}) {
  const { activateBrowserWallet, account } = useEthers();
  const amount = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
    console.log("connect wallet", account);
  }

  if (account && amount) {
    console.log("account", account, amount);
    return <RenderBalance account={account} amount={amount} />;
  }

  return (
    <span className="right">
      <button type="primary" onClick={handleConnectWallet}>
        {text || 'Connect wallet'}
      </button>
    </span>
  );
}
