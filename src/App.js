import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
  withGoogleMap(props =>
    <GoogleMap
      ref={props.onBoundsChanged}
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
      options={{ gestureHandling: 'none', zoomControl: false }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
      <Marker
        position={{ lat: -34.307, lng: 140.644 }}
      />
    </GoogleMap>
  )
);


class App extends Component {
  render() {
    const checkBound = googleMap=>{
      var ok = true;
      if (googleMap.getBounds() === undefined)
          ok = false;

      if (! ok) {
        console.log("yet not ok")
        setTimeout(()=>{checkBound(googleMap)}, 100);
      }
      else {
            //ok to query bounds here
            console.log(googleMap.getBounds());
            var bounds = googleMap.getBounds();
            bounds.extend({ lat: -34.397, lng: 150.644 });
            bounds.extend({ lat: -34.307, lng: 140.644 });
            googleMap.fitBounds(bounds);
      } 
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <MapWithAMarker
            onMapLoad={(googleMap) => {
                console.log(googleMap.getBounds())
            }}
            onBoundsChanged={(googleMap) => {
              checkBound(googleMap)
            }}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%`,width:`40vw` }} />}
          />
        </div>
      </div>
    );
  }
}

export default App;
