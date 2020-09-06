import React,{ useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listEntries } from '../API';
import EntryForm from '../components/EntryForm';


import '../App.css';



function Map(props) {
  const [viewport, setViewport] = useState({
    width: '70%',
    height: '100vh',
    latitude: 56.911491,
    longitude: 10.757933,
    zoom: 3
  });
  
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  const [ShowAll, setShowAll] = useState(true);
  const [PhysioFilter, setPhysioFilter] = useState(false);
  const [ChiropracticFilter, setChiropracticFilter] = useState(false);

  const getEntries = async () => {
    const entriesFromDb = await listEntries();
    console.log(entriesFromDb);

    let filteredEntries;
    
    if (ShowAll) {
      console.log("this is happening showall");
      filteredEntries = entriesFromDb;
    } else if (PhysioFilter) {
      console.log("this is happening physiofilter");
      filteredEntries = entriesFromDb.filter(entry => entry.tags === "physio");
    } else if (ChiropracticFilter) {
      console.log("this is happening chirofilter");
      filteredEntries = entriesFromDb.filter(entry => entry.tags === "chiropractic");
    };

    console.log("ShowAll = " + ShowAll);
    console.log("PhysioFilter = " + PhysioFilter);
    console.log("ChiropracticFilter = " + ChiropracticFilter);

    console.log(filteredEntries);

    setEntries(filteredEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    props.user ? setAddEntryLocation({latitude,longitude,}) : alert('must be logged in to create event');
  };


  // FILTER SETTINGS

  
  const showPhysio = (event) => {

    setChiropracticFilter(false);
    setPhysioFilter(true);
    setShowAll(false);
    
    
    getEntries();
  };

  const showChiropractic = (event) => {
    
    setChiropracticFilter(true);
    setPhysioFilter(false);
    setShowAll(false);

    getEntries();
  };

  const showAll = (event) => {
    setShowAll(true);

    getEntries();
  };

  return (
    <div className="canvas">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={'pk.eyJ1IjoiYXBldGlzcyIsImEiOiJjazZndzgzMzgwb2dpM2xtdHk5bzZkZ3YzIn0.h8Jn6ItxGFHElPDwxPhB7g'}
        onViewportChange={setViewport}
        onDblClick={showAddMarkerPopup}
        captureDoubleClick={false}
      >
        {
          entries.map(entry => (
            <React.Fragment key={entry._id}>
              <Marker key={entry._id} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={0} offsetTop={0}>
              <div
                onClick={() => setShowPopup({
                  [entry._id]: true,
                })}
              >
                <svg
                  className="marker yel"
                  stroke="none"
                  style={{
                    height: `24px`,
                    width: `24px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top" >
                  <div className="popup">
                      <h3>{entry.title}</h3>
                      <p>{entry.tags}</p>
                    </div>
                </Popup>
              ) : null
            }
            </React.Fragment>
            
          ))
        }
        {
          addEntryLocation ? (
            <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >
              <div>
                <svg
                  className="marker custom-red"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top" >
              <div className="popup">
                <EntryForm onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }} location={addEntryLocation} />
              </div>
            </Popup>
            </>
          ) : null
        }
        
      </ReactMapGL>
      <div className="sidebar">
        <div className="filters">
          <h3>filters</h3>
          <p><a class="waves-effect waves-light btn" onClick={showPhysio}>Show physio</a></p>
          <p><a class="waves-effect waves-light btn" onClick={showChiropractic}>Show chiropractic</a></p>
          <p><a class="waves-effect btn" onClick={showAll}>Show all</a></p>
          
        </div> 
         
      </div>
    </div>
  );
}

export default Map;