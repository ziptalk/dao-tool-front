import React, { useEffect } from "react";
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
//import CloseButton from './CloseButton'
// import ClosebtnIcon from "../images/common/close1.png"

function SuccessModal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  badgeName,
  badgeImage
}) {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  //   const currentUserpage = children[0]+children[1];
  //   const currentUserId = children[1];

  const handleCopyClipBoard = async (text) => {
    var textarea = document.createElement("textarea");
    textarea.value = text; // 복사할 메시지
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, 9999); // For IOS
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("링크 복사 완료!");
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
          <ContentContainer>
            <PopupTitle>🎉 Success!</PopupTitle>
            <DescriptionBox>
              You got a "{badgeName}".
            </DescriptionBox>
            <SmallDescription>
            If you want more badges, find and add them in the "all badges" tab.
            </SmallDescription>
            <BadgeImage src={badgeImage} />
            <BadgeTitle>{badgeName}</BadgeTitle>
            <BottomButton onClick={goDashboardOnClick}>Go to Dashboard</BottomButton>
            <CloseButton onClick={closeOnClick}>
              <RiCloseFill />
            </CloseButton>
          </ContentContainer>

          <Confetti
            width={540}
            height={420}
            numberOfPieces={50}
            gravity={0.05}
          />
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

SuccessModal.propTypes = {
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
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 1);
  border-radius: 15px;
  width: 540px;
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
  height: 420px;
  border: none;
  border-radius: 20px;
  // background-color: rgba(0, 0, 0, 0.5);
  background-color: #333333;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 5;
`;

const PopupTitle = styled.div`
  border: none;
  background-color: transparent;
  margin: 0 auto;
  padding-top: 50px;
  color: #ffffff;
  font-size: 32px;
  font-family: NeoDunggeunmo Pro;
  font-weight: 400;
  margin-bottom: 18px;
`;

const DescriptionBox = styled.div`
  margin: 0 auto;
  font-family: Roboto Mono;
  font-weight: regular;
  font-size: 16px;
  color: #ffffff;
`;

const SmallDescription = styled.div`
  margin: 0 auto;
  font-family: Roboto Mono;
  font-weight: 400;
  font-size: 12px;
  color: #C4C4C4;
  margin-bottom: 30px;
  margin-top: 4px;
`

const BadgeImage = styled.img`
  margin: 0 auto;
  width: 100px;
  z-index: 5;
`;

const BadgeTitle = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  font-family: NeoDunggeunmo Pro;
  font-size: 21px;
  font-weight: 400;
  color: #ffffff;
  z-index: 5;
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

const BottomButton = styled.button`
  width: 187px;
  height: 42px;
  border-radius: 21px;
  background-color: #4673e9;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  font-size: 18px;
  border: 0px;
  margin-top: 34px;
  position: absolute;
  right: 40px;
  z-index: 5;
  &:hover {
    box-shadow: 0px 4px 15px 0px rgba(70, 115, 233, 0.5);
  }
`;

export default SuccessModal;
