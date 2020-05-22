import React from 'react';
import axios from 'axios';
import TableComponent from './TableComponent';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      data: ""
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.formDisplay = this.formDisplay.bind(this);
  }

  handleUploadImage(ev) {

    ev.preventDefault();

    const data = new FormData()
    data.append('file', this.state.selectedFile)
    axios.post("http://localhost:8000/upload", data, {
      // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
      console.log(res.statusText)
      this.setState({
        data: res.data
      })
    })
  }
  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }
  formDisplay() {
    return (<form onSubmit={this.handleUploadImage}>
      <div>
        <input onChange={this.onChangeHandler} type="file" accept=".txt" />
      </div>

      <br />
      <div>
        <button>Upload</button>
      </div>
    </form>)
  }
  render() {
    let { data } = this.state;
    return (data ? <TableComponent data={this.state.data} /> : <this.formDisplay></this.formDisplay>
    )

  }
}

export default Main;
