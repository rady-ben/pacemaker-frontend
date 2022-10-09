import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useParams } from "react-router";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_API_1 } from "../../config/api";
import {
  MODULES_SERIE_200,
  NUMBER_200,
  MODULES_BANC_01,
  BANC_01,
} from "../../constant/text";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#151719",
    width: "100%",
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
}));

const ModulesList = () => {
  const classes = useStyles();
  const [moduleList, setModuleList] = useState([]);
  const { sourceId } = useParams();

  useEffect(() => {
    fetch(MODULES_API_1({ sourceId }))
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setModuleList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Container className={classes.welcomeSectionContainer}>
        <Container className={classes.titleContainer}>
          {sourceId === "1" ? (
            <Typography variant="h1" className={classes.title}>
              {MODULES_SERIE_200}
              <span className={classes.qcmText}>{NUMBER_200}</span>
            </Typography>
          ) : (
            <Typography variant="h1" className={classes.title}>
              {MODULES_BANC_01}
              <span className={classes.qcmText}>{BANC_01}</span>
            </Typography>
          )}
        </Container>
        <Grid className={classes.list} container spacing={4} rowSpacing={6}>
          {moduleList.map((module) => (
            <SourceItem
              key={module.id}
              title={module.name}
              available={true}
              url={`/${sourceId}/${module.id}/${module.name}`}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default ModulesList;
