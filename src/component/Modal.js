import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@material-ui/core';
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    titleText: {
        maxWidth: '90%',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const CustomDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose } = props;
    return (
        <DialogTitle disableTypography className={classes.root}>
            <Typography
                variant="h6"
                className={classes.titleText}
            >
                {children}
            </Typography>
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
    );
});

const CustomModal = ({
    showSynthesis,
    toggleModal,
    modalContent,
}) => {

    return (
        <Dialog
            open={showSynthesis}
            onClose={toggleModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <ReactMarkdown>{modalContent}</ReactMarkdown>
            </DialogContent>
        </Dialog>);
}

export default CustomModal;