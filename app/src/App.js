import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Sidebar from './components/sidebar';
import ContentGrid from './components/contentgrid';
import AppBar from 'material-ui/AppBar';
import RefreshIcon from './components/refreshicon';
import Snackbar from 'material-ui/Snackbar';

class App extends Component {
  
  constructor(){
    super()
    this.filterArticles = this.filterArticles.bind(this)
    this.showFilteredData = this.showFilteredData.bind(this)
    this.refreshData = this.refreshData.bind(this)
    this.getArticleData()
    // this.imageArticles = this.filterArticles('image')
    injectTapEventPlugin()
    this.articleData = {};
    this.state = {
      showImageOnly : false,
      showTextOnly : false,
      showUrlOnly : false,
      showAll : true,
      isArticleDataAvailable : false,
      snackOpen : false
    }
  }


  render() {

    let articles = null;
    console.log(this.articleData)
    if(this.state.isArticleDataAvailable && this.state.showAll){
      articles = <ContentGrid articleData={this.articleData} title='Showing all items'/>
    }
    else if(this.state.showImageOnly){
      articles = <ContentGrid articleData={this.imageData} title='Showing images'/>
    }
    else if(this.state.showTextOnly){
      articles = <ContentGrid articleData={this.textData} title='Showing text items'/>
    }
    else if(this.state.showUrlOnly){
      articles = <ContentGrid articleData={this.urlData} title='Showing links'/>
    }
    else {
      articles = <div>...Loading Data</div>
    }
    return (
      <div className="App">
        <MuiThemeProvider>
          <AppBar
            showMenuIconButton={false}
            title="Insta Later"
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <RefreshIcon refreshData={this.refreshData}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Snackbar
            open={this.state.snackOpen}
            message="Content Updated"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose.bind(this)}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Sidebar showFilteredData={this.showFilteredData}/>
        </MuiThemeProvider>
        <MuiThemeProvider>
          {articles}
        </MuiThemeProvider>
      </div>
    );
  }

  getArticleData(){
    fetch('/getData')
    .then(response => {
      return response.json()
    })
    .then(articleData => {
      this.articleData = articleData.articles.reverse()
      this.setState({isArticleDataAvailable : true})
      this.imageData = this.filterArticles('image')
      this.urlData = this.filterArticles('url')
      this.textData = this.filterArticles('text')
    })
  }

  filterArticles(type){
    const articleData = this.articleData
    return articleData.filter( article => {
      if(type === 'image')
        return (article.imageUrl ? true:false)
      else if(type === 'text')
        return (article.textContent ? true : false)
      else if(type === 'url')
        return (article.articleUrl ? true : false)
      else return true
    })
  }

  showFilteredData(type){
    let stateObj = {
      showImageOnly : false,
      showTextOnly : false,
      showUrlOnly : false,
      showAll : false
    }
    if(type === 'image') {
      stateObj.showImageOnly = true
    }
    else if(type === 'text'){
      stateObj.showTextOnly = true
    }
    else if(type === 'url'){
      stateObj.showUrlOnly = true
    }
    else if(type === 'all'){
      stateObj.showAll = true
    }
    this.setState(stateObj)
  }

  refreshData(){
    this.setState({
      isArticleDataAvailable : false,
      snackOpen: true
    })
    this.getArticleData()    
  }

  handleRequestClose(){
    this.setState({
      snackOpen: false
    })
  }


}

export default App;
