import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import Metamask from "../../assets/icons/Metamask.svg";
import { BsTrash } from "react-icons/bs";
import { IoExitOutline } from "react-icons/io5";
import AddConnectWalletModal from "../AddConnectWalletModal";

const HeaderContainer = styled.div`
  width: 100%;
  height: 76px;
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  justify-content: right;
`;

const BadgeButton = styled.button`
  background-color: transparent;
  margin-left: 35px;
  margin-right: 35px;
  margin-top: 28px;
  font-size: 18px;
  color: #ffffff;
  font-weight: 400;
  font-family: NeoDunggeunmo Pro;
  height: 18px;
  border: 0px;
`;

const WalletButton = styled.button`
  width: 180px;
  height: 36px;
  margin-top: 20px;
  border-radius: 18px;
  border: 1px solid #c4c4c4;
  display: flex;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.2);
  margin-left: 35px;
  margin-right: 50px;
`;

const WalletName = styled.div`
  font-family: Roboto Mono;
  font-size: 18px;
  color: #ffffff;
  font-weight: 400;
  width: 119px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 3px;
  margin-left: 10px;
`;

const WalletDropDownButton = styled.button`
  color: white;
  border: 0;
  background-color: transparent;
  font-size: 20px;
  margin-top: 5px;
`;

const WalletDropBox = styled.div`
  width: 540px;
  height: auto;
  border: 1px solid #c4c4c4;
  background-color: #333333;
  border-radius: 20px 0px 20px 20px;
  z-index: 3;
  position: absolute;
  top: 65px;
  right: 50px;
`;

const DropDownContent = styled.div`
  margin-top: 32px;
  margin-left: 27px;
  margin-right: 27px;
`;

const WalletListCategory = styled.div`
  color: #c4c4c4;
  font-size: 14px;
  line-height: 18px;
  font-family: Roboto Mono;
`;

const AddressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const AddressContent = styled.div`
  display: flex;
`;

const IconContainer = styled.img`
  width: 24px;
`;
const AddressText = styled.div`
  font-family: Roboto Mono;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  margin-left: 7px;
`;

const DeleteButton = styled.button`
  height: 24px;
  color: #ff6565;
  font-size: 12px;
  background-color: transparent;
  border: 0;
`;

const TrashIcon = styled.div`
  font-size: 14px;
  margin-left: 4px;
`;

const ButtomButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const SignoutButton = styled.button`
  display: flex;
  color: #ff6565;
  background-color: transparent;
  height: 24px;
  border: 0;
  margin-top: 5px;
`;

const SignoutText = styled.div`
  font-family: Roboto Mono;
  font-size: 18px;
`;

const ExitIcon = styled.div`
  height: 100%;
  line-height: 12px;
  margin-top: 6px;
  font-size: 16px;
  margin-right: 3px;
`;

const AddWalletButton = styled.button`
  width: 200px;
  height: 34px;
  border-radius: 17px;
  border: 0;
  background-color: #c4c4c4;
  color: #000000;
  font-family: Roboto Mono;
  font-size: 14px;
`;

const Header = () => {
  const [currentWalletAddress, setCurrentWalletAddress] = useState(
    localStorage.getItem("currentWalletAddress")
  );
  const [currentWalletIcon, setCurrentWalletIcon] = useState(Metamask);
  const [linkedAddresses, setLinkedAddresses] = useState([
    {
      address: "7sd5UqiJrjH41NsMxp3QgYDKTRH6FZUwXthxwtKFLkj1",
      icon: "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/4810d696-d9fb-4dac-a56c-a4b84ffa8aed2.png",
    },
    {
      address: "cosmos1uycht48xrjc7zdfg83020nearwk6hxr9eccwgf",
      icon: "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/9b1c7829-570e-4d1c-9b87-e13f93b7cec21.png",
    },
  ]);
  const [dropdown, setDropdown] = useState(false);
  const [deleteClick, setDeleteClick] = useState(false);
  const [addConnectWallet, setAddConnectWallet] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {}, [deleteClick]);

  const dropDownOnClick = () => {
    setDropdown(!dropdown);
  };

  const signoutOnClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const mypageOnClick = () => {
    if (localStorage.getItem("nickname")) {
      window.location.href = "/mypage";
    } else {
      alert("로그인 후에 볼 수 있는 페이지입니다.");
      window.location.href = "/";
    }
  };

  const allBadgeOnClick = () => {
    window.location.href = "/allbadges";
  };

  const addConnectWalletOnClick = () => {
    setModalVisible(true);
    setAddConnectWallet(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <HeaderContainer>
      <BadgeButton onClick={allBadgeOnClick}>All Badges</BadgeButton>
      <BadgeButton onClick={mypageOnClick}>My Page</BadgeButton>
      <WalletButton onClick={dropDownOnClick}>
        <WalletName>{currentWalletAddress}</WalletName>
        <WalletDropDownButton>
          {dropdown ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
        </WalletDropDownButton>
      </WalletButton>
      {dropdown ? (
        <>
          <WalletDropBox>
            <DropDownContent>
              <WalletListCategory>Current Address</WalletListCategory>
              <AddressContainer>
                <AddressContent>
                  <IconContainer src={currentWalletIcon} />
                  <AddressText>{currentWalletAddress}</AddressText>
                </AddressContent>
              </AddressContainer>
              <WalletListCategory style={{ marginTop: "30px" }}>
                Linked Addresses
              </WalletListCategory>
              {linkedAddresses.map((item, index) => (
                <AddressContainer>
                  <AddressContent>
                    <IconContainer src={item.icon} />
                    <AddressText>{item.address}</AddressText>
                  </AddressContent>
                  <DeleteButton
                    onClick={() => {
                      let tmpWalletList = linkedAddresses;
                      tmpWalletList.splice(index, 1);
                      setLinkedAddresses(tmpWalletList);
                      setDeleteClick(!deleteClick);
                    }}
                  >
                    <TrashIcon>
                      <BsTrash />
                    </TrashIcon>
                  </DeleteButton>
                </AddressContainer>
              ))}

              <ButtomButtonContainer>
                <SignoutButton onClick={signoutOnClick}>
                  <ExitIcon>
                    <IoExitOutline />
                  </ExitIcon>
                  <SignoutText>sign out</SignoutText>
                </SignoutButton>
                <AddWalletButton onClick={addConnectWalletOnClick}>
                  Add Wallet Address
                </AddWalletButton>
              </ButtomButtonContainer>
            </DropDownContent>
          </WalletDropBox>
        </>
      ) : (
        <></>
      )}
      {addConnectWallet ? (
        <>
          <AddConnectWalletModal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
          />
        </>
      ) : (
        <></>
      )}
    </HeaderContainer>
  );
};

export default Header;
