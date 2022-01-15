import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import { DISCONNECT, SERIES_200 } from '../constant/text';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
        textAlign: 'center'
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
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {SERIES_200}
                </Typography>
                <Button color="inherit">{DISCONNECT}</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;