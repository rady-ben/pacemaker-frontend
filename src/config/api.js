export const MODULES_API = "https://serie200-api.herokuapp.com/v1.0/module/";
export const QUESTIONS_API = ({ moduleId, courseId }) =>
  `https://serie200-api.herokuapp.com/v1.0/module/${moduleId}/course/${courseId}/`;

const BASE_URL =
  "https://ahebn8her4.execute-api.eu-south-1.amazonaws.com/Prod/v1.0";

export const SOURCES_API = `${BASE_URL}/source`;

export const MODULES_API_1 = ({ serieId }) =>
  `${BASE_URL}/source/${serieId}/module`;
