import React from 'react'
import Websocket from 'react-websocket'

const containerStyle ={
		alignItems : 'center',
		display:'inlineBlock',
		height:'80vh',
    	verticalAlign: 'middle'
	}

const formStyle = {

	textAlign: 'center',
	verticalAlign: 'middle',
	position: 'relative',
    top: '10%'
}
const buttonStyle = {

	width:'200px',
	marginBottom: '5px',
}
const inputStyle = {
	marginTop:'10px',
	marginBottom:'10px'
}

export default class FormComponent extends React.Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    				search: '',
	    				markers: [],
	    				circles: [],
	    				connect: false,
	    				query: false
	    				
	};
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleStop = this.handleStop.bind(this);
	    this.updateConnection = this.updateConnection.bind(this);
	    this.updateQuery = this.updateQuery.bind(this);
	    this.handleReconnect = this.handleReconnect.bind(this);
	    this.handleCleanMap = this.handleCleanMap.bind(this);
	    this.handleCloseConnection = this.handleCloseConnection.bind(this)


	}
	updateConnection(flag){
    	this.setState({connect: flag});
    }
    updateQuery(flag){
    	this.setState({query: flag});
    }

	componentDidMount(){
	    var selfme = this
	    var geocoder = new google.maps.Geocoder();
	    // listen to onmessage event

	    this.connection = new WebSocket('ws://localhost:9000/message');
	    this.updateConnection(true)
	    alert('You have connected to Neruti Web Socket at Port 9000')
	    this.connection.onmessage = evt => { 
	    	var sentimentColor = 'red'
	    	
	    	const baseUrl = "http://localhost:3000/"
	    	var iconPath = baseUrl + 'tweet-red.png'

	    	const senti = JSON.parse(evt.data).sentiment
    		if(senti==1){
    			sentimentColor = 'orange'
    			iconPath = baseUrl + 'tweet-orange.png'
    		} else if(senti==2){
    			sentimentColor = 'blue'
    			iconPath = baseUrl + 'tweet-blue.png'
    		} else if(senti==3){
    			sentimentColor = 'teal'
    			iconPath = baseUrl + 'tweet-teal.png'
    		} else if(senti==4){
    			sentimentColor = 'green'
    			iconPath = baseUrl + 'tweet-green.png'
    		}
    		const random = (Math.random() * (0.00009 + 0.00009) - 0.00009)
    		const random2 = (Math.random() * (0.00009 + 0.00009) - 0.00009)
    		const area = JSON.parse(evt.data).status.user.followersCount*100
	    	geocoder.geocode({address: JSON.parse(evt.data).status.user.location}, function(results, status) {

			    if (status == google.maps.GeocoderStatus.OK) {
			    	const latitude = parseFloat(results[0].geometry.location.lat())+random
    				const lngitude = parseFloat(results[0].geometry.location.lng())+random2
			    	const nextCircles = [
				    	...selfme.state.circles,
				    	{	
				    		
				    		center: {
				    			lat: latitude,
				    			lng: lngitude
				    		},
					        key:Date.now(),
					        defaultAnimation: 2,
					        radius:area,
					        options: {
					          fillColor: sentimentColor,
					          fillOpacity: 0.20,
					          strokeColor: 'white',
					          strokeOpacity: 1,
					          strokeWeight: 1,
					        }
				    	},
				    ];
				     const nextMarkers = [
					      ...selfme.state.markers,
					      {
					        position: {

					        	lat: latitude,
				    			lng: lngitude},
					        defaultAnimation: 2,
					        showInfo : false,
					        icon: iconPath,
					        header:JSON.parse(evt.data).status.user.name,
					        content:JSON.parse(evt.data).status.text,
					        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
					      },
					    ];
				    selfme.updateCircles(nextCircles)
				    selfme.updateMarkers(nextMarkers)
				    selfme.setState({
				         circles: nextCircles,
				         markers: nextMarkers
				    });

			    }
			  }, this);
	    }
    }
    updateCircles(nextCircles){
	  this.props.updateCircle(nextCircles);
	}
	updateMarkers(nextMarkers){
	  this.props.updateMarker(nextMarkers);
	}

	
	handleChange(event) {
		this.setState({search: event.target.value});
	}
	handleData(data) {
  		console.log(data)
  		this.connection.onmessage = evt => { 
			this.setState({
		  	messages : this.state.messages.concat([ evt.data ])
	  		})
		}
    }

    
    getInitialState(){
	  	return { messages : [] }
	}
	handleSubmit(event){
		this.connection.send(this.state.search)
		this.updateQuery(true)
    	event.preventDefault();	

	}
	handleStop(){
		this.connection.send("nrt-stop-1989-there-shall-be-no-such-query")
		this.updateQuery(false)
	}
	handleCloseConnection(){
		this.connection.close()
		this.updateConnection(false)
	}

	handleReconnect(){
		this.connection = new WebSocket('ws://localhost:9000/message');
	    this.updateConnection(true)
	    alert('You have connected to Neruti Web Socket at Port 9000')
	}
	handleCleanMap(){
		this.updateCircles([])
	    this.updateMarkers([])
	    this.setState({
	         circles: [],
	         markers: []
	    });
	}

	render() {
	    return (
	    	<div style = {containerStyle}> 
				<form  style={formStyle} onSubmit={this.handleSubmit}>
					<div className="input-group" style={inputStyle}>
						<span className="input-group-addon" id="basic-addon1">Search</span>
						<input className="form-control" id="search" value={this.state.search} onChange={this.handleChange}></input>
					</div>
					<input disabled={!this.state.connect||this.state.query} type="submit" className="btn btn-primary" style={buttonStyle}  value="Submit"></input>

				</form>
				<div style={formStyle}>
					<button disabled={!this.state.connect || !this.state.query}  className="btn btn-warning" style={buttonStyle} onClick={this.handleStop}>Stop</button>
					<button disabled={!this.state.connect||this.state.query}  className="btn btn-warning" style={buttonStyle} onClick={this.handleCleanMap}>Clean Map</button>
					<button disabled={!this.state.connect}  className="btn btn-danger" style={buttonStyle} onClick={this.handleCloseConnection}>Close Connection</button>
					<button disabled={this.state.connect}  className="btn btn-info" style={buttonStyle} onClick={this.handleReconnect}>Reconnect</button>
					
				</div>
			</div>

      	
	    )
	}
}
