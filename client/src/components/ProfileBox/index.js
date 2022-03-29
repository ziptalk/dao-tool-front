import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import { ImLink } from "react-icons/im";
import {
  RiArrowDownSFill,
  RiArrowUpSFil,
  RiFileCopyLine,
} from "react-icons/ri";
import EditProfileModal from "../EditProfileModal";

const BoxContainer = styled.div`
  width: 100%;
  margin-top: 34px;
`;

const TopButtonContainer = styled.div`
  display: flex;
  justify-content: right;
  height: 30px;
`;

const EditProfileButton = styled.button`
  width: 149px;
  height: 30px;
  border-radius: 15px;
  border: 0;
  background-color: #c4c4c4;
  color: #222222;
  font-family: Roboto Mono;
  font-size: 14px;
`;

const HitsBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 180px;
  height: 30px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  background-color: ${Palette.backgroundColor};
  margin-left: 21px;
`;

const HitsTitle = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  color: #ffffff;
  margin: auto 0px;
  margin-left: 13px;
`;

const HitsNumber = styled.div`
  display: flex;
  margin: auto 0px;
  margin-right: 13px;
`;

const TodayNumber = styled.div`
  font-family: Roboto Mono;
  font-weight: 700;
  color: #ffffff;
  font-family: Roboto Mono;
`;

const TotalNumber = styled.div`
  font-weight: 400;
  color: #c4c4c4;
  font-family: Roboto Mono;
`;

const ProfileContainer = styled.div`
  display: flex;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
`;

const UpperInfo = styled.div`
  margin-left: 28px;
`;

const NickNameContainer = styled.div`
  margin-top: 50px;
  height: 42px;
  display: flex;
`;

const NickNameText = styled.div`
  font-family: NeoDunggeunmo Pro;
  font-size: 42px;
  color: #ffffff;
`;

const CopyIcon = styled.button`
  background-color: transparent;
  border: 0;
  color: #ffffff;
  font-size: 20px;
  margin-left: 10px;
`;

const LowerInfo = styled.div`
  margin-top: 12px;
  display: flex;
`;

const WalletListDropBox = styled.button`
  width: 480px;
  height: 36px;
  border: 1px solid #c4c4c4;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const WalletListFrontText = styled.div`
  display: flex;
  margin: auto 0px;
  margin-left: 5px;
`;

const WalletIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const WalletName = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  color: #ffffff;
`;

const WalletDivideLine = styled.div`
  width: 1px;
  height: 20px;
  background-color: #ffffff;
  margin-left: 9px;
  margin-right: 9px;
`;

const WalletAddress = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  color: #ffffff;
  width: 135px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DropDownIcon = styled.button`
  border: 0;
  background-color: transparent;
  color: #ffffff;
  margin: auto 0px;
  font-size: 18px;
`;

const IntroductionContainer = styled.div`
  height: 50px;
  width: 100%;
  margin-top: 30px;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
`;

const IntroductionText = styled.div`
  margin: auto 20px;
  line-height: 25px;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
`;

const WalletListDropBoxContainer = styled.div`
  width: 480px;
  min-height: 30px;
  border-radius: 10px;
  background-color: #ffffff;
  position: absolute;
  top: 40px;
  left: -1px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const WalletAddressOne = styled.button`
  width: calc(100% - 10px);
  height: 36px;
  text-align: left;
  background-color: #ffffff;
  color: #777777;
  font-family: Roboto Mono;
  font-size: 14px;
  border: 0;
  border-radius: 8px;
  margin: 0px 5px;
  padding-left: 20px;
`;

const ProfileBox = ({
  nickname,
  walletList,
  todayHits,
  totalHits,
  introduce,
  profileImage,
  editBool,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const [walletDropboxOpen, setWalletDropboxOpen] = useState(false);

  const editProfileOnClick = () => {
    setModalVisible(true);
    setEditProfile(true);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCopyClipBoard = async (text, caseName) => {
    var textarea = document.createElement("textarea");
    textarea.value = text; // 복사할 메시지
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // For IOS
    document.execCommand("copy");
    document.body.removeChild(textarea);
    if(caseName == "link"){
      alert("profile link copied to clipboard")
    }else if(caseName == "address"){
      alert("wallet address copied to clipboard")
    }
    // alert("링크 복사 완료!");
  };

  return (
    <BoxContainer>
      <TopButtonContainer>
        {editBool ? (
          <EditProfileButton onClick={editProfileOnClick}>
            Edit Profile
          </EditProfileButton>
        ) : (
          <></>
        )}
        <HitsBox>
          <HitsTitle>hits</HitsTitle>
          <HitsNumber>
            <TodayNumber>{todayHits}</TodayNumber>
            <TotalNumber>/ {totalHits}</TotalNumber>
          </HitsNumber>
        </HitsBox>
      </TopButtonContainer>
      <ProfileContainer>
        <ProfileImage src={profileImage} />
        <UpperInfo>
          <NickNameContainer>
            <NickNameText>{nickname}</NickNameText>
            <CopyIcon
              onClick={() =>
                handleCopyClipBoard(`https://0xpersona.xyz/${nickname}`, 'link')
              }
            >
              <ImLink />
            </CopyIcon>
          </NickNameContainer>
          <LowerInfo>
            <WalletListDropBox
              onClick={() => setWalletDropboxOpen(!walletDropboxOpen)}
            >
              <WalletListFrontText>
                <WalletIcon src={walletList[selectedWalletIndex].walletIcon} />
                <WalletName>
                  {walletList[selectedWalletIndex].walletName}
                </WalletName>
                <WalletDivideLine />
                <WalletAddress>
                  {walletList[selectedWalletIndex].walletAddress}
                </WalletAddress>
              </WalletListFrontText>
              <DropDownIcon>
                <RiArrowDownSFill />
              </DropDownIcon>
              {walletDropboxOpen ? (
                <WalletListDropBoxContainer>
                  {walletList.map((item, index) => (
                    <>
                      {selectedWalletIndex == index ? (
                        <WalletAddressOne
                          style={{
                            backgroundColor: "#222222",
                            color: "#FFFFFF",
                          }}
                        >
                          {item.walletAddress}
                        </WalletAddressOne>
                      ) : (
                        <WalletAddressOne
                          onClick={() => {
                            setSelectedWalletIndex(index);
                            localStorage.setItem(
                              "selectWalletAddress",
                              walletList[index]
                            );
                            setWalletDropboxOpen(false);
                          }}
                        >
                          {item.walletAddress}
                        </WalletAddressOne>
                      )}
                    </>
                  ))}
                </WalletListDropBoxContainer>
              ) : (
                <></>
              )}
            </WalletListDropBox>
            <CopyIcon
              onClick={() =>
                handleCopyClipBoard(
                  walletList[selectedWalletIndex].walletAddress, 'address'
                )
              }
            >
              <RiFileCopyLine />
            </CopyIcon>
          </LowerInfo>
        </UpperInfo>
      </ProfileContainer>
      <IntroductionContainer>
        <IntroductionText>{introduce}</IntroductionText>
      </IntroductionContainer>
      {editProfile ? (
        <>
          <EditProfileModal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
          />
        </>
      ) : (
        <></>
      )}
    </BoxContainer>
  );
};

export default ProfileBox;
