import React, {useState} from 'react';
import * as nodeData from "./train-stations.json"
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
    InfoWindow
  } from 'react-google-maps'
import mapStyles from "./mapStyles";

    
  const Map = (nodeData)=>{
    const [selectedPark, setSelectedPark] = useState(null);

    return(
      <GoogleMap 
      defaultZoom={8}
      defaultCenter={{ lat: 9.9356284, lng: -84.1483645}}
      defaultOptions={{styles: mapStyles}}
      >
        {nodeData.trainStations.map((stations) => (
          <Marker 
            key={stations.data.NAME} position = {{
              lat: stations.position.coordinates[0],
              lng: stations.position.coordinates[1]
            }}
            onClick={() => {
              setSelectedPark(stations);
            }}
            icon={{
              url: '/train.svg',
              scaledSize: new window.google.maps.Size(40,40)
            }}
          />
        ))}

        {selectedPark && (
          <InfoWindow
            position={{
              lat: selectedPark.position.coordinates[0],
              lng: selectedPark.position.coordinates[1]
            }}
            onCloseClick={()=> {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>
                {selectedPark.data.NAME}
              </h2>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  }
  
  export default withScriptjs(
    withGoogleMap(
      Map
    )
  )