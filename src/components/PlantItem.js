import React, { Component, PropTypes } from 'react';

import moment from 'moment';
import PouchDB from 'pouchdb';
window.PouchDB = PouchDB;
var db = new window.PouchDB('plantz');

// db.replicate.to('http://localhost:8091/pools');

const PlantComments = ({ comments }) => {
  return (
      <div>
        {comments.length && comments.map((comment)=> (
                <article key={comment.id} style={{ textAlign: 'left', marginRight: 8, marginBottom: 8 }}>
                  <span className="tag is-primary is-medium">{comment.like_count} likes</span>
                  <span style={{marginLeft: 5}}>{comment.message}</span>
                </article>
              )
            )
        }
      </div>
    )
  }

const PlantIdForm = ({ post }) => (
  <form onSubmit={(e)=> {
    e.preventDefault();
    const values = {
      _id: post.id,
      species: this.speciesField.value || null,
      names: this.namesField.value || null,
      location: this.locationField.value || null
    }
    db.put(values)
    console.log(values)
  }}>
    <div className="field">
      <div className="control">
        <input required ref={field=>{ return this.speciesField = field}} className="input is-medium" type="text" placeholder="Species Name" onChange={()=>true} />
      </div>
    </div>
    <div className="field">
      <div className="control">
        <textarea ref={field=>{ return this.namesField = field}} className="textarea" placeholder="Common names"></textarea>
      </div>
    </div>
    <div className="field">
      <div className="control is-loading">
        <input ref={field=>{ return this.locationField = field}} className="input" placeholder="Location" type="text"></input>
      </div>
    </div>
    <div className="field">
      <p className="control">
        <button type="submit" className="button is-success is-medium">
          Save
        </button>
      </p>
    </div>
  </form>
)


class PlantItem extends Component {
  constructor(props, context){
    super(props, context)
    this.state = {
      tab: 'comments'
    }
    this.setTab = this.setTab.bind(this);
  }
  getTab(tab, plant){
    switch(tab) {
      case 'comments' :  {
        if (plant.comments && plant.comments.data) {
          return <PlantComments comments={plant.comments.data} />
        }
        return null
      }
      case 'idForm' :  {
        let result = [<PlantIdForm post={plant}/>]
        if (plant.comments && plant.comments.data) {
          result = [<PlantComments comments={plant.comments.data} />, ...result]
        }
        return result
      }
    }
  }
  setTab(tab = 'comments') {
    this.setState({ tab })
  }
  render() {
    const { plant } = this.props
    return (
        <article key={plant.id} style={{ textAlign: 'left', overflow: 'hidden' }} className="masonry-layout-panel card">
            {plant.full_picture && <figure className="card-image">
              <img alt={plant.message} src={plant.full_picture} />
            </figure>}
            <div className="card-content">
              <div className="content">
                <span>{moment(plant.created_time).fromNow()}</span>
                <p className="is-size-5">{plant.message}</p>
              </div>
            </div>
            <div className="card-content">
              {this.getTab(this.state.tab, plant)}
            </div>
            <footer className="card-footer">
             <a className="card-footer-item" title="ID" onClick={() => this.setTab('idForm')}><span className="icon"><i className="fa fa-tag"></i></span></a>
             <a className="card-footer-item" title="Favorite" onClick={() => this.setTab('favorite')}><span className="icon"><i className="fa fa-heart"></i></span></a>
             <a className="card-footer-item" title="Comment" onClick={() => this.setTab('comments')}><span className="icon"><i className="fa fa-comment"></i></span></a>
           </footer>
        </article>
    );
  }
}
PlantItem.propTypes = {
  plant: PropTypes.shape({}).isRequired
}



export default PlantItem;
