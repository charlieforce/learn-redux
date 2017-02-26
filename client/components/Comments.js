import React from 'react';
import axios from 'axios'; //to talk with backend api

const Comments = React.createClass({
  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment" onClick={this.props.removeComment.bind(null, this.props.params.postId, i)}>&times;</button>
        </p>
      </div>
    )
  },
  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    const { postId } = this.props.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
     console.log('here is props');
     console.log(self.props)
    axios.post("/api/comments/create", {
        id: postId,
        user:author,
        text:comment
      })
      .then(function (response) {
        console.log(response);
        self.props.addComment(postId, author, comment,self.props.posts);
            self.refs.commentForm.reset();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  render() {
    return (
      <div className="comments">
        {this.props.postComments.map(this.renderComment)}
        <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
          <input type="text" ref="author" placeholder="author"/>
          <input type="text" ref="comment" placeholder="comment"/>
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
});

export default Comments;
