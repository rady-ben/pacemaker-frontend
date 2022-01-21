import { useState } from 'react';
import {
    useLocation,
    Redirect
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
