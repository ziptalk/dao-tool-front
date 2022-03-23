import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  RiLink,
  RiKakaoTalkFill,
  RiTwitterFill,
  RiCloseFill,
} from "react-icons/ri";
import WelcomeBadge from "../../assets/images/WelcomeBadge.png";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
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
//import CloseButton from './CloseButton'
// import ClosebtnIcon from "../images/common/close1.png"

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
  padding-top: 31px;
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

function AddConnectWalletModal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  //   const currentUserpage = children[0]+children[1];
  //   const currentUserId = children[1];
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
    try {
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
      localStorage.setItem("currentWalletAddress", accounts[0]);
      console.log(accounts);
      // 여기에 connect wallet 정보 업데이트 해야함
      onClose()
    } catch (error) {
      alert("metamask 확장 프로그램을 설치해주세요.");
      console.error(error);
    }
  };

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  const closeOnClick = () => {
    onClose();
  };

  const goDashboardOnClick = () => {
    onClose();
    navigate("/mypage");
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
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
            <CloseButton onClick={closeOnClick}>
              <RiCloseFill />
            </CloseButton>
          </FullContainer>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

AddConnectWalletModal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #222222;
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  border-radius: 15px;
  max-width: 540px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  // padding: 40px 20px;
  color: white;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  width: 540px;
  height: 720px;
  border: none;
  border-radius: 20px;
  // background-color: rgba(0, 0, 0, 0.5);
  background-color: #333333;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  color: #ffffff;
  margin: 0 auto;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  z-index: 5;
`;

export default AddConnectWalletModal;
