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
import { IntroPage, MyPage, ViewAllPage, AllBadgesPage, GetBadgePage, UserPage, BadgeDetailPage } from "./pages";
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
        <title>다오툴</title>
        <link rel="icon" href={favicon} />
        {/* <AdSense.Google
          client="ca-pub-3891344306400800"
          slot="9878253899"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
          <Route exact path="/badgeDetail/:name" element={<BadgeDetailPage/>} /> 
          <Route path="/:userid" element={<UserPage />} />
          {/* </Routes>
          </Suspense> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
