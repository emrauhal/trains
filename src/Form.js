import React, {Component} from 'react';
import './App.css';

class Form extends Component {

    state = {dep: '', arr: ''}

    newDeparture = (event) => {
        this.setState({dep: event.target.value});
    }

    newArrival = (event) => {
        this.setState({arr: event.target.value});
    }

    ready = (event) => {
        event.preventDefault();
        this.props.search(this.state.dep, this.state.arr);
    }

    render() {
        return (
            <div>
                <form className='pure-form'>
                    <fieldset>
                        <legend><b>Search for train timetables:</b></legend>

                        <select value={this.state.dep} onChange={this.newDeparture}>
                            <option> -- </option>
                            <option value='HKI'>Helsinki</option>
                            <option value='TKU'>Turku</option>
                            <option value='TPE'>Tampere</option>
                            <option value='OL'>Oulu</option>
                            <option value='ROI'>Rovaniemi</option>
                        </select>

                        <select value={this.state.arr} onChange={this.newArrival}>
                            <option> -- </option>
                            <option value='HKI'>Helsinki</option>
                            <option value='TKU'>Turku</option>
                            <option value='TPE'>Tampere</option>
                            <option value='OL'>Oulu</option>
                            <option value='ROI'>Rovaniemi</option>
                        </select>

                        <button onClick={this.ready} className="pure-button pure-button-primary">
                        Search for trains!</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default Form;