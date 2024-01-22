// RoadClosure.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoadClosure.css';

interface Road {
  routeId: number;
  routeName: string;
  routeCountry: string;
  routeCity: string;
  timeClosure: string;
  dayClosure: string;
  reasonClosure: string;
}

const RoadClosure: React.FC = () => {
  const [roads, setRoads] = useState<Road[]>([]);
  const [filteredRoads, setFilteredRoads] = useState<Road[]>([]);
  const [filter, setFilter] = useState<string>(''); // The filter string

  useEffect(() => {
    const fetchRoads = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8084/ws',
          `
            <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:road="http://spring.io/guides/roadclosures">
               <soapenv:Header/>
               <soapenv:Body>
                  <road:GetAllRoads/>
               </soapenv:Body>
            </soapenv:Envelope>
          `,
          {
            headers: {
              'Content-Type': 'text/xml',
            },
          }
        );

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        const roadsArray = Array.from(xmlDoc.querySelectorAll('Road')).map((roadNode) => {
          return {
            routeId: Number(roadNode.querySelector('routeId')?.textContent),
            routeName: roadNode.querySelector('routeName')?.textContent || '',
            routeCountry: roadNode.querySelector('routeCountry')?.textContent || '',
            routeCity: roadNode.querySelector('routeCity')?.textContent || '',
            timeClosure: roadNode.querySelector('timeClosure')?.textContent || '',
            dayClosure: roadNode.querySelector('dayClosure')?.textContent || '',
            reasonClosure: roadNode.querySelector('reasonClosure')?.textContent || '',
          };
        });

        setRoads(roadsArray);
        setFilteredRoads(roadsArray); // Initialize filtered roads with all roads
      } catch (error) {
        console.error('Error fetching roads:', error);
      }
    };

    fetchRoads();
  }, []);

  // Function to filter roads based on the input filter string
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilter(searchTerm);

    // Filter the roads based on the criteria
    const filtered = roads.filter(
      (road) =>
        road.routeName.toLowerCase().includes(searchTerm) ||
        road.routeCountry.toLowerCase().includes(searchTerm) ||
        road.routeCity.toLowerCase().includes(searchTerm) ||
        road.timeClosure.toLowerCase().includes(searchTerm)
    );

    setFilteredRoads(filtered);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Road Closure List</h1>
      {/* Use Bootstrap input group with addon for filtering */}
      <div className="input-group mb-3">
        <span className="input-group-text" id="filter-addon">
          Filter
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Name, Country, City, or Closure Time"
          aria-label="Filter"
          aria-describedby="filter-addon"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredRoads.map((road, index) => (
          <div key={road.routeId} className="col">
            <div className={`card mb-3 fade-in delay-${index + 1}`}>
              <div className="card-body">
                <h5 className="card-title">{road.routeName}</h5>
                <p className="card-text">
                  {road.routeCity}, {road.routeCountry}
                  <br />
                  Closure Time: {road.timeClosure}
                  <br />
                  Closure Date: {road.dayClosure}
                  <br />
                  Reason for Closure: {road.reasonClosure}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadClosure;