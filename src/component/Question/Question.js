import {
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    Box,
    Button,
    ButtonGroup
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from '../../constant/ui';
import ResponseProposition from './ResponseProposition';

const propositions = [
    'Proposiont 1',
    'Proposiont 2',
    'Proposiont 3',
    'Proposiont 4',
    'Proposiont 5',
    'Proposiont 6',
  ]

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            marginLeft: theme.spacing(4) + DRAWER_WIDTH,
            marginRight: theme.spacing(4),
        },
        padding: theme.spacing(2)
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
}));

const Question = () => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.toolbar} />
        <Paper className={classes.container}>
        <Typography 
            variant="h4"
        >
            Question 1
        </Typography>
        <Divider className={classes.divider} />
        <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Divider className={classes.divider} />
        <List>
                {
                    propositions.map((text) => (
                        <ListItem>
                            <ResponseProposition label={text} />
                        </ListItem>
                    ))
                }
        </List>
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="space-between" m={1} p={1} bgcolor="background.paper">
            <Button variant="contained" color="primary">
                Valider
            </Button>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>Precedant</Button>
                <Button>Suivant</Button>
            </ButtonGroup>
      </Box>
      </Paper>
      </>
    );
}

export default Question;