import React, { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import { isMobile } from "../../utils/ui";
import {
  PACEMAKER,
  QCM,
  WELCOME_MESSAGE_1,
  START_REVIEW,
} from "../../constant/text";
import SourceItemsGrid from "./SourceItemsGrid";
import { SOURCES_API } from "../../config/api";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#151719",
    width: "100%",
  },
  welcomeSectionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(4),
    minHeight: "100vh",
  },
  titleContainer: {
    marginBottom: theme.spacing(2),
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
  descriptionTextContainer: {
    maxWidth: 600,
    marginBottom: theme.spacing(8),
  },
  descriptionText: {
    color: theme.palette.grey.A400,
    fontSize: 20,
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
  const [sourcesList, setSourcesList] = useState([]);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    if (isMobile()) {
      setImgWidth(window.innerWidth * 0.9);
      setImgHeight(window.innerHeight * 0.6);
    } else {
      setImgWidth(window.innerWidth * 0.6);
      setImgHeight(window.innerHeight * 0.7);
    }
  }, []);

  useEffect(() => {
    fetch(SOURCES_API)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSourcesList(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <Container className={classes.startButtonContainer}>
          <Button size="large" className={classes.startButton} href="#sources">
            {START_REVIEW}
          </Button>
        </Container>
        <img
          src={require("../../assets/backgroundImage.jpg")}
          width={imgWidth}
          height={imgHeight}
        />
      </Container>
      <SourceItemsGrid sourcesList={sourcesList} />
    </div>
  );
};

export default Welcome;
