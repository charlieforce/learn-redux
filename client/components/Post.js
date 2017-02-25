import React from 'react';

const Post = React.createClass({
  render() {
    return (
      <div className="Post-form" className="add_new_post">
        <form ref="postForm" className="comment-form" action="/api/posts/create" method="post" encType="multipart/form-data">
          <input type="file" ref="userImage" name="userImage" />
          <input type="text" ref="caption" placeholder="Caption" name="caption"/>
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
});

export default Post;
