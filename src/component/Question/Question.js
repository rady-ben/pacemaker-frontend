import { useState } from 'react';
import {
    Paper,
    Typography,
    Divider,
    List,
    ListItem,
    Box,
    Button,
    ButtonGroup,
} from '@material-ui/core';
import _ from 'lodash';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
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
    note: {
        width: "100%",
        marginTop: theme.spacing(4),
    },
    synthesisButton: {
        height: 40,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: theme.palette.grey[200],
        borderRadius: 8,
    },
    synthesisButtonText: {
        color: theme.palette.grey[800],
        textTransform: 'none'
    }
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

    const toggleValidation = () => {
        setValidated(!validated)
    }

    const validateResponses = () => {
        const valide =propositions.find((proposition)=>(
            (proposition.status==='success' && !proposition.checked)
            || (proposition.status==='error' && proposition.checked)
        ))
        return _.isEmpty(valide);
    }

    return (
        <>
        <div className={classes.toolbar} />
        <Paper className={classes.container}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography 
                variant="h4"
            >
                Question 1
            </Typography>
            <Button 
                className={classes.synthesisButton}
                startIcon={<FullscreenIcon/>}
            >
                <Typography className={classes.synthesisButtonText}>
                    Synthèse
                </Typography>
            </Button>
        </Box>
        <Divider className={classes.divider} />
        <Typography variant="subtitle1">
            A J4 post-opératolre, on note une insuffisance cardiaque
            gauche algue sur un insuffisance cardiaque chronique et le drain
            donne un écoulement purulent. Qu&#39;en pensez-vous?
        </Typography>
        <Divider className={classes.divider} />
        {
            !validated
            ?null
            :validateResponses()
            ?<Alert severity="success">Réponse juste!</Alert>
            :<Alert severity="error">Réponse fausse!</Alert>
        }
        
        <List>
                {
                    propositions.map((proposition, index) => (
                        <ListItem>
                            <ResponseProposition
                                label={proposition.label}
                                status={validated ? proposition.status : 'default'}
                                checked={proposition.checked}
                                index={index}
                                handleCheckProposition={handleCheckProposition}
                                propositions={propositions}
                            />
                        </ListItem>
                    ))
                }
        </List>
                {validated && <>
                    <Divider className={classes.divider} />
                    <Typography
                        variant="h6"
                    >
                        Commentaire
                    </Typography>
                    <Typography variant="subtitle1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
                    </Typography>
                    <textarea
                        className={classes.note}
                        rows={10}
                        placeholder="Vous pouvez ajoutez vos note ici .."
                    >
                        
                    </textarea>
                </>
                }
        <Divider className={classes.divider} />
        <Box display="flex" justifyContent="space-between" m={1} p={1} bgcolor="background.paper">
            <Button 
                variant="contained"
                color="primary"
                onClick={toggleValidation}
            >
                Valider
            </Button>
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button
                    onClick={validateResponses}
                >
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