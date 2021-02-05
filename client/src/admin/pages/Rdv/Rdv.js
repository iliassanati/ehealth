import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
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
import Wallpaper from "@material-ui/icons/Wallpaper";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  subheader: {
    fontSize: 24,
    fontWeight: 300,
    backgroundColor: "gray",
    color: "white"
  }
};
class Rdv extends React.Component {
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
    const { classes, rdvs } = this.props;
    const { anchorEl } = this.state;



    return (
      <Paper>
        <List
          subheader={
            <ListSubheader classes={{ root: classes.subheader }}>Rdvs</ListSubheader>
          }
        >
          {rdvs && rdvs.map((rdv) => (
            <ListItem key={rdv._id}>
              <ListItemText primary={rdv.userNom} secondary={rdv._id} />
              <ListItemText primary={rdv.doctorNom} secondary={rdv.typeConsultation} />
              <ListItemText primary={rdv.rdvPrix} secondary={rdv.paymentMethod} />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

Rdv.propTypes = {
  rdvs: PropTypes.array,
  classes: PropTypes.object
};

export default withStyles(styles)(Rdv);
