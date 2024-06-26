import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Tooltip } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_COURSES_API } from "../../config/api";
import {
  BACK,
  BEING_PROCESSED,
  MORE_INFO,
  FACEBOOK_PAGE,
  HOME,
  BACK_HOME,
} from "../../constant/text";
import Loading from "../../component/Loading";
import useSources from "../../hooks/sources";

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
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: 28,
      lineHeight: "100%",
    },
  },
  qcmText: {
    color: theme.palette.primary.dark,
    fontWeight: "bold",
    fontSize: 40,
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

const ModulesList = () => {
  const classes = useStyles();
  const [moduleList, setModuleList] = useState([]);
  const { sourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const {sourcesList} = useSources()
  console.log(sourcesList)

  useEffect(() => {
    setIsLoading(true);
    fetch(MODULES_COURSES_API({ sourceId }))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModuleList(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

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
            {sourcesList?.[sourceId].label1}
            <span className={classes.qcmText}>{sourcesList?.[sourceId].label2}</span>
          </Typography>
        </Container>
        <Grid className={classes.list} container spacing={4} rowSpacing={6}>
          {isLoading ? (
            <Loading />
          ) : (
            moduleList.map((module) => (
              <SourceItem
                key={module.id}
                title={module.name}
                subTitle={module.courses?.length ? "" : BEING_PROCESSED}
                available={module.courses?.length ? true : false}
                url={`/${sourceId}/${module.id}/${module.name}`}
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

export default ModulesList;
