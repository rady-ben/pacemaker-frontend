import React, { useState, useEffect } from "react";
import { Container, Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useParams } from "react-router";
import { SourceItem } from "../../component/SourceItem";
import { MODULES_API_1 } from "../../config/api";
import { COURSES_LIST_TITLE } from "../../constant/text";

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

const CoursesList = () => {
  const classes = useStyles();
  const [coursesList, setCoursesList] = useState([]);
  const { sourceId, moduleId, moduleName } = useParams();

  useEffect(() => {
    fetch(MODULES_API_1({ sourceId }))
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
      });
  }, [sourceId]);

  return (
    <div className={classes.container}>
      <Container className={classes.welcomeSectionContainer}>
        <Container className={classes.titleContainer}>
          <Typography variant="h1" className={classes.title}>
            {COURSES_LIST_TITLE}
            <span className={classes.qcmText}>{moduleName}</span>
          </Typography>
        </Container>
        <Grid className={classes.list} container spacing={4} rowSpacing={6}>
          {coursesList.map((coure) => (
            <SourceItem
              key={coure.id}
              title={coure.title}
              available={true}
              url={`/workspace/${sourceId}/${moduleId}/${coure.id}/1`}
            />
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default CoursesList;
