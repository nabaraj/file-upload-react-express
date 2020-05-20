import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageURL: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    const formData = new FormData();
    const uploadedFile = this.uploadInput.files[0];
    data.append('file', uploadedFile);
    data.append('filename', uploadedFile.name);
    axios.post('http://localhost:8000/upload', {
      body: data,
    }).then((response) => {
      console.log(response.data);
    }).catch(err => {
      console.log('err');

    });
  }

  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".txt" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img src={this.state.imageURL} alt="img" />
      </form>
    );
  }
}

export default Main;
