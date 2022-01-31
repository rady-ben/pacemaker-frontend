import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import clsx from 'clsx';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { DISCONNECT, SERIES_200 } from '../constant/text';
import { DRAWER_WIDTH } from '../constant/ui';

const useStyles = makeStyles((theme) => ({
    contentShift: {
        [theme.breakpoints.up('md')]: {
            marginLeft: DRAWER_WIDTH,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left'
    },
}));

const Header = ({drawerOpen, toggleDrawer}) => {
    const classes = useStyles();

    const innerToggleDrawer = () => {
        toggleDrawer(!drawerOpen)
    }

    return (
        <AppBar>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={innerToggleDrawer}
                    size="large">
                    <MenuIcon />
                </IconButton>
                <Typography 
                    variant="h6" 
                    className={clsx(classes.title, {[classes.contentShift]: drawerOpen})}
                >
                    {SERIES_200}
                </Typography>
                <Button color="inherit">{DISCONNECT}</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;