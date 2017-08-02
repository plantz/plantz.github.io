import React, { Component, PropTypes } from 'react';

import PlantItem from './PlantItem';

import moment from 'moment'

class Gallery extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      plants: [],
      tab: 'comments'
    }
  }
  componentWillMount(){
    this.props.getPlants({});
  }
  getTab(tab, post){
    switch(tab) {
      case 'comments' :  {
        return post.comments && post.comments.data && post.comments.data
            .map((comment)=> {
          return (
            <article key={comment.id} style={{ textAlign: 'left', marginRight: 8, marginBottom: 8 }}>
              <span className="tag is-primary is-medium">{comment.like_count} likes</span>
              <span style={{marginLeft: 5}}>{comment.message}</span>
            </article>
          )
        })
      }
      case 'idForm' :  {
        return "id form"
      }
    }
  }
  render() {
    return (
        <div className="masonry-layout">
          {this.props.plants && this.props.plants.map(post=> {
              return <PlantItem key={post.id} plant={post} />
          })}
        </div>
    );
  }
}
Gallery.propTypes = {
  accessToken: PropTypes.string.isRequired
}

export default Gallery;
