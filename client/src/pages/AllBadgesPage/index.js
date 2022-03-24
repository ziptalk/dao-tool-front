import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Header from "../../components/Header";
import Badge10 from "../../assets/images/badge10.png";
import Badges from "../../components/AllBadges";
import {getAllBadges} from "../../axios/badges";

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
  const [badgeInfo, setBadgeInfo] = useState([])
  const BadgeInfo = [
    {
      title: "Cripto Robins 31 POAP",
      img: Badge10,
      people: 128,
      joinedAt: "January 02, 2022"
    }
  ];

  useEffect(async()=>{
    const tmpBadgeInfo = await getAllBadges("oldest") // newest, oldest, members
    console.log(tmpBadgeInfo.data.result)
    setBadgeInfo(tmpBadgeInfo.data.result)
  },[])
  return (
    <FullContainer>
      <Header />
      <ContentContainer>
        <Badges badgeInfo={badgeInfo} />
      </ContentContainer>
    </FullContainer>
  );
};

export default AllBadgesPage;
