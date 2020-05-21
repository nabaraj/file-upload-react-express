import React from 'react';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:8000/upload", data, {
      // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
      console.log(res.statusText)
    })
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  render() {
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input onChange={this.onChangeHandler} type="file" accept=".txt" />
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
