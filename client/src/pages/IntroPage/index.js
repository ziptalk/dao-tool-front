import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Logo from "../../assets/images/DAOLOGO.png";
import LoadingBar from "react-top-loading-bar";
import { WalletList } from "../../components";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${Palette.backgroundColor};
`;

const LogoImage = styled.img`
  width: 440px;
  position: absolute;
`;

const ConnectButtonContainer = styled.div`
  margin-top: 600px;
`;

const ConnectButton = styled.button`
  width: 240px;
  height: 48px;
  border-radius: 24px;
  color: ${Palette.contentColor};
  border: 1px solid ${Palette.contentColor};
  background-color: transparent;
  font-size: 18px;
  font-weight: 400;
  font-family: "NeoDunggeunmo Pro";
`;

const IntroPage = () => {
  const [progress, setProgress] = useState(0);
  const [connectButtonValid, setConnectButtonValid] = useState(false);
  const [openWalletList, setOpenWalletList] = useState(false);

  useEffect(() => {
    setProgress(progress + 100);
  }, []);

  return (
    <ParentContainer>
      {openWalletList ? (
        <>
          <WalletList />
        </>
      ) : (
        <>
          <LogoImage src={Logo} />
          {connectButtonValid ? (
            <>
              <ConnectButtonContainer>
                <ConnectButton
                  onClick={() => {
                    setOpenWalletList(true);
                  }}
                >
                  Connect Wallet
                </ConnectButton>
              </ConnectButtonContainer>
            </>
          ) : (
            <LoadingBar
              color={Palette.contentColor}
              progress={progress}
              shadow={false}
              onLoaderFinished={() => setConnectButtonValid(true)}
              // style={{
              //   width: "327px",
              //   height:"10px"
              // }}
              containerStyle={{
                display: "flex",
                // justifyContent:"center",
                position: "relative",
                top: 80,
                width: "327px",
                height: "10px",
                border: `1px solid ${Palette.contentColor}`,
              }}
            />
          )}
        </>
      )}
    </ParentContainer>
  );
};

export default IntroPage;
