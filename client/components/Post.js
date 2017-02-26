import React from 'react';
import axios from 'axios'; //to talk with backend api

const Post = React.createClass({
  uploadForm (el){
			el.preventDefault();
      var file = document.getElementById('upload').files[0];
		console.log('Saving image as data string');
		var reader = new FileReader();
		var fileName = '',orgFile;
		  reader.onload = function() {
			
			var arrayBuffer = this.result;
      console.log(arrayBuffer)
			 // orgFile = new Uint8Array(arrayBuffer);
       // orgFile = btoa(orgFile);
       orgFile = arrayBuffer;
       //'data:image/'+ext+';base64,'+orgFile
        //console.log(orgFile);
        var file = document.getElementById('upload').value;
        var fileName = file.split("\\").pop();
        var ext = file.slice(file.indexOf('.')+1,file.length);
        console.log(document.getElementById('caption').value)
        console.log('triggering form submit...');
        axios.post("/api/posts/create/data", {
        caption: document.getElementById('caption').value,
        userImage: orgFile,
        fileName :fileName,
        ext:ext
      })
      .then(function (response) {
        console.log(response);
        window.location = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
		  }
		  reader.readAsDataURL(file);
  },
  render() {
    return (
      <div className="Post-form" className="add_new_post">
        <form ref="postForm" className="comment-form" onSubmit={this.uploadForm} id="mainForm">
          <input type="file" ref="userImage" name="userImage" id="upload" />
          <input type="text" ref="caption" placeholder="Caption" name="caption" id="caption"/>
          <input type="submit" hidden />
        </form>
      </div>
    )
  }
});

export default Post;
