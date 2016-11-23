import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentImage from 'material-ui/svg-icons/image/image';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentText from 'material-ui/svg-icons/content/font-download';
import ContentAll from 'material-ui/svg-icons/communication/clear-all';
import Subheader from 'material-ui/Subheader';

class Sidebar extends Component{

  filterByImage(){
    this.props.showFilteredData('image')
  }

  showAll(){
    this.props.showFilteredData('all')
  }

  filterByLink(){
    this.props.showFilteredData('url')
  }

  filterByText(){
    this.props.showFilteredData('text')
  }

  render(){
    return (
      <div className='sidebar'>
        <List>
        <Subheader>My Items</Subheader>
            <ListItem primaryText="All" leftIcon={<ContentAll />} onClick={this.showAll.bind(this)}/>
            <ListItem primaryText="Images" leftIcon={<ContentImage />} onClick={this.filterByImage.bind(this)}/>
            <ListItem primaryText="Links" leftIcon={<ContentLink />} onClick={this.filterByLink.bind(this)}/>
            <ListItem primaryText="Text" leftIcon={<ContentText />} onClick={this.filterByText.bind(this)}/>
        </List>
      </div>
    );
  }
}

// const Sidebar = () => (
  // <div className='sidebar'>
  //   <List>
  //       <ListItem primaryText="All" leftIcon={<ContentAll />} />
  //       <ListItem primaryText="Images" leftIcon={<ContentImage />} />
  //       <ListItem primaryText="Links" leftIcon={<ContentLink />} />
  //       <ListItem primaryText="Text" leftIcon={<ContentText />} />
  //   </List>
  // </div>
// );

export default Sidebar;