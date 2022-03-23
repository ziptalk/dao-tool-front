import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import { MdPeopleOutline } from "react-icons/md";

const BadgesContainer = styled.div`
  margin-top: 39px;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const BadgesTitle = styled.div`
  font-family: NeoDunggeunmo Pro;
  color: #ffffff;
  font-size: 32px;
  margin-bottom: 80px;
`;

const BadgeGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
`;

const OneBadge = styled.div`
  width: 400px;
  height: 200px;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
`;

const JoinedAtText = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  color: #c4c4c4;
  font-family: Roboto Mono;
  font-size: 12px;
  margin-top: 10px;
  margin-right: 27px;
`;

const BadgeContainer = styled.button`
  width: 400px;
  height: 200px;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  background-color: transparent;
`;

const BadgeBox = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;

const PeopleNumber = styled.div`
  height: 30px;
  margin: auto 0px;
  margin-top: 15px;
  font-size: 18px;
  color: #C4C4C4;
  font-family: NeoDunggeunmo Pro;
`;

const PeopleIcon = styled.span`
  margin-right: 3px;
`;

const PeopleNum = styled.span`
  margin-top: -10px;
`;

const ContentBox = styled.div`
  height: 100px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
`;

const BadgeNameBox = styled.div`
  width: 240px;
  height: 100px;
  margin-left: 18px;
  display: flex;
`;

const BadgeNameBoxText = styled.div`
  margin: auto 0px;
  font-family: NeoDunggeunmo Pro;
  font-size: 32px;
  color: #ffffff;
`;

const Badges = ({ badgeInfo }) => {
  const [userName, setUserName] = useState(localStorage.getItem("nickname"));
  const viewallOnClick = () => {
    window.location.href = "/viewall";
  };
  return (
    <BadgesContainer>
      <TitleBox>
        <BadgesTitle>All Badges</BadgesTitle>
      </TitleBox>
      <BadgeGroup>
        {badgeInfo.map((item, index) => (
          <OneBadge>
            <PeopleNumber>
              <PeopleIcon>
                <MdPeopleOutline />
              </PeopleIcon>
              <PeopleNum>{item.people}</PeopleNum>
            </PeopleNumber>
            <ContentBox>
              <BadgeBox
                style={{ backgroundImage: `url(${item.img})` }}
              ></BadgeBox>
              <BadgeNameBox>
                <BadgeNameBoxText>{item.title}</BadgeNameBoxText>
              </BadgeNameBox>
            </ContentBox>
            <JoinedAtText>{item.joinedAt} Created</JoinedAtText>
          </OneBadge>
        ))}
      </BadgeGroup>
    </BadgesContainer>
  );
};

export default Badges;
