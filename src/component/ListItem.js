import {
    ListItem as MuListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import ListAltSharpIcon from '@material-ui/icons/ListAltSharp';

const ListItem = ({ lable }) => {
    return (
        <MuListItem button key={lable}>
            <ListItemIcon><ListAltSharpIcon /></ListItemIcon>
            <ListItemText primary={lable} />
        </MuListItem>
    );
}

export default ListItem;