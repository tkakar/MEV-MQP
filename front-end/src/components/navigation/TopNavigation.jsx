import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme, withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import List, {
  ListItem,
  ListItemText,
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import styles from './NavigationStyles';

class TopNavigation extends Component {
  static propTypes = {
    classes: PropTypes.shape({
    }).isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  state = {
    left: false,
  };
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };
  asd = () => 123;

  render = () => (

    <div className={this.props.classes.topNavigationContainer}>
      <nav className={`${this.props.classes.topNavigationContainer} navbar navbar-default`}>
        <div className="container">
          <div className="pull-left">
            <div>
              <Button onClick={this.toggleDrawer('left', true)} className={this.props.classes.buttonClass}><i className="material-icons">menu</i></Button>
              <Drawer open={this.state.left} onRequestClose={this.toggleDrawer('left', false)} SlideProps={{ className: this.props.classes.drawerClass }}>
                <div
                  tabIndex={0}
                  role="button"
                  onClick={this.toggleDrawer('left', false)}
                  onKeyDown={this.toggleDrawer('left', false)}
                >
                  <div className={this.props.classes.drawerHeader}>
                    <h2>Hello, welcome!</h2>
                  </div>
                  <Divider style={{ 'background-color': 'rgb(255,255,255)' }} />
                  <List>
                    <Link to="/" className={this.props.classes.listLink}>
                      <ListItem button >
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="line-item" style={{ 'line-item': { 'font-size': '16px' } }}>
                            Visualizations
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                    <Link to="/about"  className={this.props.classes.listLink}>
                      <ListItem button >
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="line-item" style={{ 'line-item': { 'font-size': '16px' } }}>
                            About
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                    <Link to="/report" className={this.props.classes.listLink}>
                      <ListItem button >
                        <ListItemText
                          disableTypography
                          primary={
                            <Typography type="line-item" style={{ 'line-item': { 'font-size': '16px', color: '#fff' } }}>
                            Reports
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Link>
                  </List>
                  <Divider style={{ 'background-color': 'rgb(255,255,255)' }} />
                </div>
              </Drawer>
            </div>
          </div>
          <div className="navbar-header pull-right">
            <a className={`${this.props.classes.logo} navbar-brand`} href="/">
              MEV
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default withStyles(styles)(TopNavigation);