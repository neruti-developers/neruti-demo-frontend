import { withGoogleMap } from "react-google-maps";
import { GoogleMap } from "react-google-maps";
import { Marker } from "react-google-maps";
import { Circle } from "react-google-maps";
import { InfoWindow } from "react-google-maps";

import Websocket from 'react-websocket';

var React = require('react');

import Helmet from "react-helmet";

export default class MapComponent extends React.Component {
	state = {
    markers: [],
    tweets:''
  };


  handleMapLoad = this.handleMapLoad.bind(this);
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleCloseClick = this.handleCloseClick.bind(this);

  handleMarkerRightClick = this.handleMarkerRightClick.bind(this);
  handleMapLoad(map) {
    this._mapComponent = map;
    if (map) {
      console.log(map.getZoom());
    }
  }

  handleMarkerRightClick(targetMarker) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    const nextMarkers = this.state.markers.filter(marker => marker !== targetMarker);
    this.setState({
      markers: nextMarkers,
    });
  }

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
  this.setState({ markers: nextProps.markers });
}

   handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
        	alert(marker.header+" said "+marker.content)
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }


  render() {
    return (
      <div style={{height: `800px`}}>
        <Helmet
          title="Neruti Demo "
        />
        <GettingStartedGoogleMap
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.handleMapClick}
          markers={this.state.markers}
          circles={this.props.circles}
          onMarkerClick={this.handleMarkerClick}
          onCloseClick={this.handleCloseClick}
          onMarkerRightClick={this.props.handleMarkerRightClick}
        />
      </div>
    );
  }
}
  

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={3}
    defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
    onClick={props.onMapClick}
  >
  	{props.circles.map(circle => (
      <Circle
        {...circle}
      />
    ))}
    
    {props.markers.map(marker => {
      const onClick =()=>  props.onMarkerClick(marker);
      const onCloseClick =()=> props.onCloseClick(marker);
      return (
        <Marker
          {...marker}
          onClick={onClick}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.header}</strong>
                <br />
                <em>{marker.content}</em>
              </div>	
            </InfoWindow>
          )}
        </Marker>
	);
    })}
    
  </GoogleMap>
));