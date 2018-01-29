import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  BottomNavigation,
  BottomNavigationItem,
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import QRCodeIcon from 'material-ui/svg-icons/action/important-devices';
import ReportsIcon from 'material-ui/svg-icons/communication/business';

import QRCode from '../QRCode/QRCode';
import Reports from '../Reports/Reports';

class Dashboard extends Component {
  state = {
    selectedIndex: 0,
  };

  renderTab = () => {
    return (
      <Switch>
        <Route path="/dashboard" exact component={Reports} />
        <Route path="/dashboard/campaigns" component={QRCode} />
      </Switch>
    );
  };

  handleNavigation = (path, index) => {
    this.setState({ selectedIndex: index }, this.props.history.push(path));
  };

  render() {
    return (
      <div
        className="w-100 d-flex flex-column justify-content-between"
        style={{ height: '90%' }}
      >
        {this.renderTab()}
        <Paper zDepth={1} style={style.bottomNavContainer}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Informações"
              icon={<ReportsIcon>Informações</ReportsIcon>}
              onClick={() => this.handleNavigation('/dashboard', 0)}
            />
            <BottomNavigationItem
              label="QR Code"
              icon={<QRCodeIcon>QR Code</QRCodeIcon>}
              onClick={() => this.handleNavigation('/dashboard/campaigns', 1)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}

const bottomNavContainer = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '70px',
};

const style = {
  bottomNavContainer,
};

export default withRouter(Dashboard);
