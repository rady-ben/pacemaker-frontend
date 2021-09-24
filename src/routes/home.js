import { useState } from 'react';
import {
    useLocation
} from "react-router-dom";
import '../App.css';
import Header from '../component/Header';
import Drawer from '../component/Drawer';
import Question from '../component/Question/Question';
import { useStore } from '../store/Store';

function Home() {
    const [drawerOpen, toggleDrawer] = useState(false);
    const [globalState] = useStore();
    const location = useLocation();
    console.log(location.pathname);

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
            <Question />
        </div>
    );
}

export default Home;
