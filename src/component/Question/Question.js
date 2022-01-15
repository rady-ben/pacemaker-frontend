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
    CircularProgress,
} from '@material-ui/core';
import _ from 'lodash';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { DRAWER_WIDTH } from '../../constant/ui';
import ResponseProposition from './ResponseProposition';
import CustomModal from '../Modal';
import { QUESTIONS_API } from '../../config/api';
import { QUESTION, SYNTHESIS, CORRECT_ANSWER, WRONG_ANSWER, COMMENT, PERSONAL_COMMENT_PLACEHOLDER, VALIDATE, NEXT, PREVIOUS } from '../../constant/text';

const modalTitle = "synthèse du cours";

const useStyles = makeStyles((theme) => ({
    circularProgressContainer:{
       height: '100vh',
       width: '100%',
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'flex-start',
       marginTop: 50,
    },
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
    const { moduleId, courseId, questionId } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [validated, setValidated] = useState(false);
    const [showSynthesis, setShowSynthesis] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [synthesis, setSynthesis] = useState('');
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState(Number(questionId)-1);
    const [propositions, setPropositions] = useState([]);

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
                setIsLoading(false);
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
                setQuestionIndex(Number(questionId)-1)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [moduleId, courseId, questionsString, propositionsString, synthesis, questionIndex, questionString, isLoading, questionId]);


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
    if (isLoading) {
        return(
            <>
                <div className={classes.toolbar} />
                <div
                    className={classes.circularProgressContainer}
                >
                    <CircularProgress />
                </div>
            </>
        )
    }

    return (
        <>
            <div className={classes.toolbar} />
            <Paper className={classes.container}>
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                    <Typography
                        variant="h4"
                    >
                        {`${QUESTION} ${questionIndex+1}`}
                    </Typography>
                    <Button
                        className={classes.synthesisButton}
                        startIcon={<FullscreenIcon />}
                        onClick={toggleModal}
                    >
                        <Typography className={classes.synthesisButtonText}>
                            {SYNTHESIS}
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
                            ? <Alert severity="success">{CORRECT_ANSWER}</Alert>
                            : <Alert severity="error">{WRONG_ANSWER}</Alert>
                }

                <List>
                    {
                        propositions.map((proposition, index) => (
                            <ListItem
                                key={index}
                            >
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
                    {question?.comment &&
                        <>
                            <Divider className={classes.divider} />
                            <Typography
                                variant="h6"
                            >
                                {COMMENT}
                            </Typography>
                            <Typography variant="subtitle1">
                                {question?.comment}
                            </Typography>
                        </>
                    }
                    {/* <textarea
                        className={classes.note}
                        rows={10}
                        placeholder={PERSONAL_COMMENT_PLACEHOLDER}
                    >

                    </textarea> */}
                </>
                }
                <Divider className={classes.divider} />
                <Box display="flex" justifyContent="space-between" m={1} p={1} bgcolor="background.paper">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={toggleValidation}
                    >
                        {VALIDATE}
                    </Button>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button
                            onClick={()=>{
                                setQuestionIndex(questionIndex-1)
                                setValidated(false);
                                history.push(`/${moduleId}/${courseId}/${Number(questionId)-1}`)
                            }}
                            disabled={questionIndex===0}
                        >
                            {PREVIOUS}
                        </Button>
                        <Button
                            onClick={() => {
                                setQuestionIndex(questionIndex+1)
                                setValidated(false);
                                history.push(`/${moduleId}/${courseId}/${Number(questionId)+1}`)
                            }}
                            disabled={questionIndex===questions?.length-1}
                        >
                            {NEXT}
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