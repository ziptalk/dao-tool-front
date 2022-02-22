import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import WalletIcon from "../../assets/icons/walletIcon.svg";
import { RiPencilFill } from "react-icons/ri";
import { BsCheckLg, BsTrash } from "react-icons/bs";

const forwarderOrigin = "http://localhost:8080";

const FullContainer = styled.div`
  width: 540px;
  min-height: 840px;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  background-color: rgba(48, 48, 48, 0.5);
  // padding-left: 40px;
  // padding-right: 40px;
  color: #ffffff;
  font-family: "NeoDunggeunmo Pro";
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
`;

const ProfileImageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const ProfileImageButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 1px solid #777777;
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 30px;
  margin: auto;
`;

const SessionTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  text-align: left;
  margin-top: 30px;
  margin-bottom: 10px;
  font-family: "Roboto Mono";
`;

const InputContainer = styled.div`
  width: 440px;
  min-height: 570px;
  margin: auto;
  align-items: center;
  position: relative;
`;

const NameInputBox = styled.input`
  width: 425px;
  height: 36px;
  background-color: #222222;
  border: 1px solid #777777;
  font-size: 18px;
  border-radius: 5px;
  font-family: "NeoDunggeunmo Pro";
  padding-left: 15px;
  color: #ffffff;
`;

const SubTextContent = styled.div`
  font-size: 12px;
  font-family: "Roboto Mono";
  color: #777777;
  margin: 10px;
  margin-bottom: 40px;
`;

const WalletListContainer = styled.div`
  width: 100%;
`;

const WalletItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const EditButton = styled.button`
  width: 42px;
  height: 42px;
  border: 0;
  background-color: transparent;
  color: #ffffff;
  font-size: 21px;
`;

const IconChangeButton = styled.button`
  width: 42px;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  border: 0;
`;

const WalletNameContent = styled.div`
  width: 132px;
  height: 42px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: auto;
  // display: table-cell;
  // vertical-align: middle;
`;

const WalletAddressContent = styled.div`
  width: 210px;
  height: 42px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const EditIconChangeButton = styled.button`
  width: 42px;
  height: 42px;
  background-color: #222222;
  border: 1px solid #777777;
  border-radius: 10px;
`;

const EditWalletNameContent = styled.input`
  width: 120px;
  height: 37px;
  border-radius: 10px;
  background-color: #222222;
  border: 1px solid #777777;
  font-size: 14px;
  font-family: "Roboto Mono";
  color: #ffffff;
  margin-left: 7px;
  padding-left: 10px;
`;

const EditWalletAddressContent = styled.input`
  width: 204px;
  height: 37px;
  border-radius: 10px;
  background-color: #222222;
  border: 1px solid #777777;
  font-size: 14px;
  font-family: "Roboto Mono";
  color: #ffffff;
  margin-left: 7px;
  padding-left: 10px;
`;

const WalletText = styled.div`
  max-width: 127px;
  height: 18px;
  position: relative;
  top: 12px;
  font-size: 14px;
  font-family: "Roboto Mono";
  color: #ffffff;
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WalletIconImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;

const DeleteContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: right;
  text-align: right;
  width: 168px;
  height: 24px;
  color: #ff6565;
  font-family: "Roboto Mono";
  font-size: 12px;
  background-color: transparent;
  border: 0;
  margin-top: -2px;
  margin-bottom: 5px;
`;

const TrashIcon = styled.div`
  font-size: 15px;
  margin-left: 4px;
`;

const IntroductionBox = styled.textarea`
  width: 410px;
  heoght: 80px;
  font-size: 18px;
  color: #ffffff;
  background-color: #222222;
  border: 1px solid #777777;
  border-radius: 5px;
  padding: 15px;
  // padding-left: 0px;
  // padding-right: 0px;
  font-family: "NeoDunggeunmo Pro";
`;

const IntroductionLength = styled.div`
  font-size: 14px;
  color: #c4c4c4;
  font-family: "Roboto Mono";
  text-align: right;
  align-items: right;
`;

const AddAddressButton = styled.button`
  width: 129px;
  height: 26px;
  border-radius: 24px;
  background-color: #c4c4c4;
  font-size: 12px;
  font-family: "Roboto Mono";
  font-weight: 800;
  border: 0;
  position: absolute;
  right: 0;
  top: 127px;
`;

const SubmitButton = styled.button`
  width: 122px;
  height: 42px;
  border-radius: 21px;
  background-color: #4673e9;
  border: 0;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  font-family: "NeoDunggeunmo Pro";
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const CreateProfile = ({ address }) => {
  const tmpList = [
    {
      walletName: "Metamask Wallet",
      walletIcon: WalletIcon,
      walletAddress: address,
    },
    {
      walletName: "Solana Wallet",
      walletIcon: WalletIcon,
      walletAddress: address,
    },
  ];

  const [addressList, setAddressList] = useState(tmpList);
  const [userName, setUserName] = useState("");
  const [editWalletId, setEditWalletId] = useState(-1);
  const [walletNameValue, setWalletNameValue] = useState("");
  const [walletAddressValue, setWalletAddressValue] = useState("");
  const [walletIconValue, setWalletIconValue] = useState("");
  const [introductionValue, setIntroductionValue] = useState("");
  const [addClick, setAddClick] = useState(false);

  useEffect(() => {}, [addClick]);

  const addAddressButtonOnClick = () => {
    var tmpAddressList = addressList;
    tmpAddressList.push({
      walletName: "",
      walletIcon: WalletIcon,
      walletAddress: "",
    });
    console.log(tmpAddressList);
    setAddressList(tmpAddressList);
    console.log(addressList);
    setAddClick(!addClick)
  };

  const submitButtonOnClick = () => {
    
  }

  return (
    <FullContainer>
      <TopContainer>
        <TitleBox>Create Profile</TitleBox>
        <ProfileImageButtonContainer>
          <ProfileImageButton>+</ProfileImageButton>
        </ProfileImageButtonContainer>
        <InputContainer>
          <SessionTitle>Id</SessionTitle>
          <NameInputBox
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Username"
          />
          <SubTextContent>
            https://www.daoon.com/{userName ? <>{userName}</> : <>username</>}
          </SubTextContent>
          <SessionTitle>Address</SessionTitle>
          <AddAddressButton onClick={addAddressButtonOnClick}>
            + Add Address
          </AddAddressButton>
          {addressList ? (
            <WalletListContainer>
              {addressList.map((item, index) => (
                <>
                  {editWalletId == index ? (
                    <>
                      <WalletItemContainer>
                        <EditButton
                          onClick={() => {
                            let tmpValue = {
                              walletName: walletNameValue,
                              walletIcon: WalletIcon,
                              walletAddress: walletAddressValue,
                            };
                            let tmpWalletList = addressList;
                            tmpWalletList[editWalletId] = tmpValue;
                            setAddressList(tmpWalletList);
                            setEditWalletId(-1);
                            setWalletAddressValue("");
                            setWalletNameValue("");
                            setWalletIconValue("");
                          }}
                        >
                          <BsCheckLg />
                        </EditButton>
                        <EditIconChangeButton>
                          <WalletIconImage src={WalletIcon} />
                        </EditIconChangeButton>
                        <EditWalletNameContent
                          value={walletNameValue}
                          onChange={(e) => {
                            setWalletNameValue(e.target.value);
                          }}
                        />
                        <EditWalletAddressContent
                          value={walletAddressValue}
                          onChange={(e) => {
                            setWalletAddressValue(e.target.value);
                          }}
                        />
                      </WalletItemContainer>
                      <DeleteContainer>
                        <DeleteButton
                          onClick={() => {
                            let tmpWalletList = addressList;
                            tmpWalletList.splice(index, 1);
                            setAddressList(tmpWalletList);
                            setEditWalletId(-1);
                            setWalletAddressValue("");
                            setWalletNameValue("");
                            setWalletIconValue("");
                          }}
                        >
                          delete this address
                          <TrashIcon>
                            <BsTrash />
                          </TrashIcon>
                        </DeleteButton>
                      </DeleteContainer>
                    </>
                  ) : (
                    <WalletItemContainer>
                      <EditButton
                        onClick={() => {
                          setEditWalletId(index);
                          setWalletAddressValue(item.walletAddress);
                          setWalletNameValue(item.walletName);
                          setWalletIconValue(item.walletIcon);
                        }}
                      >
                        <RiPencilFill />
                      </EditButton>
                      <IconChangeButton>
                        <WalletIconImage src={WalletIcon} />
                      </IconChangeButton>
                      <WalletNameContent>
                        <WalletText>{item.walletName}</WalletText>
                      </WalletNameContent>
                      <WalletAddressContent>
                        <WalletText> {item.walletAddress}</WalletText>
                      </WalletAddressContent>
                    </WalletItemContainer>
                  )}
                </>
              ))}
            </WalletListContainer>
          ) : (
            <></>
          )}
          <SubTextContent style={{ marginLeft: "0px" }}>
            The wallet addresses you wrote here will be displayed on your page.
          </SubTextContent>
          <SessionTitle>Introduction</SessionTitle>
          <IntroductionBox
            value={introductionValue}
            onChange={(e) => {
              setIntroductionValue(e.target.value);
            }}
            maxLength={100}
          />
          <IntroductionLength>
            {introductionValue.length}/100
          </IntroductionLength>
          <SubmitButton>Submit</SubmitButton>
        </InputContainer>
      </TopContainer>
    </FullContainer>
  );
};

export default CreateProfile;
