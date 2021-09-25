import { useState, useEffect } from 'react';
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
import { useParams } from 'react-router';
import { useStore } from '../../store/Store';
import { DRAWER_WIDTH } from '../../constant/ui';
import ResponseProposition from './ResponseProposition';
import CustomModal from '../Modal';
import { QUESTIONS_API } from '../../config/api';



const modalTitle = "synthèse du cours";
const modalContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.`;


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
    },
    modalContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        maxHeight: '80vh',
        position: 'absolute',
        width: '50%',
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto'
    },
}));

const Question = () => {
    const classes = useStyles();
    const [validated, setValidated] = useState(false);
    const [showSynthesis, setShowSynthesis] = useState(false);
    const [synthesis, setSynthesis] = useState('');
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(0);
    const [propositions, setPropositions] = useState([]);
    const [globalState] = useStore();

    const { moduleId, courseId } = useParams();
    const URL = QUESTIONS_API({
        moduleId, courseId  
    });
    let questionsString =''
    let propositionsString =''
    let questionString=''

    useEffect(() => {
        fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setQuestions([...data.questions])
                questionsString = JSON.stringify([...data.questions])
                const tab = [...data?.questions[questionIndex]?.propositions].map(
                    (proposition)=>({
                        ...proposition,
                        label: proposition?.content,
                        status: proposition?.is_correct ? 'success' : 'error',
                        checked: false,
                    })
                );
                setQuestion({...data.questions[questionIndex]})
                setPropositions(tab)
                setSynthesis(data?.synthesis)
                propositionsString = JSON.stringify(tab)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [moduleId, courseId, questionsString, propositionsString, synthesis, questionIndex, questionString]);


    const toggleModal = () => {
        setShowSynthesis(!showSynthesis)
    }

    const handleCheckProposition = ({ index, checked }) => {
        let tab = propositions;
        tab[index].checked = checked;
        setPropositions([...tab]);
    }

    const toggleValidation = () => {
        setValidated(!validated)
    }

    const validateResponses = () => {
        const valide = propositions.find((proposition) => (
            (proposition.status === 'success' && !proposition.checked)
            || (proposition.status === 'error' && proposition.checked)
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
                        {`Question ${questionIndex+1}`}
                    </Typography>
                    <Button
                        className={classes.synthesisButton}
                        startIcon={<FullscreenIcon />}
                        onClick={toggleModal}
                    >
                        <Typography className={classes.synthesisButtonText}>
                            Synthèse
                        </Typography>
                    </Button>
                </Box>
                <Divider className={classes.divider} />
                <Typography variant="subtitle1">
                    {
                        question?.content
                    }
                </Typography>
                <Divider className={classes.divider} />
                {
                    !validated
                        ? null
                        : validateResponses()
                            ? <Alert severity="success">Réponse juste!</Alert>
                            : <Alert severity="error">Réponse fausse!</Alert>
                }

                <List>
                    {
                        propositions.map((proposition, index) => (
                            <ListItem>
                                <ResponseProposition
                                    label={proposition?.label}
                                    status={validated ? proposition?.status : 'default'}
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
                        {
                            question?.comment
                        }
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
                            onClick={()=>{
                                setQuestionIndex(questionIndex-1)
                            }}
                            disabled={questionIndex===0}
                        >
                            Precedant
                        </Button>
                        <Button
                            onClick={() => {
                                setQuestionIndex(questionIndex+1)
                            }}
                            disabled={questionIndex===questions?.length-1}
                        >
                            Suivant
                        </Button>
                    </ButtonGroup>
                </Box>
            </Paper>
            <CustomModal 
                showSynthesis={showSynthesis}
                toggleModal={toggleModal}
                modalTitle={modalTitle}
                modalContent={synthesis}
            />
        </>
    );
}

export default Question;