import { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
    number = null;
    constructor() {
        super();
        this.state = {
            seenIndexes: [],
            values: [],
            index: '',
        }

        this.fetchIndexes = this.fetchIndexes.bind(this);
        this.fetchValues = this.fetchValues.bind(this);
    }

    // Do something if component load
    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        console.log(Object.entries(values.data));
        this.setState({values: Object.entries(values.data)});
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');

        this.setState({
            seenIndexes: seenIndexes.data
        });
        
    }
    handleSubmit = async (event) => {
        await axios.post('/api/values',{
            index: this.number.value
        });
    }

    render() {
        return (
            <>
                <div style={{padding: '20px', border: '2px solid #ececec', textAlign: "center", fontSize: "20px"}}>
                    <b>Fib Calculator</b>
                </div>
                <div className="container">
                    <div className="row" style={{width: '600px', paddingTop: '20px', margin:"auto auto"}}>
                        <div className="col-sm-5">Enter your index</div>
                        <div className="col-sm-4"><input type="text" name="number" ref={(c) =>  this.number=c} className="form-control" /></div>
                        <div className="col-sm-3"><input type="button" name="fib" value="Submit" onClick={this.handleSubmit} className="btn btn-lg"/></div>
                    </div>
                </div>

                <div className="container">
                    <div className="row" style={{width: '600px', paddingTop: '20px', margin:"auto auto"}}>
                        <div className="col-sm-12">Indicies I have seen</div>
                        <div className="col-sm-12">
                            {this.state.seenIndexes && this.state.seenIndexes.map((data,index) => {
                                console.log(data);
                                return (<span>{data.number}</span>);
                            })}
                            
                        </div>
                    </div>
                </div>


                <div className="container">
                    <div className="row" style={{width: '600px', paddingTop: '20px', margin:"auto auto"}}>
                        <div className="col-sm-12">Calculated Values</div>
                        <div className="col-sm-12"> 
                            {this.state.values && this.state.values.map((data,index) => {
                                return (<div>For Index {data[0]} | Calculated {data[1]} </div>);
                            })}                            
                        </div>
                    </div>
                </div>                

            </>
        );
    }
}

export default Fib;