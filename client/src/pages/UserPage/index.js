import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Palette from "../../constants/palette";
import Header from "../../components/Header";
import WelcomeModal from "../../components/WelcomeModal";
import SuccessModal from "../../components/SuccessModal";
import AddConnectWalletModal from "../../components/AddConnectWalletModal";
import ProfileBox from "../../components/ProfileBox";
import Badges from "../../components/Badges";
import Badge10 from "../../assets/images/badge10.png";
import { useLocation, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { getDefaultProvider } from "ethers";
import { NftProvider, useNft } from "use-nft";
import TransactionTable from "../../components/TransactionTable/transactionTable";
import { getUserpage } from "../../axios/auth";

// const provider = new ethers.providers.Web3Provider(window.ethereum)
const fetcher = ["ethers", { ethers, provider: ethers.getDefaultProvider() }];

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

const NFTConsole = styled.div`
  margin-top: 30px;
  font-size: 24px;
  color: #ffffff;
  font-family: Roboto Mono;
`;

function NFT() {
  const [badgeInfo, setBadgeInfo] = useState();

  const { loading, error, nft } = useNft(
    // localStorage.getItem("currentWalletAddress"),
    "0xa1Faa8da7fc65ED1FAD43DD9700Ed332A8E20B0f",
    "1146"
  );

  //   const { loading, error, nft } = useNft(
  //     "0xd07dc4262bcdbf85190c01c996b4c06a461d2430", "90473"
  //   )

  useEffect(() => {
    console.log(nft);
    setBadgeInfo(nft);
  }, []);

  // nft.loading is true during load.
  if (loading) {
    console.log(loading);
    return "Loading…";
  }

  // nft.error is an Error instance in case of error.
  if (error) {
    console.log(error.errors);
    return "Error.";
  }

  console.log(nft);

  return (
    <>
      <section>
        <h1>{nft.name}</h1>
        <img src={nft.image} alt="" />
        <p>{nft.description}</p>
      </section>
      <Badges badgeInfo={badgeInfo} />
    </>
  );
}

// We are using the "ethers" fetcher here.
const ethersConfig = {
  provider: getDefaultProvider("homestead"),
};

// Alternatively, you can use the "ethereum" fetcher. Note
// that we are using window.ethereum here (injected by wallets
// like MetaMask), but any standard Ethereum provider would work.
// const fetcher = ["ethereum", { ethereum }]

// Wrap your app with <NftProvider />.
function App({ userid }) {
  return (
    <NftProvider fetcher={["ethers", ethersConfig]}>
      <Nft userid={userid} />
    </NftProvider>
  );
}

// useNft() is now ready to be used in your app. Pass
// the NFT contract and token ID to fetch the metadata.
function Nft({ userid }) {
  const { loading, error, nft } = useNft(
    // "0xd07dc4262bcdbf85190c01c996b4c06a461d2430",
    // "90473"
    // "0x07B0ea6D444B9B66F3A7709FB1fA75BcDCD67A16",
    "0xa1Faa8da7fc65ED1FAD43DD9700Ed332A8E20B0f",
    "1146"
  );

  // nft.loading is true during load.
  if (loading) return <NFTConsole>Loading your NFT list…</NFTConsole>;
  // nft.error is an Error instance in case of error.
  else if (error || !nft) {
    console.log(error);
    console.log(error.errors);
    return <NFTConsole>Error loading NFT list.</NFTConsole>;
  } else {
    console.log(nft);

    const badgeInfo = [
      {
        title: nft.name,
        img: nft.image,
        people: 128,
      },
    ];

    localStorage.setItem("badgeInfo", JSON.stringify(badgeInfo));

    // You can now display the NFT metadata.
    return (
      <>
        <Badges badgeInfo={badgeInfo} userid={userid} />
        {/* <section>
      <h1>{nft.name}</h1>
      <img src={nft.image} alt="" />
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Metadata URL: {nft.metadataUrl}</p>
    </section> */}
      </>
    );
  }
}

const UserPage = () => {
  const navigateState = useLocation().state;
  const { userid } = useParams();
  console.log(userid);
  const [modalVisible, setModalVisible] = useState(true);
  console.log(navigateState);
  const [userInfo, setUserInfo] = useState({
    // nickname: localStorage.getItem("nickname"),
    // walletList: [
    //   {
    //     walletName: "First Ethereum",
    //     walletAddress: localStorage.getItem("currentWalletAddress"),
    //     walletIcon:
    //       "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/4fd1f1fe-5869-43c9-a2bf-cdee14c0e4c38.png",
    //   },
    //   {
    //     walletName: "Second Ethereum",
    //     walletAddress: localStorage.getItem("currentWalletAddress"),
    //     walletIcon:
    //       "https://daotool.s3.ap-northeast-2.amazonaws.com/static/wallet-icon/b9f9b71e-c620-4ccb-b972-63a0bd5bd70c7.png",
    //   },
    // ],
    // // introduce: "Hi, I'm block chain developer. I'm a member of Namu DAO.",
    // introduce: localStorage.getItem("introduce"),
    // todayHits: 211,
    // totalHits: 34052,
    // profileImage: localStorage.getItem("profileImage"),
    //   "https://s3-alpha-sig.figma.com/img/271a/ec5f/909db81709f0488e5612b2abaf79dcea?Expires=1647216000&Signature=VW7ycQjYytN79Fqty6XPPj0el9Crh3N-2NBIUa0AgtKPHbf2VR02p3MMEkk4HKayuND6Zrt7j0L~NQnYcuavK2cKrlo6soWObykWnAVcUF2ST1DlPCRUd7cWEad~fjv0kdlTJupqSGURAudqbZ3-4KPxJgZyBq5gEZe2DWNFHES3BsW8sdN46ROYI~UDs8JdvucS4SOshJWU09HXcPCwqgvvifgEvBx5w3o~aPGP8NI-QyzQUZuJw5Obtb6Y6O2163uiKjMmMn1iWTqrRC1UnoRXSrru6E6oGt6w978T9fz3kVtVpxe0so32CG7gXVF3yJu3BjptPIezJDFebUxdsQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
  });
  console.log("hihi");
  // const [userId, setUserId] = useState(match.params.userid);

  useEffect(async () => {
    console.log(userid);
    const userInfoResult = await getUserpage(userid).then((data)=>{
      console.log(data)
      if (data.data.isSuccess == true) {
        console.log(data.data.result);
        console.log("here");
        setUserInfo(data.data.result);
      } else {
        alert("오류가 발생했습니다!");
      }
    }).catch((error)=>{
      // alert(error)
      alert("존재하지 않는 사용자입니다.")
    })
    
    //result.badges, result.user, result.wallets
  }, []);

  const BadgeInfo = [
    {
      title: "Cripto Robins 31 POAP",
      img: Badge10,
      people: 128,
    },
    {
      title: "Cripto Robins 31 POAP",
      img: Badge10,
      people: 128,
    },
  ];

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <NftProvider fetcher={fetcher}>
      <FullContainer>
        <Header />
        {navigateState ? (
          <>
            {navigateState.isWelcome ? (
              <>
                {modalVisible && (
                  <WelcomeModal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}
                  />
                )}
              </>
            ) : (
              <></>
            )}
            {navigateState.isSuccess ? (
              <>
                {modalVisible && (
                  <SuccessModal
                    visible={modalVisible}
                    closable={true}
                    maskClosable={true}
                    onClose={closeModal}
                    badgeName={navigateState.name}
                    badgeImage={navigateState.img}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <ContentContainer>
          {userInfo.user ? (
            <ProfileBox
              nickname={userInfo.user.id}
              walletList={userInfo.wallets}
              todayHits={userInfo.user.todayHits}
              totalHits={userInfo.user.hits}
              introduce={userInfo.user.introduction}
              profileImage={userInfo.user.profileImage}
              editBool={false}
            />
          ) : (
            <></>
          )}
          {/* <Badges badgeInfo={BadgeInfo} /> */}
          {/* <NFT /> */}
          <App userid={userid} />
          <TransactionTable />
        </ContentContainer>
      </FullContainer>
    </NftProvider>
  );
};

export default UserPage;
