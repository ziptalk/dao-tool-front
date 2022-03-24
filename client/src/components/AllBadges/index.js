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
  background-color: transparent;
`;

const JoinedAt = styled.div`
  width: 100%;
  text-align: right;
`;

const JoinedAtText = styled.div`
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
  width: 100%;
  text-align: right;
  // margin: auto 0px;
  margin-top: 15px;
  display: flex;
  justify-content: right;
  font-size: 18px;
  color: #c4c4c4;
  font-family: NeoDunggeunmo Pro;
`;

const PeopleIcon = styled.span`
  margin-right: 3px;
  margin-top: -1px;
  height: 50px;
`;

const PeopleNum = styled.span`
  margin-right: 22px;
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
  height: 100%;
  margin-left: 18px;
  display: flex;
`;

const BadgeNameBoxText = styled.div`
  margin: auto 0px;
  width: 100%;
  font-family: NeoDunggeunmo Pro;
  font-size: 32px;
  color: #ffffff;
  word-break: keep-all;
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
          <OneBadge onClick={()=>{window.location.href=`/badgeDetail/${item.name}`}}>
            <PeopleNumber>
              <PeopleIcon>
                <MdPeopleOutline />
              </PeopleIcon>
              <PeopleNum>{item.joinedWalletCount}</PeopleNum>
            </PeopleNumber>
            <ContentBox>
              {/* <BadgeBox
                style={{ backgroundImage: `url(${item.image})` }}
              ></BadgeBox> */}
              <img src={item.image} />
              <BadgeNameBox>
                <BadgeNameBoxText>{item.name.replaceAll('_', ' ')}</BadgeNameBoxText>
              </BadgeNameBox>
            </ContentBox>
            <JoinedAt>
              <JoinedAtText>
                {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
                  Date.parse(item.createdAt)
                )}{" "}
                {new Date(item.createdAt).getDate()},{" "}
                {new Date(item.createdAt).getFullYear()} Created
              </JoinedAtText>
            </JoinedAt>
          </OneBadge>
        ))}
      </BadgeGroup>
    </BadgesContainer>
  );
};

export default Badges;
