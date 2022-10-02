import { Container, Typography, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { MenuBookRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CustomModal from "../component/Modal";
import { useStore } from "../store/Store";
import { isMobile } from "../utils/ui";
import {
  PACEMAKER,
  QCM,
  WELCOME_MESSAGE_1,
  START_REVIEW,
  OUR_SOURCES,
  WELCOME_MESSAGE_2,
  MORE_INFO,
  FACEBOOK_PAGE,
} from "../constant/text";

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
  sourceTitle: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  sourceStatusTesxt: {
    color: theme.palette.grey.A400,
    fontSize: 20,
    textAlign: "center",
    marginBottom: theme.spacing(2),
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
  sourseSectionContainer: {
    minHeight: "100vh",
    paddingTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sourseItemContainer: {
    minHeight: 200,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#151719",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.5,
    },
  },
  sourceIconContainer: {
    height: 100,
    width: 100,
    borderRadius: 80,
    backgroundColor: theme.palette.primary.dark,
    marginBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sourceIcon: {
    color: "#fff",
    fontSize: 40,
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

const SourceItem = ({ toggleAlert, title, available }) => {
  const classes = useStyles();
  const [globalState] = useStore();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Link
        to={
          available
            ? `/${globalState?.modules[0]?.id}/${globalState?.modules[0]?.courses[0]?.id}/1`
            : "#"
        }
        style={{ textDecoration: "none" }}
      >
        <div
          className={classes.sourseItemContainer}
          onClick={available ? () => {} : toggleAlert}
          disabled={available}
        >
          <div className={classes.sourceIconContainer}>
            <MenuBookRounded className={classes.sourceIcon} />
          </div>
          <Typography variant="h2" className={classes.sourceTitle}>
            {title}
          </Typography>
          <Typography variant="h2" className={classes.sourceStatusTesxt}>
            {available ? "Source disponible" : "En cours de traitement"}
          </Typography>
        </div>
      </Link>
    </Grid>
  );
};

const Welcome = () => {
  const classes = useStyles();
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

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
    console.log("ici ====>");
    fetch(
      "https://ahebn8her4.execute-api.eu-south-1.amazonaws.com/Prod/v1.0/source"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data =======>");
        console.log(data);
      })
      .catch((error) => {
        console.log("error ======>");
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
          <Button size="large" className={classes.startButton} href="#sourses">
            {START_REVIEW}
          </Button>
        </Container>
        <img
          src={require("../assets/backgroundImage.jpg")}
          width={imgWidth}
          height={imgHeight}
        />
      </Container>
      <Container className={classes.sourseSectionContainer} id="sourses">
        <div>
          <Container className={classes.titleContainer}>
            <Typography variant="h1" className={classes.title}>
              {OUR_SOURCES}
            </Typography>
          </Container>
          <Container className={classes.descriptionTextContainer}>
            <Typography variant="h1" className={classes.descriptionText}>
              {WELCOME_MESSAGE_2}
            </Typography>
          </Container>

          <Grid container spacing={4} rowSpacing={6}>
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Serie 200"}
              available={true}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Diagest"}
              available={false}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Hyperqcm"}
              available={false}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Banques Profs"}
              available={false}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Training cours"}
              available={false}
            />
          </Grid>
        </div>

        <Typography variant="h2" className={classes.contactText}>
          {MORE_INFO}
          <a
            href="https://www.facebook.com/pacemakerqcm"
            className={classes.linkText}
            target="_blank"
          >
            {FACEBOOK_PAGE}
          </a>
        </Typography>
      </Container>
      <CustomModal
        showSynthesis={showAlert}
        toggleModal={toggleAlert}
        modalContent={"Cette source n est pas disponible pour le moment"}
      />
    </div>
  );
};

export default Welcome;
