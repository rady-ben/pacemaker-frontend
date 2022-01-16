import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown'
import { makeStyles } from '@material-ui/core/styles';
import { CLOSE } from '../constant/text';

const useStyles = makeStyles((theme) => ({
    markdown: {
        '& H1': {
            fontSize: 18,
        }
    },
}));


const CustomModal = ({
    showSynthesis,
    toggleModal,
    modalContent,
}) => {
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
                    <ReactMarkdown>{modalContent}</ReactMarkdown>
                </div>
            </DialogContent>
        <DialogActions>
          <Button onClick={toggleModal}>
            {CLOSE}
          </Button>
        </DialogActions>
        </Dialog>);
}

export default CustomModal;