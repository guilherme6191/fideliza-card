import React, { Component } from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import styled from 'styled-components';
import AddButton from '../../AddButton/AddButton';
import CampaignsData from '../../../helpers/campaigns';
import { firebaseAuth } from '../../../config/constants';
import Loading from '../../Loading';

const Container = styled.div``;

class QRCode extends Component {
  state = {
    loading: true,
    data: []
  };
  componentDidMount() {
    CampaignsData.getByUserId(localStorage.getItem('userUid'))
      .then(res => {
        this.setState({
          data: res,
          loading: false
        });
      })
      .catch(error => {
        console.warn('Error getting documents: ', error);
      });
  }
  iconButtonElement = (
    <IconButton touch={true} tooltip="more" tooltipPosition="bottom-left">
      <MoreVertIcon color={grey400} />
    </IconButton>
  );
  rightIconMenu = (
    <IconMenu iconButtonElement={this.iconButtonElement}>
      <MenuItem>Editar</MenuItem>
      <MenuItem>Deletar</MenuItem>
    </IconMenu>
  );
  renderListItem(item) {
    const createdDate = new Date(item.createdDate).toDateString();
    return (
      <ListItem
        key={item.cnpj + createdDate.trim()}
        innerDivStyle={{ paddingLeft: '5px' }}
        rightIconButton={this.rightIconMenu}
        primaryText={item.name}
        secondaryText={
          <span style={{ color: darkBlack }}>Criado em {createdDate}</span>
        }
        secondaryTextLines={1}
      />
    );
  }
  renderList() {
    return !this.state.data.length ? (
      <h5>Não há campanhas cadastradas.</h5>
    ) : (
      <List>{this.state.data.map(item => this.renderListItem(item))}</List>
    );
  }
  addCampaign() {
    console.log('add');
  }
  render() {
    return this.state.loading ? (
      <Loading />
    ) : (
      <Container className="container py-3">
        <h2>Campanhas</h2>
        {this.renderList()}
        <AddButton onAction={this.addCampaign} />
      </Container>
    );
  }
}

export default QRCode;
