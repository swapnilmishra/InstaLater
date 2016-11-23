import React, { Component } from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';

const styles = {
    root : {
        width: '100%',
        minHeight: 500,
        marginTop: 10
    }
}

class DetailsCard extends Component{

    render(){
        let renderEl;
        if(this.props.articleDetails.textContent){
            renderEl = <Card style={styles.root}>
                <CardHeader
                title="Text Content"
                />
                <CardText>
                    {this.props.articleDetails.textContent}
                </CardText>
            </Card>
        }
        else if(this.props.articleDetails.imageUrl){
            renderEl = <Card style={styles.root}>
                <CardHeader
                title="Image"
                />
                <CardMedia>
                <img src={this.props.articleDetails.imageUrl} role="presentation"/>
                </CardMedia>
            </Card>
        }
        else {
            renderEl = <Card style={styles.root}>
                <CardHeader
                title="Article url"
                />
                <CardText>
                    <a href={this.props.articleDetails.articleUrl}>{this.props.articleDetails.articleUrl}</a>
                </CardText>
            </Card>
        }
        return (renderEl)
    }
}

export default DetailsCard;