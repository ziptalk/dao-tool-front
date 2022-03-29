import React, { useEffect, useState, Suspense } from "react";
import "./utils/App.css";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
  useHistory,
  useParams,
} from "react-router-dom";
import {
  IntroPage,
  MyPage,
  ViewAllPage,
  AllBadgesPage,
  GetBadgePage,
  UserPage,
  BadgeDetailPage,
} from "./pages";
import { Helmet } from "react-helmet";
import ReactGA from "react-ga";
import favicon from "./assets/images/favicon.ico";
import AdSense from "react-adsense";

// import logo from './logo.svg';
// import './App.css';

// ReactGA.initialize("UA-187313595-1");

function App() {
  // ReactGA.event({
  //   category: "Enter",
  //   action: "Enter the page",
  // });

  // ReactGA.exception({
  //   description: "An error ocurred",
  //   fatal: true,
  // });

  return (
    <>
      <Helmet>
        <title>0xPERSONA</title>
        <link rel="icon" href={favicon} />
        {/* <AdSense.Google
          client="ca-pub-3891344306400800"
          slot="9878253899"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="og:description"
          content="Crypto wallet으로 나의 PERSONA 만들기 🌎"
        />
        <meta
          name="description"
          content="Crypto wallet으로 나의 PERSONA 만들기 🌎"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://0xPERSONA.xyz" />
        <meta property="og:url" content="https://0xPERSONA.xyz/" />
        <meta property="og:title" content="0xPERSONA" />
        <meta
          property="og:image"
          content="https://daotool.s3.ap-northeast-2.amazonaws.com/static/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-03-25+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+9.58.06.png"
        />
        <meta property="og:site_name" content="0xPERSONA" />
        <meta property="og:locale" content="kor" />
        <meta property="og:image:width" content="537" />
        <meta property="og:image:height" content="286" />
        <meta name="twitter:url" content="https://0xPERSONA.xyz" />
        <meta name="twitter:url" content="https://0xPERSONA.xyz/" />
        <meta
          name="twitter:image"
          content="https://daotool.s3.ap-northeast-2.amazonaws.com/static/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-03-25+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+9.58.06.png"
        />
        <meta name="twitter:title" content="0xPERSONA" />
        <meta
          name="twitter:description"
          content="Crypto wallet으로 나의 PERSONA 만들기 🌎"
        />
      </Helmet>
      <Router>
        <Routes>
          {/* <Suspense fallback={<div>...</div>}>
            <Routes> */}
          <Route exact path="/" element={<IntroPage />} />
          <Route exact path="/mypage" element={<MyPage />} />
          <Route exact path="/viewall" element={<ViewAllPage />} />
          <Route exact path="/allbadges" element={<AllBadgesPage />} />
          <Route exact path="/getbadge" element={<GetBadgePage />} />
          <Route
            exact
            path="/badgeDetail/:name"
            element={<BadgeDetailPage />}
          />
          <Route path="/:userid" element={<UserPage />} />
          {/* </Routes>
          </Suspense> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
