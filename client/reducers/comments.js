function postComments(state = [], action) {
  switch(action.type){
    case 'ADD_COMMENT':
    console.log('Adding new comment');
    console.log(action)
    var post = {};
      // return the new state with the new comment
      for(var items in action.posts){
        console.log(action.posts[items]['id']);
        if(action.posts[items]['id'] === action.postId){
           post = action.posts[items];
          break;
        }
      }
      if(!post.comments)
        post.comments = [{
            user: action.author,
            text: action.comment
          }];
      else
        post.comments.push({
            user: action.author,
            text: action.comment
          });
      return  Object.assign([],state,post);
      break;
    case 'REMOVE_COMMENT':
      // we need to return the new state without the deleted comment
      return [
        // from the start to the one we want to delete
        ...state.slice(0,action.i),
        // after the deleted one, to the end
        ...state.slice(action.i + 1)
      ]
    default:
      return state;
  }
  return state;
}

function comments(state = [], action) {
  if(typeof action.postId !== 'undefined') {
    return {
      // take the current state
      ...state,
      // overwrite this post with a new one
      [action.postId]: postComments(state[action.postId], action)
    }
  }
  return state;
}

export default comments;
