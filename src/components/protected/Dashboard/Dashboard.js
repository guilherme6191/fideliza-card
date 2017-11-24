import React, { Component } from 'react';

import FontIcon from 'material-ui/FontIcon';
import {
  BottomNavigation,
  BottomNavigationItem
} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import QrCode from 'material-ui/svg-icons/action/important-devices';
import Reports from 'material-ui/svg-icons/communication/business';

const ReportsComp = <Reports>Reports</Reports>;
const QRCodeComp = <QrCode>QR Code</QrCode>;

const style = {
  bottomNavContainer
};

const bottomNavContainer = {
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '70px'
};
export default class Dashboard extends Component {
  state = {
    selectedIndex: 0
  };
  select = index => this.setState({ selectedIndex: index });

  renderTab = () => {
    return this.state.selectedIndex === 0 ? <h2>Reports</h2> : <h2>QR Code</h2>;
  };

  render() {
    return (
      <div className="w-100 d-flex flex-column justify-content-between" style={{height: '90%'}}>
        {this.renderTab()}
        <Paper zDepth={1} style={bottomNavContainer}>
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Reports"
              icon={ReportsComp}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="QR Code"
              icon={QRCodeComp}
              onClick={() => this.select(1)}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}
