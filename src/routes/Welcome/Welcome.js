import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { PACEMAKER, QCM, WELCOME_MESSAGE_1 } from "../../constant/text";
import SourceItemsGrid from "./SourceItemsGrid";
import Loading from "../../component/Loading";
import useSources from "../../hooks/sources";


const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#151719",
    width: "100%",
    minHeight: "100vh",
  },
  welcomeSectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
  },
  titleContainer: {
    marginBottom: theme.spacing(1),
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
  descriptionTextContainer: {
    maxWidth: 600,
    marginBottom: theme.spacing(2),
  },
  descriptionText: {
    color: theme.palette.grey.A400,
    fontSize: 18,
    textAlign: "center",
  },
  startButtonContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  startButton: {
    color: theme.palette.success.light,
    textTransform: "none",
    fontSize: 18,
  },
  imgContainer: {
    width: "100%",
    flex: 1,
  },
  sourceSectionContainer: {
    minHeight: "100vh",
    paddingTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  contactText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(8),
    marginTop: theme.spacing(8),
  },
  linkText: {
    color: theme.palette.primary.dark,
    fontSize: 20,
    textAlign: "center",
    textDecoration: "none",
    marginLeft: theme.spacing(1),
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const {sourcesList,  isLoading} = useSources();

  useEffect(() => {
    if (window?.ReactNativeWebView?.postMessage) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ canGoBack: false })
      );
    }
    return () => {
      if (window?.ReactNativeWebView?.postMessage) {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ canGoBack: true })
        );
      }
    };
  }, []);

  return (
    <div className={classes.container}>
      <Container className={classes.welcomeSectionContainer}>
        <Container className={classes.titleContainer}>
          <Typography variant="h1" className={classes.title}>
            {PACEMAKER} <span className={classes.qcmText}>{QCM}</span>
          </Typography>
        </Container>
        <Container className={classes.descriptionTextContainer}>
          <Typography variant="h2" className={classes.descriptionText}>
            {WELCOME_MESSAGE_1}
          </Typography>
        </Container>
      </Container>
      {isLoading ? <Loading /> : <SourceItemsGrid sourcesList={sourcesList||[]} />}
    </div>
  );
};

export default Welcome;
