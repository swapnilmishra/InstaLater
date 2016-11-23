import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
// import StarBorder from 'material-ui/svg-icons/action/pageview';

import DetailsWindow from './details'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 700,
    height: 'auto',
    overflowY: 'auto'
  },
  gridTile:{
    border: '1px solid #ededf0',
    borderBottom: '1px solid #dcdce0',
    cursor : 'pointer',
    background : '#fff',
    boxShadow: '2px #ccc'
  }
};

class ContentGrid extends Component{
  constructor(props){
    super(props);
    this.state = {
      showDetails : false
    }
  }

  componentWillReceiveProps(){
    this.setState(
      {showDetails : false}
    )
  }

  render(){
    const {articleData} = this.props;
    this.articleData = articleData;

    let renderEl;
    if(this.state.showDetails){
      let articleDetails = this.findArticleById(this.state.articleId)
      renderEl = <DetailsWindow articleDetails={articleDetails}/>
    }
    else {
      renderEl = <GridList
          padding={20}
          cellHeight={300}
          style={styles.gridList}
        >
        <Subheader>{this.props.title}</Subheader>
          {articleData.map((article) => (
            <GridTile
              titleBackground='rgba(0, 0, 0, 0.6)'
              style={styles.gridTile}
              onClick={(e) => this.showArticleDetails(article._id)}
              key={article._id}
              title={this.getArticleType(article).type}
              subtitle={<span>Saved on <b>{new Date(article.savedDate).toDateString()}</b></span>}
            >
              {this.getArticleType(article).el}
            </GridTile>
          ))}
        </GridList>
    }
    return (
      <div style={styles.root}>
        {renderEl}
      </div>
    );
  }

  getArticleType(articleObj){
    let el;
    const textStyle = {
      fontSize : 13,
      padding : 5,
      lineHeight: 1.5,
      textAlign : 'justify'
    }
    if(articleObj.textContent){
      el = <div style={textStyle}>{articleObj.textContent}</div>
      return {type:'Text Snippet',el}
    }
    else if(articleObj.imageUrl){
      el = <img src={articleObj.imageUrl} role="presentation"/>
      return {type:'Image',el}
    }
    el = <div style={textStyle}>{articleObj.articleUrl}</div>
    return {type:'Url',el}
  }

  showArticleDetails(articleId){
    this.setState({
      showDetails : true,
      articleId : articleId
    })
  }

  findArticleById(articleId){
    return this.articleData.find((article) => {
      return article._id === articleId
    })
  }
  
}

export default ContentGrid;