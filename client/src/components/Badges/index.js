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
  font-family: Roboto Mono;
  color: #c4c4c4;
  font-size: 18px;
`;

const ViewAllButton = styled.button`
  border: 0;
  background-color: transparent;
  font-family: Roboto Mono;
  color: #ffffff;
  font-size: 14px;
`;

const BadgeGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
`;

const BadgeBox = styled.button`
  width: 100px;
  height: 100px;
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
    font-size: 17px;
  }
`;

const PeopleNumber = styled.div`
  height: 30px;
  margin: auto 0px;
  margin-top: 15px;
  font-size: 14px;
`;

const PeopleIcon = styled.span`
  margin-right: 3px;
`;

const PeopleNum = styled.span`
  margin-top: -10px;
`;

const Badges = ({ badgeInfo }) => {
  const viewallOnClick = () => {
    window.location.href = "/viewall";
  };
  return (
    <BadgesContainer>
      <TitleBox>
        <BadgesTitle>Badges</BadgesTitle>
        <ViewAllButton onClick={viewallOnClick}>view all</ViewAllButton>
      </TitleBox>
      <BadgeGroup>
        {badgeInfo.map((item, index) => (
          <BadgeBox style={{ backgroundImage: `url(${item.img})` }}>
            {item.title}
            <PeopleNumber>
              <PeopleIcon>
                <MdPeopleOutline />
              </PeopleIcon>
              <PeopleNum>{item.people}</PeopleNum>
            </PeopleNumber>
          </BadgeBox>
        ))}
      </BadgeGroup>
    </BadgesContainer>
  );
};

export default Badges;
