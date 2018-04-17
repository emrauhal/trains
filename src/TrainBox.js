import React, {Component} from 'react';
import Form from './Form';
import './App.css';

let depst;
let arrst;

class TrainBox extends Component {

    state = {data: []};

    dothesearch = (dep, arr) => {
        depst = dep;
        arrst = arr;
        const baseurl = 'https://rata.digitraffic.fi/api/v1/live-trains/station/';

        fetch(baseurl + depst + '/' + arrst)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong");
            })
            .then(function(json) {
                this.setState({data: json});
            }.bind(this))
    }

    render() {
        var trains;

        if (this.state.data.length === 0) {
            trains = 'No data';
        } else if (this.state.data.length === undefined) {
            trains = 'No straight connections matching your search'
        } else {
            trains = this.state.data
                .map(function (train) {
                    return (
                        <table>
                            <tbody>
                                <tr>
                                    <th>Train</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                </tr>
                                <Train train={train} key={train.trainNumber}/>
                            </tbody>
                        </table>
                    )
                });
        }

        return (
            <div>
                <Form search={this.dothesearch}/>
                <p>Next trains leaving:</p>
                {trains}
            </div>
        );
    }
}

export const Train = (props) => {
    var traininfo;
    var deptime;
    var arrtime;

    var timetab = props.train.timeTableRows;
    for (var i = 0; i < timetab.length; i++) {
        if (timetab[i].stationShortCode === depst && timetab[i].type === 'DEPARTURE') {
            deptime = timetab[i].scheduledTime.substring(0,10) + ' ' +
                timetab[i].scheduledTime.substring(11,16);
        }
        if (timetab[i].stationShortCode === arrst && timetab[i].type === 'ARRIVAL') {
            arrtime = timetab[i].scheduledTime.substring(0,10) + ' ' +
                timetab[i].scheduledTime.substring(11,16);
        }
    }

    if (props.train.commuterLineID !== '') {
        traininfo = props.train.commuterLineID;
    } else {
        traininfo = props.train.trainType + props.train.trainNumber;
    }

    return (
        <tr className="train">
            <td>{traininfo}</td>
            <td>{deptime}</td>
            <td>{arrtime}</td>
        </tr>
    )
}

export default TrainBox;