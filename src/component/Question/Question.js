import { useState } from 'react';
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




const defaultPropositions = [
    {
        label: 'Proposiont 1 (correct)',
        status: 'success',
        checked: false,
    },
    {
        label: 'Proposiont 2 (error)',
        status: 'error',
        checked: false,
    },
    {
        label: 'Proposiont 3 (correct)',
        status: 'success',
        checked: false,
    },
    {
        label: 'Proposiont 4 (error)',
        status: 'error',
        checked: false,
    },
    {
        label: 'Proposiont 5 (error)',
        status: 'error',
        checked: false,
    },
    {
        label: 'Proposiont 6 (correct)',
        status: 'success',
        checked: false,
    },
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
    const [validated, setValidated] = useState(false);
    const [propositions, setPropositions] = useState(defaultPropositions);

    const handleCheckProposition = ({ index, checked }) => {
        let tab = propositions;
        tab[index].checked=checked;
        setPropositions([...tab]);
    }

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
                    propositions.map((proposition, index) => (
                        <ListItem>
                            <ResponseProposition
                                label={proposition.label}
                                status={proposition.status}
                                checked={proposition.checked}
                                index={index}
                                handleCheckProposition={handleCheckProposition}
                                propositions={propositions}
                            />
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
                <Button>
                    Precedant
                </Button>
                <Button>Suivant</Button>
            </ButtonGroup>
      </Box>
      </Paper>
      </>
    );
}

export default Question;