import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Select from "react-select";
import { styled } from "@mui/system";
import _ from "lodash";
import Alert from "@mui/material/Alert";
import makeStyles from "@mui/styles/makeStyles";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { logEvent } from "firebase/analytics";
import { DRAWER_WIDTH } from "../../constant/ui";
import ResponseProposition from "./ResponseProposition";
import CustomModal from "../Modal";
import { QUESTIONS_API } from "../../config/api";
import {
  QUESTION,
  QUESTION_NUMBER,
  SYNTHESIS,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  COMMENT,
  PERSONAL_COMMENT_PLACEHOLDER,
  VALIDATE,
  NEXT,
  PREVIOUS,
  REDO,
} from "../../constant/text";
import { analytics } from "../../index";
import {
  OPEN_SYNTHESIS_MODAL,
  CLOSE_SYNTHESIS_MODAL,
  CHECK_PROPOSITION,
  UNCHECK_PROPOSITION,
  CLICK_VALIDATION_BUTTON,
  CLICK_REDO_BUTTON,
  CLICK_NEXT_BUTTON,
  CLICK_PREVIOUS_BUTTON,
  SELECT_QUESTION,
} from "../../constant/analyticsEvents";

const useStyles = makeStyles((theme) => ({
  circularProgressContainer: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 50,
  },
  container: {
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    padding: theme.spacing(2),
  },
  contentShift: {
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(4) + DRAWER_WIDTH,
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
  selectQuestion: {
    width: 150,
  },
  synthesisButtonText: {
    color: theme.palette.grey[800],
    textTransform: "none",
  },
  modalContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    maxHeight: "80vh",
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
  },
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...(open && {
      [theme.breakpoints.up("md")]: {
        marginLeft: DRAWER_WIDTH,
      },
    }),
  })
);

const Question = ({ drawerOpen }) => {
  const { sourceId, moduleId, courseId, questionId } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [validated, setValidated] = useState(false);
  const [showSynthesis, setShowSynthesis] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [next, setNext] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [synthesis, setSynthesis] = useState("");
  const [questions, setQuestions] = useState([]);

  const [listQuestionsIndexes, setListQuestionsIndexes] = useState([]);
  const [questionsString, setQuestionsString] = useState("");
  const [question, setQuestion] = useState({});
  const [propositions, setPropositions] = useState([]);

  const URL = QUESTIONS_API({
    sourceId,
    moduleId,
    courseId,
  });

  useEffect(() => {
    fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
        setQuestions([...response.data.questions]);
        setTotalQuestions(Number(response.total));
        setNext(response.next);
        const listQuestionsIndexesTemp = [];

        for (let index = 0; index < response.total; index++) {
          listQuestionsIndexesTemp.push({
            value: index + 1,
            label: `${QUESTION} ${index + 1}`,
          });
        }
        setListQuestionsIndexes(listQuestionsIndexesTemp);
        setSynthesis(response.data.synthesis);
        setQuestionsString(JSON.stringify([...response.data.questions]));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [moduleId, courseId]);

  useEffect(() => {
    let numberNext;
    let NumberQuestionId;
    if (next) {
      numberNext = Number(next?.substring(7, next?.length));
      NumberQuestionId = Number(questionId);
      if (NumberQuestionId > numberNext) {
        const tempNumberNext =
          (Math.floor(NumberQuestionId / 20) + 1) * 20 - 20;
        setNext(`?index=${tempNumberNext}`);
        fetch(`${URL}?index=${tempNumberNext}`)
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.data?.questions?.length) {
              setQuestions([...response.data.questions]);
              const tempQuestion = response.data.questions.find(
                (element) => element.id === NumberQuestionId
              );
              const tab = [...tempQuestion.propositions].map((proposition) => ({
                ...proposition,
                label: proposition?.content,
                status: proposition?.is_correct ? "success" : "error",
                checked: false,
              }));

              setQuestion(tempQuestion);
              setPropositions(tab);
              setValidated(false);
              setNext(response.next);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        if (questions.length > 0) {
          const tempQuestion = questions.find(
            (element) => element.id === NumberQuestionId
          );

          const tab = [...tempQuestion.propositions].map((proposition) => ({
            ...proposition,
            label: proposition?.content,
            status: proposition?.is_correct ? "success" : "error",
            checked: false,
          }));
          setQuestion({ ...questions[Number(questionId) - 1] });
          setPropositions(tab);
          setValidated(false);
        }
      }
    } else {
      if (questions.length > 0) {
        const tempQuestion = questions.find(
          (element) => element.id === NumberQuestionId
        );

        const tab = [...tempQuestion.propositions].map((proposition) => ({
          ...proposition,
          label: proposition?.content,
          status: proposition?.is_correct ? "success" : "error",
          checked: false,
        }));
        setQuestion({ ...questions[Number(questionId) - 1] });
        setPropositions(tab);
        setValidated(false);
      }
    }
  }, [questionsString, courseId, questionId]);

  const toggleModal = () => {
    if (showSynthesis) {
      logEvent(analytics, CLOSE_SYNTHESIS_MODAL);
    } else {
      logEvent(analytics, OPEN_SYNTHESIS_MODAL);
    }
    setShowSynthesis(!showSynthesis);
  };

  const handleCheckProposition = ({ index, checked }) => {
    if (checked) {
      logEvent(analytics, CHECK_PROPOSITION);
    } else {
      logEvent(analytics, UNCHECK_PROPOSITION);
    }
    let tab = propositions;
    tab[index].checked = checked;
    setPropositions([...tab]);
  };

  const toggleValidation = () => {
    if (validated) {
      logEvent(analytics, CLICK_REDO_BUTTON);
    } else {
      logEvent(analytics, CLICK_VALIDATION_BUTTON);
    }
    setValidated(!validated);
  };

  const clickPreviousButton = () => {
    logEvent(analytics, CLICK_PREVIOUS_BUTTON);
    history.push(
      `/workspace/${sourceId}/${moduleId}/${courseId}/${Number(questionId) - 1}`
    );
  };

  const clickNextButton = () => {
    logEvent(analytics, CLICK_NEXT_BUTTON);
    history.push(
      `/workspace/${sourceId}/${moduleId}/${courseId}/${Number(questionId) + 1}`
    );
  };

  const selectQuestion = (event) => {
    logEvent(analytics, SELECT_QUESTION);
    history.push(
      `/workspace/${sourceId}/${moduleId}/${courseId}/${event.value}`
    );
  };

  const validateResponses = () => {
    const valide = propositions.find(
      (proposition) =>
        (proposition.status === "success" && !proposition.checked) ||
        (proposition.status === "error" && proposition.checked)
    );
    return _.isEmpty(valide);
  };

  if (isLoading) {
    return (
      <>
        <div className={classes.toolbar} />
        <div className={classes.circularProgressContainer}>
          <CircularProgress />
        </div>
      </>
    );
  }

  return (
    <>
      <div className={classes.toolbar} />
      <Main open={drawerOpen}>
        <Paper className={classes.container}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Select
              className={classes.selectQuestion}
              defaultValue={{
                value: 1,
                label: `${QUESTION} 1`,
              }}
              value={{
                value: Number(questionId),
                label: `${QUESTION} ${Number(questionId)}`,
              }}
              options={listQuestionsIndexes}
              placeholder={QUESTION_NUMBER}
              onChange={selectQuestion}
            />
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
          <Typography variant="subtitle1">{question?.content}</Typography>
          <Divider className={classes.divider} />
          {!validated ? null : validateResponses() ? (
            <Alert severity="success">{CORRECT_ANSWER}</Alert>
          ) : (
            <Alert severity="error">{WRONG_ANSWER}</Alert>
          )}

          <List>
            {propositions.map((proposition, index) => {
              let status;
              if (
                !validated ||
                (validateResponses() && proposition?.status === "error")
              ) {
                status = "default";
              } else {
                status = proposition?.status;
              }
              return (
                <ListItem key={index}>
                  <ResponseProposition
                    label={proposition?.label}
                    status={status}
                    checked={proposition.checked}
                    index={index}
                    handleCheckProposition={handleCheckProposition}
                    propositions={propositions}
                  />
                </ListItem>
              );
            })}
          </List>
          {validated && (
            <>
              {question?.comment && (
                <>
                  <Divider className={classes.divider} />
                  <Typography variant="h6">{COMMENT}</Typography>
                  <Typography variant="subtitle1">
                    {question?.comment}
                  </Typography>
                </>
              )}
            </>
          )}
          <Divider className={classes.divider} />
          <Box
            display="flex"
            justifyContent="space-between"
            m={1}
            p={1}
            bgcolor="background.paper"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={toggleValidation}
            >
              {validated ? REDO : VALIDATE}
            </Button>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={clickPreviousButton}
                disabled={Number(questionId) === 1}
              >
                {PREVIOUS}
              </Button>
              <Button
                onClick={clickNextButton}
                // disabled={Number(questionId) === questions?.length}
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
};

export default Question;
