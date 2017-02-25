// increment
export function increment(index) {
  return {
    type: 'INCREMENT_LIKES',
    index
  }
}

// add comment
export function addComment(postId, author, comment,posts) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment,
    posts
  }
}
// // add posts
export function addPosts(posts) {
  return {
    type: 'ADD_POSTS',
    posts
  }
}
// remove comment

export function removeComment(postId, i) {
  return {
    type: 'REMOVE_COMMENT',
    i,
    postId
  }
}
