// a reducer takes in two things:

// 1. the action (info about what happened)
// 2. copy of current state

function posts(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_LIKES' :
      var post = action.index;
      post.likes = post.likes + 1;
      return Object.assign([],state,post); 
      break;
      case 'NEW_POSTS':
        console.log('in reducer here comes new posts');
      console.log(action.payload.posts);
      var posts = action.payload.posts;
      //return immutable state (pulling state things as it is and than updating posts part only)
        return Object.assign([],posts);
      break;
    default:
    console.log('return default state')
      return state;
  }
}

export default posts;
