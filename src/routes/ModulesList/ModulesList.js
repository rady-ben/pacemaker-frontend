import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Tooltip, Hidden } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useParams, useHistory } from "react-router";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_COURSES_API } from "../../config/api";
import {
  MODULES_SERIE_200,
  NUMBER_200,
  MODULES_BANC_01,
  BANC_01_NUMBER,
  BACK,
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
}));

const ModulesList = () => {
  const classes = useStyles();
  const [moduleList, setModuleList] = useState([]);
  const { sourceId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

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
            {sourceId === "1" ? MODULES_SERIE_200 : MODULES_BANC_01}
            <span className={classes.qcmText}>
              {sourceId === "1" ? NUMBER_200 : BANC_01_NUMBER}
            </span>
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
                available={true}
                url={`/${sourceId}/${module.id}/${module.name}`}
              />
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ModulesList;
