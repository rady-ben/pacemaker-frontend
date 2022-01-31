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
    TextField,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import _ from 'lodash';
import Alert from '@mui/material/Alert';
import makeStyles from '@mui/styles/makeStyles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { DRAWER_WIDTH } from '../../constant/ui';
import ResponseProposition from './ResponseProposition';
import CustomModal from '../Modal';
import { QUESTIONS_API } from '../../config/api';
import { QUESTION, SYNTHESIS, CORRECT_ANSWER, WRONG_ANSWER, COMMENT, PERSONAL_COMMENT_PLACEHOLDER, VALIDATE, NEXT, PREVIOUS, REDO } from '../../constant/text';
import { analytics } from '../../index';
import { 
    OPEN_SYNTHESIS_MODAL,
    CLOSE_SYNTHESIS_MODAL,
    CHECK_PROPOSITION,
    UNCHECK_PROPOSITION,
    CLICK_VALIDATION_BUTTON,
    CLICK_REDO_BUTTON,
    CLICK_NEXT_BUTTON,
    CLICK_PREVIOUS_BUTTON
} from '../../constant/analyticsEvents';


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
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4),
        },
        padding: theme.spacing(2),
    },
    contentShift: {
        [theme.breakpoints.up('md')]: {
            marginLeft: theme.spacing(4) + DRAWER_WIDTH
        },
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
        borderWidth: 1,
        borderColor: theme.palette.grey[400],
        borderRadius: 4,
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
    questionLableContainer: {
        display: 'flex',
        flexDirection: 'row' 
    },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => 
    ({
    ...(open && {
        [theme.breakpoints.up('md')]: {
            marginLeft: DRAWER_WIDTH,
        }
    })
}));

const Question = ({ drawerOpen }) => {
    const { moduleId, courseId, questionId } = useParams();
    const history = useHistory();
    const classes = useStyles();
    const [validated, setValidated] = useState(false);
    const [showSynthesis, setShowSynthesis] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [synthesis, setSynthesis] = useState('');
    const [questions, setQuestions] = useState([]);
    const [listQuestionsIndexes, setListQuestionsIndexes] = useState([]);
    const [questionsString, setQuestionsString] = useState('');
    const [question, setQuestion] = useState({});
    const [questionIndex, setQuestionIndex] = useState('');
    const [propositions, setPropositions] = useState([]);

    const URL = QUESTIONS_API({
        moduleId, courseId  
    });

    useEffect(() => {
        fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                setQuestions([...data.questions]);
                setListQuestionsIndexes([...data.questions.map((question, index)=>({
                    value: index + 1,
                    label: `${QUESTION} ${index + 1}`,
                }))])
                setQuestionIndex(Number(questionId)-1);
                setSynthesis(data.synthesis)
                setQuestionsString(JSON.stringify([...data.questions]));
            })
            .catch((error) => {
                console.log(error);
            });
    },
        [courseId]
    );

    useEffect(() => {
        if (questions.length > 0){
            const tab = [...questions[questionIndex]?.propositions].map(
                (proposition) => ({
                    ...proposition,
                    label: proposition?.content,
                    status: proposition?.is_correct ? 'success' : 'error',
                    checked: false,
                })
            );
            setQuestion({ ...questions[questionIndex] });
            setPropositions(tab);
            setQuestionIndex(Number(questionId) - 1);
            setValidated(false);
        }
    },[questionsString, courseId, questionId])

    const toggleModal = () => {
        if(showSynthesis) {
            logEvent(analytics, CLOSE_SYNTHESIS_MODAL);
        } else {
            logEvent(analytics, OPEN_SYNTHESIS_MODAL)
        }
        setShowSynthesis(!showSynthesis)
    }

    const handleCheckProposition = ({ index, checked }) => {
        if(checked) {
            logEvent(analytics, CHECK_PROPOSITION);
        } else {
            logEvent(analytics, UNCHECK_PROPOSITION);
        };
        let tab = propositions;
        tab[index].checked = checked;
        setPropositions([...tab]);
    }

    const toggleValidation = () => {
        if (validated){
            logEvent(analytics, CLICK_REDO_BUTTON);
        } else {
            logEvent(analytics, CLICK_VALIDATION_BUTTON);
        }
        setValidated(!validated)
    }

    const clickPreviousButton = () => {
        logEvent(analytics, CLICK_PREVIOUS_BUTTON);
        setQuestionIndex(questionIndex-1);
        history.push(`/${moduleId}/${courseId}/${Number(questionId)-1}`);
    }

    const clickNextButton = () => {
        logEvent(analytics, CLICK_NEXT_BUTTON);
        setQuestionIndex(questionIndex+1);
        history.push(`/${moduleId}/${courseId}/${Number(questionId)+1}`);
    }

    const selectQuestion = (event) => {
        setQuestionIndex(event.target.value - 1);
        history.push(`/${moduleId}/${courseId}/${event.target.value}`);
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
            <Main open={drawerOpen}>
                <Paper className={classes.container}>
                    <Box display="flex" flexDirection="row" justifyContent="space-between">
                        <div className={classes.questionLableContainer}>
                            <TextField
                                id="standard-select-currency"
                                select
                                variant="outlined"
                                value={(questionIndex || questionIndex === 0) ? questionIndex + 1 : ''}
                                onChange={selectQuestion}
                                InputProps={{
                                    style: {
                                        fontSize: 18,
                                        backgroundColor: '#eeeeee',
                                        height: 40,
                                    },
                                }}
                            >
                                {listQuestionsIndexes.map((option) => (
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <Button
                            className={classes.synthesisButton}
                            startIcon={<FullscreenIcon />}
                            onClick={toggleModal}
                            variant="outlined"
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
                            propositions.map((proposition, index) => {
                                let status;
                                if (!validated || (validateResponses() && proposition?.status === 'error')) {
                                    status = 'default';
                                } else {
                                    status = proposition?.status
                                }
                                return (
                                    <ListItem
                                        key={index}
                                    >
                                        <ResponseProposition
                                            label={proposition?.label}
                                            status={status}
                                            checked={proposition.checked}
                                            index={index}
                                            handleCheckProposition={handleCheckProposition}
                                            propositions={propositions}
                                        />
                                    </ListItem>
                                )
                            })
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
                    </>
                    }
                    <Divider className={classes.divider} />
                    <Box display="flex" justifyContent="space-between" m={1} p={1} bgcolor="background.paper">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleValidation}
                        >
                            {validated ? REDO : VALIDATE}
                        </Button>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                            <Button
                                onClick={clickPreviousButton}
                                disabled={questionIndex === 0}
                            >
                                {PREVIOUS}
                            </Button>
                            <Button
                                onClick={clickNextButton}
                                disabled={questionIndex === questions?.length - 1}
                            >
                                {NEXT}
                            </Button>
                        </ButtonGroup>
                    </Box>
                </Paper>
            </Main>
            <CustomModal 
                showSynthesis={showSynthesis}
                toggleModal={toggleModal}
                modalContent={synthesis}
            />
        </>
    );
}

export default Question;