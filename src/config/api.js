export const MODULES_API = 'http://serie200-api.herokuapp.com/v1.0/module/';
export const QUESTIONS_API = ({ 
    moduleId, courseId 
}) =>`http://serie200-api.herokuapp.com/v1.0/module/${moduleId}/course/${courseId}/`;
