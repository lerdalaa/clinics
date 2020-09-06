import React,{ useState, useEffect } from 'react';
import { listEntries } from '../API';

function Sidebar(props) {
  const [entries, setEntries] = useState([]);

  const getEntries = async () => {
    const entriesFromDb = await listEntries();
    setEntries(entriesFromDb);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const [viewport, setViewport] = useState({
    width: '30%',
    height: '100vh',
  });

  return (
    <div className="sidebar">
      <div className="filters">
        <h3>filters</h3>
      </div> 
      <div className="listedEntries">

      </div> 
    </div>
    
  );
}

export default Sidebar;