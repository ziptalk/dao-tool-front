import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Header from "../../components/Header";
import Badge10 from "../../assets/images/badge10.png";
import WelcomeBadge from "../../assets/images/WelcomeBadge.png";
import Badges from "../../components/ViewAllBadges";
import { useLocation, useNavigate } from "react-router-dom";
import { MdPeopleOutline } from "react-icons/md";

const FullContainer = styled.div`
  min-width: 1440px;
  min-height: 100vh;
  height: 100%;
  background-color: ${Palette.backgroundColor};
  position: relative;
`;

const ContentContainer = styled.div`
  width: calc(100%-260px);
  padding-left: 130px;
  padding-right: 130px;
  align-items: center;
  text-align: center;
  position: relative;
  //   margin-left: 130px;
  //   margin-right: 130px;
`;

const TitleBox = styled.div`
  margin: 0px auto;
  margin-top: 88px;
  display: flex;
  justify-content: center;
`;

const TitleText = styled.div`
  font-family: NeoDunggeunmo Pro;
  font-size: 48px;
  color: #ffffff;
`;

const BadgeImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 14px;
`;

const PeopleBox = styled.div`
  font-size: 24px;
  margin-top: 10px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

const PeopleNumber = styled.div`
  font-size: 18px;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  margin: auto 0px;
`;

const TargetBox = styled.div`
  margin: 0px auto;
  width: 113px;
  padding: 5px 0px 6px 0px;
  text-align: center;
  border-radius: 100px;
  background-color: rgba(255, 113, 113, 0.2);
  color: #ffffff;
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
`;

const DescriptionBox = styled.div`
  margin: 0px auto;
  margin-top: 20px;
  padding: 18px;
  text-align: center;
  width: 680px;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  font-size: 16px;
  line-height: 21px;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;
const WalletInfoHeadBox = styled.div`
  width: 700px;
  margin: 0px auto;
  margin-top: 70px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const WalletInfoHeadLeft = styled.div`
  font-family: Roboto Mono;
  font-size: 14px;
  color: #ffffff;
`;

const WalletInfoHeadRight = styled.div`
  font-family: Roboto Mono;
  font-size: 12px;
  color: #ffffff;
`;

const AddressBox = styled.div`
  width: 680px;
  padding: 12px 18px 12px 18px;
  border-radius: 5px;
  border: 1px solid #777777;
  color: #ffffff;
  font-family: Roboto Mono;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  // line-height: 18px;
  text-align: left;
  margin: 0px auto;
`;

const SubmentBox = styled.div`
  width: 716px;
  font-family: Roboto Mono;
  font-size: 11px;
  color: #ffffff;
  margin: 0px auto;
  margin-top: 15px;
  text-align: left;
`;

const FinishContainer = styled.div`
  width: 716px;
  display: flex;
  justify-content: right;
  margin: 0px auto;
`;
const FinishButton = styled.button`
  width: 159px;
  height: 48px;
  border-radius: 28px;
  border: 0;
  background-color: #4673e9;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  font-size: 24px;
  margin-top: 83px;
  margin-bottom: 144px;
  align-items: right;
  // position: absolute;
`;
const GetBadgePage = () => {
  const navigate = useLocation().state;
  const history = useNavigate();
  const [badgeInfo, setBadgeInfo] = useState({});
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("currentWalletAddress")
  );

  useEffect(() => {
    if (navigate) {
      if (navigate.badgeId == 1) {
        setBadgeInfo({
          name: "DAO ON Welcome badge",
          img: WelcomeBadge,
          description: (
            <>
              This is a welcome badge given to users of DAO Tool.
              <br />
              This badge is given to all wallet addresses registered by the
              user, and all users of DAO Tool can be explored in the badge
              details.
              <br />
              Please Enjoy!
            </>
          ),
          people: 128,
          target: "Everyone",
        });
      }
    }
  }, []);

  const finishOnClick = () => {
    history("/mypage", { state: {isSuccess: true, name: badgeInfo.name, img: badgeInfo.img}})
  }
  return (
    <FullContainer>
      <Header />
      <ContentContainer>
        <TitleBox>
          <TitleText>{badgeInfo.name}</TitleText>
        </TitleBox>
        <BadgeImage src={badgeInfo.img} />
        <PeopleBox>
          <MdPeopleOutline />
          <PeopleNumber>{badgeInfo.people}</PeopleNumber>
        </PeopleBox>
        <TargetBox>{badgeInfo.target}</TargetBox>
        <DescriptionBox>{badgeInfo.description}</DescriptionBox>
        <WalletInfoHeadBox>
          <WalletInfoHeadLeft>Wallet Address</WalletInfoHeadLeft>
          <WalletInfoHeadRight>
            This badge NFT is based on Ethereum(or BSC).
          </WalletInfoHeadRight>
        </WalletInfoHeadBox>
        <AddressBox>{walletAddress}</AddressBox>
        <SubmentBox>
          1. This should be the wallet address that you want to display
          informations on your personal dashboard. <br />
          2. Please see our SNS for NFT updates.Thanks!
          <br />
          <br />
          contact : blockwavelabs@gmail.com
        </SubmentBox>
        <FinishContainer>
          <FinishButton onClick={finishOnClick}>Finish</FinishButton>
        </FinishContainer>
      </ContentContainer>
    </FullContainer>
  );
};

export default GetBadgePage;
