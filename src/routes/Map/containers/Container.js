import React from 'react';
import MapView from '../components/Map'
import FormView from '../components/Form'


const containerStyle = {
	padding:'0px',
	margin:'0px',
	width:'auto'
}

const rowStyle = {
	padding:'0px',
	margin: '0px'

}
const columnStyle = {
	padding:'0px',
	margin: '0px'

}

export default class Container extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
		circles: [],
		markers: [],
	}
		this.handleCircleUpdate = this.handleCircleUpdate.bind(this)
		this.handleMarkerUpdate = this.handleMarkerUpdate.bind(this)

	}

	handleCircleUpdate(nextCircle){
	    this.setState({
	      circles: nextCircle
	    });
	}

	handleMarkerUpdate(nextMarkers){
	    this.setState({
	      markers: nextMarkers
	    });
	}
	render() {
	    return (
	    	<div className="container" style = {containerStyle}>
				<div className="row" style={rowStyle}>
				    <div className="col-sm-3" ><FormView updateCircle = {this.handleCircleUpdate} updateMarker = {this.handleMarkerUpdate}/></div>
				    <div className="col-sm-9" style={columnStyle}  ><MapView circles={this.state.circles} markers={this.state.markers} ref={child => { this.child = child; }}/></div>
				</div>
				
			</div>

      	
	    )
	}

}

