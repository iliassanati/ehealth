import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { cyan } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: 300,
    backgroundColor: "gray",
    color: "white"
  }
};

class RecentlyUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, users } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);




    return (
      <Paper>
        <List
          subheader={
            <ListSubheader classes={{ root: classes.subheader }}>Users</ListSubheader>
          }
        >
          {users && users.map((user) => (
            <ListItem key={user._id} >
            
             <ListItemText primary={user.email} secondary={user._id} />
             <ListItemText primary={user.nom} secondary={user.prenom} />
             <ListItemText primary={user.phone} secondary={user.createdAt} />
            </ListItem>

            
            
          ))}
        </List>
        
      </Paper>
    );
  }
}

RecentlyUser.propTypes = {
  users: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(RecentlyUser);
