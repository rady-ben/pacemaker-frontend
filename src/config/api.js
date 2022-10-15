const BASE_URL =
  "https://ahebn8her4.execute-api.eu-south-1.amazonaws.com/Prod/v1.0";

export const SOURCES_API = `${BASE_URL}/source`;

export const MODULES_COURSES_API = ({ sourceId }) =>
  `${BASE_URL}/source/${sourceId}/module`;

export const QUESTIONS_API = ({ sourceId, moduleId, courseId }) =>
  `${BASE_URL}/source/${sourceId}/module/${moduleId}/course/${courseId}`;
