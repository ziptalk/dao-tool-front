import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Header from "../../components/Header";
import Badge10 from "../../assets/images/badge10.png";
import WelcomeBadge from "../../assets/images/WelcomeBadge.png";
import Badges from "../../components/ViewAllBadges";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TmpIcon from "./xDAI.png";
import { IoWallet } from "react-icons/io5";
import { GrDownload } from "react-icons/gr";
import MembersTable from "./memberTable";
import { getBadgeDetail } from "../../axios/badges";

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
  align-items: left;
  text-align: left;
  position: relative;
`;

const BadgeInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  //   width: 1184px;
  width: 100%;
`;

const BadgeInfoBoxLeft = styled.div`
  display: flex;
`;

const BadgeTextInfoBox = styled.div`
  margin-left: 24px;
  margin-top: 5px;
`;

const BadgeTextInfoUpper = styled.div`
  display: flex;
  justify-content: left;
  margin-bottom: 5px;
`;

const BadgeTextInfoLower = styled.div`
  display: flex;
  justify-content: left;
`;

const TitleBox = styled.div`
  //   margin: 0px auto;
  margin-top: 0px;
`;

const TitleText = styled.div`
  font-family: NeoDunggeunmo Pro;
  font-size: 48px;
  color: #ffffff;
`;

const BadgeImage = styled.img`
  width: 100px;
  height: 100px;
`;

const PeopleBox = styled.div`
  font-size: 20px;
  margin-top: 20px;
  color: #c4c4c4;
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-left: 6px;
`;

const PeopleIcon = styled.div`
  margin-top: -3px;
`;

const PeopleNumber = styled.div`
  font-size: 18px;
  color: #c4c4c4;
  font-family: NeoDunggeunmo Pro;
`;

const TargetBox = styled.div`
  width: 113px;
  padding: 5px 0px 6px 0px;
  text-align: center;
  border-radius: 100px;
  background-color: rgba(255, 113, 113, 0.2);
  color: #ffffff;
  font-family: Roboto Mono;
  font-size: 16px;
  font-weight: bold;
  margin-top: 36px;
`;

const DescriptionBox = styled.div`
  //   margin: 0px auto;
  margin-top: 20px;
  padding: 18px;
  text-align: left;
  width: calc(100% - 36px);
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  font-size: 16px;
  line-height: 21px;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;

const FinishButton = styled.button`
  width: 187px;
  height: 42px;
  border-radius: 21px;
  border: 0;
  background-color: #4673e9;
  color: #ffffff;
  font-family: NeoDunggeunmo Pro;
  font-size: 18px;
  margin-top: 30px;
  align-items: right;
  // position: absolute;
`;

const ChainBox = styled.div`
  height: 32px;
  background-color: #000000;
  border-radius: 16px;
  display: flex;
  margin-right: 10px;
`;

const ChainIconImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-top: 4px;
  margin-left: 4px;
`;

const ChainName = styled.div`
  color: #ffffff;
  font-family: Roboto Mono;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
  margin-top: 7px;
  margin-right: 10px;
`;

const JoinedAtText = styled.div`
  color: #c4c4c4;
  font-family: Roboto Mono;
  font-size: 12px;
  margin-top: 8px;
  margin-right: 27px;
`;

const BadgeDetailPage = () => {
  const navigate = useLocation().state;
  const history = useNavigate();
  const { name } = useParams();
  console.log(name);
  console.log(navigate);
  const [badgeInfo, setBadgeInfo] = useState({});
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("currentWalletAddress")
  );

  useEffect(async () => {
    // const tmpBadgeInfo = await getAllBadges("oldest"); // newest, oldest, members
    // console.log(tmpBadgeInfo.data.result);

    // const tmpInfo = tmpBadgeInfo.data.result;
    const getBadgeDetailResult = await getBadgeDetail(name);
    console.log("here!!")
    console.log(getBadgeDetailResult)
    const tmpInfo = [
      {
        name: "DAO_ON_Welcome_badge",
        image:
          "https://daotool.s3.ap-northeast-2.amazonaws.com/media/badge_img/6aeb8ebb-b56e-418b-88bd-c889f3f585bfFrame+98+(1).png",
        createdAt: "2022-03-24T22:31:16.000+00:00",
        joinedWalletCount: 0,
      },
      {
        name: "FLEX_NFT_holder",
        image:
          "https://daotool.s3.ap-northeast-2.amazonaws.com/media/badge_img/8d077476-e78d-4752-ad21-b8b0e9844c8cimage+43.png",
        createdAt: "2022-03-24T22:36:12.000+00:00",
        joinedWalletCount: 0,
      },
    ];

    const badgeImage = tmpInfo[tmpInfo.findIndex((x) => x.name == name)].image;
    // badgeInfo불러오기
    setBadgeInfo({
      name: name.replaceAll("_", " "),
      img: badgeImage,
      description: (
        <>
          This is a welcome badge given to users of DAO Tool.
          <br />
          This badge is given to all wallet addresses registered by the user,
          and all users of DAO Tool can be explored in the badge details.
          <br />
          Please Enjoy!
        </>
      ),
      people: 128,
      target: "Everyone",
      chainIcon: TmpIcon,
      chainName: "xDAI",
      createdAt: "March 25, 2022",
    });
  }, []);

  const finishOnClick = () => {
    history("/mypage", {
      state: { isSuccess: true, name: badgeInfo.name, img: badgeInfo.img },
    });
  };
  return (
    <FullContainer>
      <Header />
      <ContentContainer>
        <BadgeInfoBox>
          <BadgeInfoBoxLeft>
            <BadgeImage src={badgeInfo.img} />
            <BadgeTextInfoBox>
              <BadgeTextInfoUpper>
                <ChainBox>
                  <ChainIconImage src={badgeInfo.chainIcon} />
                  <ChainName>{badgeInfo.chainName}</ChainName>
                </ChainBox>
                <JoinedAtText>{badgeInfo.createdAt} Created</JoinedAtText>
              </BadgeTextInfoUpper>
              <BadgeTextInfoLower>
                <TitleBox>
                  <TitleText>{badgeInfo.name}</TitleText>
                </TitleBox>
                <PeopleBox>
                  <PeopleIcon>
                    <IoWallet />
                  </PeopleIcon>
                  <PeopleNumber>{badgeInfo.people}</PeopleNumber>
                </PeopleBox>
              </BadgeTextInfoLower>
            </BadgeTextInfoBox>
          </BadgeInfoBoxLeft>
          <FinishButton onClick={finishOnClick}>Get This Badge</FinishButton>
        </BadgeInfoBox>

        <TargetBox>{badgeInfo.target}</TargetBox>
        <DescriptionBox>{badgeInfo.description}</DescriptionBox>

        <MembersTable />
      </ContentContainer>
    </FullContainer>
  );
};

export default BadgeDetailPage;
