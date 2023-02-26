import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Tooltip,
  Hidden,
  Button,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useParams, useHistory } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_COURSES_API } from "../../config/api";
import { COURSES_LIST_TITLE, BACK } from "../../constant/text";
import Loading from "../../component/Loading";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#151719",
    width: "100%",
    paddingBottom: 60,
  },
  welcomeSectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    minHeight: "100vh",
  },
  titleContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
  },
  qcmText: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    fontSize: 40,
  },
  list: {
    marginTop: theme.spacing(8),
    justifyContent: "center",
  },
  backIcon: {
    cursor: "pointer",
    marginRight: theme.spacing(2),
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    "&:active": {
      color: theme.palette.primary.main,
    },
  },
  backButtonMobile: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

const CoursesList = () => {
  const classes = useStyles();
  const [coursesList, setCoursesList] = useState([]);
  const { sourceId, moduleId, moduleName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    fetch(MODULES_COURSES_API({ sourceId }))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const found = data.find(
          (element) => JSON.stringify(element.id) === moduleId
        );
        if (found?.courses?.length) {
          setCoursesList(found?.courses);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sourceId]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.container}>
      <Hidden mdUp>
        <Button
          className={classes.backButtonMobile}
          size="large"
          startIcon={
            <ArrowBackIosIcon
              color="primary"
              fontSize="large"
              onClick={goBack}
            />
          }
          onClick={goBack}
        >
          {BACK}
        </Button>
      </Hidden>
      <Container className={classes.welcomeSectionContainer}>
        <Container className={classes.titleContainer}>
          <Hidden mdDown>
            <Tooltip title={BACK}>
              <ArrowBackIosIcon
                className={classes.backIcon}
                color="primary"
                fontSize="large"
                onClick={goBack}
              />
            </Tooltip>
          </Hidden>
          <Typography variant="h1" className={classes.title}>
            {COURSES_LIST_TITLE}
            <span className={classes.qcmText}>{moduleName}</span>
          </Typography>
        </Container>
        <Grid className={classes.list} container spacing={4} rowSpacing={6}>
          {isLoading ? (
            <Loading />
          ) : (
            coursesList.map((coure) => (
              <SourceItem
                key={coure.id}
                title={coure.title}
                available={true}
                url={`/workspace/${sourceId}/${moduleId}/${coure.id}/1`}
              />
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default CoursesList;
