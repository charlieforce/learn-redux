import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios'; //to talk with backend api

const Photo = React.createClass({
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps')
    console.log(nextProps);
    this.setState({posts: nextProps.posts});
  },
  /**
   * For increment likes in database
   */
  IncLike(){
    var self = this;
    console.log(this.props);
    var postId = this.props.post.id;
    axios.put('/api/likes/inc', {
    id: postId
  })
  .then(function (response) {
    console.log(response);
    self.props.increment(self.props.post);
  })
  .catch(function (error) {
    console.log(error);
  });

  },
  render() {
    const { post, i, comments } = this.props;
    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
          <Link to={`/view/${post.id}`}>
            <img src={post.display_src} alt={post.caption} className="grid-photo" />
          </Link>

          <CSSTransitionGroup transitionName="like" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
            <span key={post.likes} className="likes-heart">{post.likes}</span>
          </CSSTransitionGroup>

        </div>

        <figcaption>
          <p>{post.caption}</p>
          <div className="control-buttons">
            <button onClick={this.IncLike} className="likes">&hearts; {post.likes}</button>
            <Link className="button" to={`/view/${post.id}`}>
              <span className="comment-count">
                <span className="speech-bubble"></span>
                {(post.comments && post.comments.length >= 1) ? post.comments.length : 0}
                {/*{comments[post.id] ? comments[post.id].length : 0 }*/}
              </span>
            </Link>
          </div>
        </figcaption>

      </figure>
    )
  }
});

export default Photo;
