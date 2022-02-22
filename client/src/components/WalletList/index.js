import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import BinanceWallet from "../../assets/icons/BinanceWallet.svg";
import CoinbaseWallet from "../../assets/icons/CoinbaseWallet.svg";
import Kaikas from "../../assets/icons/Kaikas.svg";
import Keplr from "../../assets/icons/Keplr.svg";
import Metamask from "../../assets/icons/Metamask.svg";
import Phantom from "../../assets/icons/Phantom.svg";
import TerraStationWallet from "../../assets/icons/TerraStationWallet.svg";
import WalletConnect from "../../assets/icons/WalletConnect.svg";
// import MetamaskInitialize from "../../axios/metamastask";
import MetaMaskOnboarding from "@metamask/onboarding";
import CreateProfile from "../CreateProfile";

const forwarderOrigin = "http://localhost:8080";

const FullContainer = styled.div`
  width: 540px;
  height: 720px;
  border-radius: 20px;
  background-color: rgba(48, 48, 48, 0.5);
`;

const TopContainer = styled.div`
  width: 100%;
`;

const TitleBox = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: ${Palette.contentColor};
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "NeoDunggeunmo Pro";
`;

const ListContainer = styled.div``;

const WalletButton = styled.button`
  width: 460px;
  height: 61px;
  background-color: rgba(196, 196, 196, 0.2);
  display: flex;
  // padding-left: 20px;
  margin: auto;
  border: 0;
  margin-top: 15px;
  border-radius: 10px;
  font-family: "NeoDunggeunmo Pro";
`;

const WalletIcon = styled.img`
  width: 36px;
  margin-right: 20px;
  margin: auto;
`;

const WalletName = styled.div`
  width: 360px;
  height: 36px;
  font-size: 18px;
  color: ${Palette.contentColor};
  text-align: left;
  margin: auto;
  line-height: 36px;
`;


const WalletList = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const walletItems = [
    {
      name: "Metamask",
      img: Metamask,
      connectId: "MetamaskConnectButton",
      getAccountsId: "MetamaskGetAccount",
      getAccountsResult: "MetamaskGetAccountsResult",
    },
    {
      name: "WalletConnect",
      img: WalletConnect,
      connectId: "WalletConnectConnectButton",
      getAccountsId: "WalletConnectGetAccount",
      getAccountsResult: "WalletConnectGetAccountsResult",
    },
    {
      name: "Coinbase Wallet",
      img: CoinbaseWallet,
      connectId: "CoinbaseConnectButton",
      getAccountsId: "CoinbaseGetAccount",
      getAccountsResult: "CoinbaseGetAccountsResult",
    },
    {
      name: "Binance Wallet",
      img: BinanceWallet,
      connectId: "BinanceConnectButton",
      getAccountsId: "BinanceGetAccount",
      getAccountsResult: "BinanceGetAccountsResult",
    },
    {
      name: "Phantom",
      img: Phantom,
      connectId: "PhantomConnectButton",
      getAccountsId: "PhantomGetAccount",
      getAccountsResult: "PhantomGetAccountsResult",
    },
    {
      name: "Keplr",
      img: Keplr,
      connectId: "KeplrConnectButton",
      getAccountsId: "KeplrGetAccount",
      getAccountsResult: "KeplrGetAccountsResult",
    },
    {
      name: "Terra Station Wallet",
      img: TerraStationWallet,
      connectId: "TerraStationConnectButton",
      getAccountsId: "TerraStationGetAccount",
      getAccountsResult: "TerraStationGetAccountsResult",
    },
    {
      name: "Kaikas",
      img: Kaikas,
      connectId: "KaikasConnectButton",
      getAccountsId: "KaikasGetAccount",
      getAccountsResult: "KaikasGetAccountsResult",
    },
  ];
  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  const onClickInstall = () => {
    onboarding.startOnboarding();
  };

  const metamaskOnClick = async () => {
    //   if(window.ethereum) {
    //       console.log("yes")
    //   }else{
    //       console.log("no")
    //   }
    try {
      // await window.ethereum.request({ method: 'eth_requestAccounts' })
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setWalletAddress(accounts[0]);
      console.log(accounts);
    } catch (error) {
      alert("metamask 확장 프로그램을 설치해주세요.");
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     (() => {
  //     window.addEventListener("DOMContentLoaded", MetamaskInitialize);
  //     console.log("nn")
  //     })();

  //     return()=>{
  //         window.addEventListener("DOMContentLoaded", MetamaskInitialize);
  //     }
  //   },[]);

  return (
    <>
      {walletAddress ? (
        <CreateProfile address={walletAddress}/>
      ) : (
        <FullContainer>
          <TopContainer>
            <TitleBox>Connect Wallet</TitleBox>
          </TopContainer>
          <ListContainer>
            {walletItems.map((item, index) => (
              <WalletButton id={item.connectId} onClick={metamaskOnClick}>
                <WalletIcon src={item.img} />
                <WalletName>{item.name}</WalletName>
              </WalletButton>
            ))}
          </ListContainer>
        </FullContainer>
      )}
    </>
  );
};

export default WalletList;
