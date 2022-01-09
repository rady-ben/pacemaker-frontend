export const SET_MODULES = 'SET_MODULES';

export const initialState = {
  modules: [],
};

export const setModules = (modules) => ({
  type: SET_MODULES,
  modules,
});

export const modulesReducer = (state = initialState, action) => {
  if (action.type === SET_MODULES) {
    return {
      ...state,
      modules: [...action.modules],
    };
  }
};