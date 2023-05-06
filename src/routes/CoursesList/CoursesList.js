import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Tooltip, Hidden } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_COURSES_API } from "../../config/api";
import {
  COURSES_LIST_TITLE,
  BACK,
  MORE_INFO,
  FACEBOOK_PAGE,
  HOME,
  BACK_HOME,
} from "../../constant/text";
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
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
  },
  title: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
      lineHeight: "100%",
    },
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
    [theme.breakpoints.down("md")]: {
      height: 25,
      width: 25,
    },
  },
  backButtonMobile: {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  contactText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(1),
  },
  homeLinkText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(12),
  },
  linkText: {
    color: theme.palette.primary.dark,
    fontSize: 20,
    textAlign: "center",
    textDecoration: "none",
    marginLeft: theme.spacing(1),
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
      <Container className={classes.welcomeSectionContainer}>
        <Container className={classes.titleContainer}>
          <Tooltip title={BACK}>
            <ArrowBackIosIcon
              className={classes.backIcon}
              color="primary"
              fontSize="large"
              onClick={goBack}
            />
          </Tooltip>
          <Typography variant="h1" className={classes.title}>
            {moduleName}
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
        <Typography variant="h2" className={classes.homeLinkText}>
          {BACK_HOME}
          <Link
            to={`/`}
            className={classes.linkText}
            style={{ textDecoration: "none" }}
            rel="noreferrer"
          >
            {HOME}
          </Link>
        </Typography>
        <Typography variant="h2" className={classes.contactText}>
          {MORE_INFO}
          <a
            href="https://www.facebook.com/pacemakerqcm"
            className={classes.linkText}
            target="_blank"
            rel="noreferrer"
          >
            {FACEBOOK_PAGE}
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default CoursesList;
