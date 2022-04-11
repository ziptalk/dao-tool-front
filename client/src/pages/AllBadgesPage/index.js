import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Header from "../../components/Header";
import Badge10 from "../../assets/images/badge10.png";
import Badges from "../../components/AllBadges";
import { getAllBadges } from "../../axios/badges";

const FullContainer = styled.div`
  min-width: 1440px;
  min-height: 100vh;
  background-color: ${Palette.backgroundColor};
`;

const ContentContainer = styled.div`
  width: calc(100%-260px);
  padding-left: 130px;
  padding-right: 130px;
  //   margin-left: 130px;
  //   margin-right: 130px;
`;

const AllBadgesPage = () => {
  const [badgeInfo, setBadgeInfo] = useState([]);
  const BadgeInfo = [
    {
      title: "Cripto Robins 31 POAP",
      img: Badge10,
      people: 128,
      joinedAt: "January 02, 2022",
    },
  ];

  useEffect(async () => {
    const tmpBadgeInfo = await getAllBadges("oldest"); // newest, oldest, members
    // console.log(tmpBadgeInfo.data.result)
    setBadgeInfo(tmpBadgeInfo.data.result)

    // const tmpBadgeInfo = [
    //   {
    //     name: "DAO_ON_Welcome_badge",
    //     image:
    //       "https://daotool.s3.ap-northeast-2.amazonaws.com/media/badge_img/6aeb8ebb-b56e-418b-88bd-c889f3f585bfFrame+98+(1).png",
    //     createdAt: "2022-03-24T22:31:16.000+00:00",
    //     joinedWalletCount: 0,
    //   },
    //   {
    //     name: "FLEX_NFT_holder",
    //     image:
    //       "https://daotool.s3.ap-northeast-2.amazonaws.com/media/badge_img/8d077476-e78d-4752-ad21-b8b0e9844c8cimage+43.png",
    //     createdAt: "2022-03-24T22:36:12.000+00:00",
    //     joinedWalletCount: 0,
    //   },
    // ];

    // setBadgeInfo(tmpBadgeInfo);
  }, []);
  return (
    <FullContainer>
      <Header />
      <ContentContainer>
        {badgeInfo ? <Badges badgeInfo={badgeInfo} /> : <></>}
      </ContentContainer>
    </FullContainer>
  );
};

export default AllBadgesPage;
