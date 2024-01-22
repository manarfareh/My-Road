import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TrafficItem {
  Id: string;
  StreetName: string;
  CountryName: string;
  TrafficPercentage: string;
  CityName: string;
}

function Traffic() {
  const [trafficData, setTrafficData] = useState<TrafficItem[]>([]);
  const [cityName, setCityName] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8088/ws',
          `
          <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://Route.Traffic.com">
          <soapenv:Header/>
          <soapenv:Body>
            <web:getTrafficRequest>
              <web:CityName>${cityName}</web:CityName>
              <web:StreetName>${streetName}</web:StreetName>
            </web:getTrafficRequest>
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
        const trafficArray = Array.from(xmlDoc.querySelectorAll('Traffic')).map((trafficNode) => {
          return {
            Id: trafficNode.querySelector('Id')?.textContent ?? '',
            StreetName: trafficNode.querySelector('StreetName')?.textContent ?? '',
            CountryName: trafficNode.querySelector('CountryName')?.textContent ?? '',
            TrafficPercentage: trafficNode.querySelector('TrafficPercentage')?.textContent ?? '',
            CityName: trafficNode.querySelector('CityName')?.textContent ?? '',
          };
        });

        setTrafficData(trafficArray);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de trafic :', error);
      }
    };

    fetchData();
  }, [cityName, streetName]);

  const getTrafficPercentageColor = (percentage: string) => {
    const numericPercentage = parseFloat(percentage);

    if (numericPercentage <= 30) {
      return 'text-warning'; // Jaune
    } else if (numericPercentage <= 60) {
      return 'text-orange'; // Orange
    } else {
      return 'text-danger'; // Rouge
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
      <div className="card-header bg-primary text-white">
       <h1 className="text-center mb-1 h4">Traffic</h1>
       </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nom de la ville :</label>
              <input type="text" className="form-control" value={cityName} onChange={(e) => setCityName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Nom de la rue :</label>
              <input type="text" className="form-control" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Nom du pays</th>
                  <th>Nom de la rue</th>
                  <th>Nom de la ville</th>
                  <th>Pourcentage de trafic</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.map((trafficItem, index) => (
                  <tr key={index}>
                  <td>{trafficItem.CountryName}</td>
                    <td>{trafficItem.StreetName}</td>
                    <td>{trafficItem.CityName}</td>
                    <td className={getTrafficPercentageColor(trafficItem.TrafficPercentage)}>
                      {trafficItem.TrafficPercentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Traffic;
