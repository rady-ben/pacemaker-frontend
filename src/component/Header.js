import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@mui/material';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import MenuIcon from '@mui/icons-material/Menu';
import { HOME, SERIES_200 } from '../constant/text';
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
    disconnectButton: {
        color: theme.palette.primary.contrastText,
    }
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
                <Link
                    to={`/`}
                    style={{ textDecoration: "none" }}
                >
                    <Button className={classes.disconnectButton}>
                        {HOME}
                    </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Header;