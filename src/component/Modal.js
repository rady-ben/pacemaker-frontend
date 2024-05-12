import React from "react";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import ReactMarkdown from "react-markdown";
import makeStyles from "@mui/styles/makeStyles";
import PropTypes from 'prop-types';
import { CLOSE, NO_SYNTHESIS } from "../constant/text";


const useStyles = makeStyles(() => ({
  markdown: {
    "& H1": {
      fontSize: 18,
    },
  },
}));

const CustomModal = ({ showSynthesis, toggleModal, modalContent }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={showSynthesis}
      onClose={toggleModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <div className={classes.markdown}>
          <ReactMarkdown>{modalContent || NO_SYNTHESIS}</ReactMarkdown>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleModal}>{CLOSE}</Button>
      </DialogActions>
    </Dialog>
  );
};


CustomModal.propTypes = {
    showSynthesis: PropTypes.bool,
    toggleModal: PropTypes.func,
    modalContent: PropTypes.string,
}

export default CustomModal;
