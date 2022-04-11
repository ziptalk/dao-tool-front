import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import WalletIcon from "../../assets/icons/walletIcon.svg";
import { RiPencilFill, RiCloseFill } from "react-icons/ri";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { IconList } from "./iconList";
import { signup, login } from "../../axios/auth";
import { renderMatches, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { editProfile, getUserpage } from "../../axios/auth";

const forwarderOrigin = "https://api.0xpersona.club";

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
  height: 100%;
  text-align: left;
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
  position: relative;
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

const WalletIconSelectBox = styled.div`
  width: 437px;
  height: 100px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  z-index: 2;
  top: 60px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 8px 10px;
  margin-right: 0px;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  background-repeat: no-repeat;
  background-size: cover;
  border: 0;
  background-color: transparent;
  margin: 5px;
`;

const EditProfile = ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
}) => {
  const tmpList = JSON.parse(localStorage.getItem("myWalletList"));
  console.log(tmpList);

  const myWalletFilter = tmpList.map((data) => ({
    walletIndex: data.index,
    walletName: data.walletName,
    walletIcon: data.chain.image,
    walletChain: data.chain.name,
    walletAddress: data.walletAddress.address,
    request: "",
  }));
  console.log(myWalletFilter);

  const [addressList, setAddressList] = useState(myWalletFilter);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage")
  );
  const [userName, setUserName] = useState(localStorage.getItem("nickname"));
  const [editWalletId, setEditWalletId] = useState(-1);
  const [walletNameValue, setWalletNameValue] = useState("");
  const [walletAddressValue, setWalletAddressValue] = useState("");
  const [walletIconValue, setWalletIconValue] = useState("");
  const [introductionValue, setIntroductionValue] = useState(
    localStorage.getItem("introduce")
  );
  const [addClick, setAddClick] = useState(false);
  const [iconChangeClick, setIconChangeClick] = useState(false);
  const history = useNavigate();
  const [editProfileImage, setEditProfileImage] = useState(false);
  const [sendWalletList, setSendWalletList] = useState([]);
  const [currentRequest, setCurrentRequest] = useState("patch"); //add, patch, delete
  const [addWalletIndex, setAddWalletIndex] = useState(0);
  // const [userInfo, setUserInfo] = useState({});

  // useEffect(async () => {
  //   console.log(localStorage.getItem("nickname"));
  //   const userInfoResult = await getUserpage(localStorage.getItem("nickname"));
  //   if (userInfoResult.data.isSuccess == true) {
  //     console.log(userInfoResult.data.result);
  //     console.log("here");
  //     setUserInfo(userInfoResult.data.result);
  //   }
  //   setUserInfo(userInfoResult.data.result);
  //   setAddressList(getInfo.wallets);
  //   setUserName(getInfo.user.id);
  //   setIntroductionValue(getInfo.user.introduction);
  //   setProfileImage(getInfo.user.profileImage);
  //   //result.badges, result.user, result.wallets
  // }, []);

  useEffect(() => {}, [addClick]);

  const addAddressButtonOnClick = () => {
    var tmpAddressList = addressList;
    var tmpSendWalletList = sendWalletList; // api로 보낼 지갑리스트(변경사항 있는 애들 array)
    var pushData = {
      walletAddIndex: addWalletIndex,
      walletName: "",
      walletIcon: IconList[1].iconImg,
      walletChain: IconList[1].iconName,
      walletAddress: "",
      walletType: "Metamask",
      request: "add",
    };
    setAddWalletIndex(addWalletIndex+1);
    tmpAddressList.push(pushData);
    // tmpSendWalletList.push(pushData);
    setCurrentRequest("add");
    console.log(tmpAddressList);
    setAddressList(tmpAddressList);
    setSendWalletList(tmpSendWalletList);
    console.log(addressList);
    setAddClick(!addClick);
    setEditWalletId(tmpAddressList.length - 1);
  };

  const submitButtonOnClick = async () => {
    // localStorage.setItem("nickname", userName);
    localStorage.setItem("introduce", introductionValue);
    localStorage.setItem("currentWalletName", walletNameValue);
    localStorage.setItem("currentWalletIcon", WalletIcon);
    // localStorage.setItem("myWalletList", JSON.stringify(addressList));

    const formData = new FormData();
    if (editProfileImage) {
      console.log(editProfileImage);
      formData.append("imageFile", profileImage.file[0]);

      console.log("formdata check");
      console.log(profileImage.file);
      console.log(formData);

      localStorage.setItem("profileImage", profileImage.imagePreviewUrl);

      // history("/mypage", { state: { isWelcome: false } }); // 이건 api 연결 안됐을 때 임시로

      //body에 formData 담아서 보내기
    } else {
    }
    const userInfoValue = {
      userToken: localStorage.getItem("token"),
      userInfo: {
        preId: localStorage.getItem("nickname"),
        changedId: userName,
        // profileImage: profileImage.file, 이거이거.
        // profileImage: formData,
        introduction: introductionValue,
        url: `https://0xpersona/${userName}`,
      },
      wallets: sendWalletList,
    };

    var formdata = new FormData();
    formdata.append("profileImageChanged", editProfileImage ? 1 : 0);
    if (editProfileImage) {
      formdata.append("newProfileImage", profileImage.imagePreviewUrl, "0.png");
    } else {
      formdata.append("newProfileImage", "");
    }

    console.log(formdata);

    formdata.append("json", JSON.stringify(userInfoValue));
    console.log(JSON.stringify(userInfoValue));

    const editProfileResult = await editProfile(formdata);

    localStorage.setItem("nickname", userName);

    onClose();
    // history("/mypage", { state: { isWelcome: false } });
    // window.location.href = "/mypage";
  };

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    // if (hiddenFileInput && hiddenFileInput.current) {
    hiddenFileInput.current.click();
    // }
    console.log("??");
  };

  const handleChange = (event) => {
    console.log("hello");
    let reader = new FileReader();
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setProfileImage({ file: fileUploaded, imagePreviewUrl: fileUploaded });
    reader.onloadend = () => {
      // console.log(reader.result)
      setProfileImage({ file: fileUploaded, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(fileUploaded);
    setEditProfileImage(true);
    // setProfileImage(fileUploaded)
    // props.handleFile(fileUploaded);
  };

  const IconButtonOnClick = (iconIndex, walletIndex) => {
    console.log(iconIndex);
    console.log(walletIndex);
    let tmpWalletList = addressList;
    let tmpValue = {
      walletAddIndex: tmpWalletList[walletIndex].walletAddIndex,
      walletIndex: tmpWalletList[walletIndex].walletIndex,
      walletName: walletNameValue,
      walletIcon: IconList[iconIndex].iconImg,
      walletChain: IconList[iconIndex].iconName,
      walletAddress: walletAddressValue,
      request: "",
    };

    tmpWalletList[walletIndex] = tmpValue;
    setAddressList(tmpWalletList);
    setIconChangeClick(false);
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
              <TitleBox>Edit Profile</TitleBox>
              <ProfileImageButtonContainer>
                {profileImage.imagePreviewUrl ? (
                  <ProfileImageButton
                    onClick={handleClick}
                    style={{
                      backgroundImage: `url(${profileImage.imagePreviewUrl})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                ) : (
                  <ProfileImageButton
                    onClick={handleClick}
                    style={{
                      backgroundImage: `url(${profileImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                    }}
                  />
                )}
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  style={{ display: "none" }}
                />
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
                  https://www.daoon.com/
                  {userName ? <>{userName}</> : <>username</>}
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
                              {iconChangeClick ? (
                                <WalletIconSelectBox>
                                  <IconContainer>
                                    {IconList.map((item, iconIndex) => (
                                      <IconButton
                                        style={{
                                          backgroundImage: `url(${item.iconImg})`,
                                        }}
                                        onClick={() =>
                                          IconButtonOnClick(iconIndex, index)
                                        }
                                      />
                                    ))}
                                  </IconContainer>
                                </WalletIconSelectBox>
                              ) : (
                                <></>
                              )}
                              <EditButton
                                onClick={() => {
                                  let tmpWalletList = addressList;
                                  let tmpSendWalletList = sendWalletList;
                                  let tmpValue = {
                                    walletAddIndex:
                                      tmpWalletList[editWalletId]
                                        .walletAddIndex,
                                    walletIndex:
                                      currentRequest == "add"
                                        ? -1
                                        : tmpWalletList[editWalletId]
                                            .walletIndex,
                                    walletName: walletNameValue,
                                    walletIcon:
                                      tmpWalletList[editWalletId].walletIcon,
                                    walletChain:
                                      tmpWalletList[editWalletId].walletChain,
                                    walletAddress: walletAddressValue,
                                    walletType: "Metamask",
                                    request: currentRequest,
                                  };
                                  if(tmpWalletList[editWalletId].walletAddIndex >= 0 && currentRequest == "patch"){// 지금 세션에서 추가했다가 수정하는 애라면
                                    let editIndex = tmpSendWalletList.findIndex((ele)=>ele.walletAddIndex == tmpWalletList[editWalletId].walletAddIndex && ele.request == "add");
                                    tmpSendWalletList[editIndex].walletName = walletNameValue;
                                    tmpSendWalletList[editIndex].walletAddress = walletAddressValue;
                                    tmpSendWalletList[editIndex].walletIcon = tmpWalletList[editWalletId].walletIcon;
                                    tmpSendWalletList[editIndex].walletChain = tmpWalletList[editWalletId].walletChain;
                                    tmpSendWalletList[editIndex].request = "add";
                                  }else{
                                    tmpSendWalletList.push(tmpValue);
                                  }
                                  tmpWalletList[editWalletId] = tmpValue;
                                  setAddressList(tmpWalletList);
                                  setSendWalletList(tmpSendWalletList);
                                  setEditWalletId(-1);
                                  setWalletAddressValue("");
                                  setWalletNameValue("");
                                  setWalletIconValue("");
                                  setCurrentRequest("patch");
                                }}
                              >
                                <BsCheckLg />
                              </EditButton>
                              <EditIconChangeButton
                                onClick={() =>
                                  setIconChangeClick(!iconChangeClick)
                                }
                              >
                                <WalletIconImage src={item.walletIcon} />
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
                                  let tmpSendWalletList = sendWalletList;
                                  let currentWallet = tmpWalletList[index];
                                  if (currentWallet.walletIndex > 0) { // 이미 Db에 있는 애들
                                    tmpSendWalletList.push({
                                      walletAddIndex:
                                        currentWallet.walletAddIndex,
                                      walletIndex: currentWallet.walletIndex,
                                      walletAddress:
                                        currentWallet.walletAddress,
                                      walletName: currentWallet.walletName,
                                      walletType: currentWallet.walletType,
                                      walletChain: currentWallet.walletChain,
                                      request: "delete",
                                    });
                                  } else {
                                    // const isDeleteElement = (ele) => ele.walletAddIndex == currentWallet.walletAddIndex;
                                    // let indexes = tmpSendWalletList.map((ele, idx) => ele.walletAddIndex == currentWallet.walletAddIndex ? idx : '').filter(String);
                                    // 삭제한 지갑의 addindex와 동일한 action들을 찾아 모조리 send 배열에서 지우기
                                    tmpSendWalletList = tmpWalletList.filter(function(item) {
                                      return item.walletAddIndex !== currentWallet.walletAddIndex;
                                    })
                                    // tmpSendWalletList.findIndex(isDeleteElement);
                                  }
                                  tmpWalletList.splice(index, 1);
                                  setAddressList(tmpWalletList);
                                  setSendWalletList(tmpSendWalletList);
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
                                setCurrentRequest("patch");
                              }}
                            >
                              <RiPencilFill />
                            </EditButton>
                            <IconChangeButton>
                              <WalletIconImage src={item.walletIcon} />
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
                  The wallet addresses you wrote here will be displayed on your
                  page.
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
                <SubmitButton onClick={submitButtonOnClick}>
                  Submit
                </SubmitButton>
              </InputContainer>
            </TopContainer>
            <CloseButton onClick={closeOnClick}>
              <RiCloseFill />
            </CloseButton>
          </FullContainer>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

EditProfile.propTypes = {
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

export default EditProfile;
