import React, { useState, useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { useParams } from "react-router";
import "../App.css";
import Header from "../component/Header";
import Drawer from "../component/Drawer";
import Question from "../component/Question/Question";
import { analytics } from "../index";
import { CLOSE_DRAWER, OPEN_DRAWER } from "../constant/analyticsEvents";
import { isMobile } from "../utils/ui";
import { MODULES_COURSES_API } from "../config/api";
import { SOURCES_LIST } from "../constant/data";

function Home() {
  const [drawerOpen, setDrawerOpen] = useState(isMobile() ? false : true);
  const { sourceId } = useParams();
  const [tab, setTab] = useState([]);

  const headerTitle = SOURCES_LIST[sourceId];

  useEffect(() => {
    fetch(MODULES_COURSES_API({ sourceId }))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTab(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sourceId]);

  const toggleDrawer = (drawerState) => {
    if (drawerOpen) {
      logEvent(analytics, CLOSE_DRAWER);
    } else {
      logEvent(analytics, OPEN_DRAWER);
    }
    setDrawerOpen(drawerState);
  };

  return (
    <div>
      <Header
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        title={headerTitle}
      />
      <Drawer
        listItems={tab}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Question drawerOpen={drawerOpen} />
    </div>
  );
}

export default Home;
