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
  color: #FFFFFF;
  font-size: 32px;
  margin-bottom: 80px;
`;


const BadgeGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
`;

const OneBadge = styled.div``;

const JoinedAtText = styled.div`
  width: 100%;
  text-align: center;
  color: #C4C4C4;
  font-family: Roboto Mono;
  font-size: 12px;
  margin-top: 15px;
`;

const BadgeBox = styled.button`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  border: 1px solid #c4c4c4;
  color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    padding-top: 10px;
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.8);
    color: white;
    font-family: NeoDunggeunmo Pro;
    font-size: 27px;
  }
`;

const PeopleNumber = styled.div`
  height: 30px;
  margin: auto 0px;
  margin-top: 15px;
  font-size: 20px;
`;

const PeopleIcon = styled.span`
  margin-right: 3px;
`;

const PeopleNum = styled.span`
  margin-top: -10px;
`;

const Badges = ({ badgeInfo }) => {
  const [userName, setUserName] = useState(localStorage.getItem("nickname"))
  const viewallOnClick = () => {
    window.location.href = "/viewall";
  };
  return (
    <BadgesContainer>
      <TitleBox>
        <BadgesTitle>View All {userName}'s Badges</BadgesTitle>
      </TitleBox>
      <BadgeGroup>
        {badgeInfo.map((item, index) => (
          <OneBadge>
            <BadgeBox style={{ backgroundImage: `url(${item.img})` }}>
              {item.title}
              <PeopleNumber>
                <PeopleIcon>
                  <MdPeopleOutline />
                </PeopleIcon>
                <PeopleNum>{item.people}</PeopleNum>
              </PeopleNumber>
            </BadgeBox>
            <JoinedAtText>{item.joinedAt}</JoinedAtText>
          </OneBadge>
        ))}
      </BadgeGroup>
    </BadgesContainer>
  );
};

export default Badges;
