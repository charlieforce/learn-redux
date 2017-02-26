import React from 'react';
import Photo from './Photo';
import { Link } from 'react-router'

const PhotoGrid = React.createClass({
  render() {
    return (
      <div>
      <div className="add_new_btn">
        <Link className="button" to={`/add`}>
          <button>Add New </button>
        </Link>
      </div>
      <br></br>
      <div className="photo-grid">
        {this.props.posts.map((post, i) => <Photo {...this.props} key={i} i={i} post={post} />)}
      </div>
      </div>
    )
  }
});

export default PhotoGrid;
