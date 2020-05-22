import React, { Component } from 'react'

export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delimiter: "|",
            lines: 2,
            tableData: []
        }
        this.filterData = this.filterData.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }
    componentDidMount() {
        this.filterData();
    }
    filterData() {
        let propsData = this.props.data.split("\n");
        let lines = this.state.lines || propsData.length;
        let delimiter = this.state.delimiter || "|";
        console.log(propsData);
        let tableData = [];
        propsData.map((item, index) => {
            if (index < lines) {

                tableData.push(item.split(delimiter));
            }
        })
        console.log(tableData);

        this.setState({
            tableData
        })
    }
    changeFilter(e) {
        let name = e.target.name;
        this.setState({
            [name]: e.target.value
        }, () => {
            this.filterData()
        })
    }
    render() {
        let { delimiter, lines, tableData } = this.state;
        console.log(this.props.data);

        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="delimiter">Delimiter</label>
                        <input type="text" onChange={this.changeFilter} value={delimiter} className="form-control" name="delimiter" id="delimiter" />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="lines">Lines</label>
                        <input type="text" onChange={this.changeFilter} value={lines} className="form-control" name="lines" id="lines" />
                    </div>
                </div>
                <table className="table table-striped">
                    {tableData.map((item, index) => {
                        return <tr key={index}>
                            {item.map(col => <td>{col}</td>)}
                        </tr>
                    })}
                </table>
            </React.Fragment>
        )
    }
}
