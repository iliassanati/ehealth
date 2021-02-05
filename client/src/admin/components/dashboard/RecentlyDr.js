import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { cyan } from "@material-ui/core/colors";
import Wallpaper from "@material-ui/icons/Wallpaper";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: 300,
    backgroundColor: cyan[600],
    color: "white"
  }
};
class RecentlyDoctor extends React.Component {
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
    const { classes, drs } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const rightIconMenu = (
      <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose}>
        <Link to="/admin/table/user" className="button">
           <MenuItem>View</MenuItem>
        </Link>
      </Menu>
    );

    const iconButtonElement = (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "long-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon color={"action"} />
        </IconButton>
        {rightIconMenu}
      </div>
    );

    return (
      <Paper>
        <List
          subheader={
            <ListSubheader classes={{ root: classes.subheader }}>Recent Doctors</ListSubheader>
          }
        >
          {drs && drs.map((dr) => (
            <ListItem key={dr._id}>
              <Avatar style={{ marginRight: "10px" }}>
                <Wallpaper />
              </Avatar>
              <ListItemText primary={dr.nom} secondary={dr.specialite} />
              <ListItemSecondaryAction>{iconButtonElement}</ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

RecentlyDoctor.propTypes = {
  drs: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(RecentlyDoctor);
