import { useState } from 'react';
import {
    useLocation,
    Redirect
} from "react-router-dom";
import { logEvent } from "firebase/analytics";
import '../App.css';
import Header from '../component/Header';
import Drawer from '../component/Drawer';
import Question from '../component/Question/Question';
import { useStore } from '../store/Store';
import { analytics } from '../index';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../constant/analyticsEvents';
import { isMobile } from '../utils/ui';


function Home() {
    const [drawerOpen, setDrawerOpen] = useState(isMobile() ? false : true);
    const [globalState] = useStore();
    const location = useLocation();

    const toggleDrawer = (drawerState) => {
        if (drawerOpen) {
            logEvent(analytics, CLOSE_DRAWER);
        } else {
            logEvent(analytics, OPEN_DRAWER);
        }
        setDrawerOpen(drawerState);
    }

    if (location.pathname === '/') {
        if (globalState?.modules[0]?.id && globalState?.modules[0]?.courses[0]?.id){
            return <Redirect to={`${globalState?.modules[0]?.id}/${globalState?.modules[0]?.courses[0]?.id}/1`} />
        }
    }
    
    return (
        <div>
            <Header
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
            />
            <Drawer
                listItems={globalState.modules}
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
            />
            <Question drawerOpen={drawerOpen} />
        </div>
    );
}

export default Home;
