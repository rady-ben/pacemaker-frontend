import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CustomModal from "../../component/Modal";

import {
  OUR_SOURCES,
  WELCOME_MESSAGE_2,
  MORE_INFO,
  FACEBOOK_PAGE,
} from "../../constant/text";
import { SourceItem } from "../../component/SourceItem";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
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

const SourceItemsGrid = ({ sourcesList }) => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };
  return (
    <>
      <Container className={classes.sourceSectionContainer} id="sources">
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
            {sourcesList.map((source) => (
              <SourceItem
                key={source.id}
                toggleAlert={toggleAlert}
                title={source.name}
                available={true}
              />
            ))}
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
            rel="noreferrer"
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
    </>
  );
};

export default SourceItemsGrid;
