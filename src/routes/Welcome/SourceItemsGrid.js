import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import CustomModal from "../../component/Modal";

import {
  MORE_INFO,
  FACEBOOK_PAGE,
  SOURCE_AVAILABLE,
  BEING_PROCESSED,
} from "../../constant/text";
import { SourceItem } from "../../component/SourceItem";

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    marginBottom: theme.spacing(6),
  },
  title: {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
    fontSize: 35,
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
          <Grid container spacing={1} rowSpacing={6}>
            {sourcesList.map((source) => (
              <SourceItem
                key={source.id}
                toggleAlert={toggleAlert}
                title={source.name}
                subTitle={SOURCE_AVAILABLE}
                available={true}
                sourceId={source.id}
                url={`/${source.id}/modules`}
              />
            ))}
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Série 120 "}
              available={false}
              subTitle={BEING_PROCESSED}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Training book"}
              available={false}
              subTitle={BEING_PROCESSED}
            />
            <SourceItem
              toggleAlert={toggleAlert}
              title={"Série 1000"}
              available={false}
              subTitle={BEING_PROCESSED}
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
