import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import store from '../store';
const Main = React.createClass({ 
  // getInitialState: function() {
  //   return {
  //     loaded:true,
  //     comments:[]
  //   }
  // },
   componentDidMount: function() {
    var _this = this;
    this.serverRequest = 
      axios
        .get("/api/posts/random")
        .then(function(result) {    
            console.log(result.data.data);
          console.log('Mounted :'+_this.isMounted());
          const posts = result.data.data;
        _this.setState({
           loaded:true,
           posts:result.data.data
         });
         console.log(_this.state.posts)
        });
  },
  componentWillUnmount: function() {
   // this.serverRequest.abort();
  },
     render() {
      return (
      <div>
        <h1>
          <Link to="/">Charliestagram</Link>
        </h1>
        {React.cloneElement({...this.props}.children, {...this.props})}
      </div>
    )
  }
});

export default Main;
