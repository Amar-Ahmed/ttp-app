import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    // async function getData() {
    //   const res = await fetch('https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=1&locationId=5140&minimum=1');
    //   const data = await res.json();
    // }
    // getData();
    const locationId = locations.map(val => val.id)

    const dataAll = Promise.all(locationId.map(id =>
      fetch(`https://ttp.cbp.dhs.gov/schedulerapi/slots?orderBy=soonest&limit=1&locationId=${id}&minimum=1`).then(resp => resp.json())
    ))
    dataAll.then(e => setData(e))
  }, []);

  function renderTable() {
    if (data) {
      return data.map(value => {
        let locationName = ''
        if (value[0]?.locationId) {
          locationName = locationKey[value[0]?.locationId]
        }
         if (value[0]?.locationId) {
          return (<tr>
            <td>{value[0]?.locationId}</td>
            <td>{locationName}</td>
            <td>{value[0]?.endTimestamp}</td>
          </tr>)        }

      })
    }
  }

  return (
    <main>
      <h2>TTP-App</h2 >
      {/* {data ? <p>{data.endTimestamp}</p> : null} */}
      <table>
        <tr>
          <th>Location ID</th>
          <th>Location Name</th>
          <th>Time</th>
        </tr>
        {renderTable()}
      </table>
      
      <br />
      {/* <h2>The date according to Go is:</h2> */}
      {/* <p>{data ? data : 'Loading date...'}</p> */}
    </main>
  );
}

export default App;

const locations = [
  { id: 8120, name: 'Washington, DC Enrollment Center' },
  { id: 7940, name: 'Balt/Wash Intl Thurgood Marshall Airport' },
  { id: 5140, name: 'JFK International Global Entry EC' },
  { id: 6480, name: 'U.s. Custom House - Bowling Green' },
  { id: 5445, name: 'Philadelphia International Airport' },
  { id: 5400, name: 'San Juan Global Entry Enrollment Center' },
  { id: 5142, name: 'Washington Dulles International Global Entry EC' }
]
const locationKey = {
  8120: 'Washington, DC Enrollment Center',
  7940: 'Balt/Wash Intl Thurgood Marshall Airport',
  5140: 'JFK International Global Entry EC',
  6480: 'U.s. Custom House - Bowling Green',
  5445: 'Philadelphia International Airport',
  5400: 'San Juan Global Entry Enrollment Center',
  5142: 'Washington Dulles International Global Entry EC'
}