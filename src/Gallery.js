import React, { Component, PropTypes } from 'react';

import moment from 'moment'

import graph from 'fbgraph';

const FB_QUERY = "156706504394635/feed?fields=full_picture,picture,message,comments{like_count,message},link,object_id,created_time&limit=200&include_hidden=true";


class Gallery extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      plants: []
    }
  }
  componentWillMount(){
    this.props.getPlants();
  }

  render() {
    return (
        <div className="masonry-layout">
          {this.props.plants && this.props.plants.map(post=> {
            return (
                <div key={post.id} style={{ textAlign: 'left' }} className="masonry-layout-panel box">
                  <article className="content">
                    {post.full_picture && <figure className="image">
                      <img alt={post.message} src={post.full_picture} />
                    </figure>}

                    <span>{moment(post.created_time).fromNow()}</span>
                    <p className="is-size-5">{post.message}</p>
                    <div>
                      {post.comments && post.comments.data && post.comments.data
                          .map((comment)=> {
                        return (
                          <article style={{ textAlign: 'left', padding: 8 }}>
                            <span className="tag is-primary is-medium">{comment.like_count} likes</span>
                            <span style={{marginLeft: 5}}>{comment.message}</span>
                          </article>
                        )
                      })}
                    </div>
                  </article>
              </div>
            )
          })}
        </div>
    );
  }
}
Gallery.propTypes = {
  accessToken: PropTypes.string.isRequired
}

export default Gallery;
