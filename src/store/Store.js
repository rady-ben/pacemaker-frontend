import React from 'react';
import PropTypes from 'prop-types';

const Store = React.createContext();
Store.displayName = 'Store';

export const useStore = () => React.useContext(Store);


export const StoreProvider = ({ children, initialState, reducer }) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider
        value={[globalState, dispatch]}
    >
        {children}
    </Store.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired, 
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired 
};