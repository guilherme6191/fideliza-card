import React, { Component } from 'react';
import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import QRCodeIcon from 'material-ui/svg-icons/action/important-devices';
import ReportsIcon from 'material-ui/svg-icons/communication/business';

import QRCode from '../QRCode/QRCode';
import Reports from '../Reports/Reports';

export default class Dashboard extends Component {
  state = {
    selectedIndex: 0
  };
  select = index => this.setState({ selectedIndex: index });

  renderTab = () => {
    return this.state.selectedIndex === 0 ? <Reports /> : <QRCode />;
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
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="QR Code"
              icon={<QRCodeIcon>QR Code</QRCodeIcon>}
              onClick={() => this.select(1)}
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
  height: '70px'
};

const style = {
  bottomNavContainer
};
