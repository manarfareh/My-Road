import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './Accident.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Accident {
  title: string;
  CountryName: string;
  description: string;
  link: string;
}

const Accident = () => {
  const [accidents, setAccidents] = useState<Accident[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); 

  useEffect(() => {
    const fetchAccidents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/accidents');
        setAccidents(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'accident', error);
      }
    };

    fetchAccidents();
  }, []);

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccidents = accidents.filter((accident) =>
    accident.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5 move-right"> 
      <h1 className="text-center mb-4">Liste des accidents</h1>
      <div className="mb-3">
        <label htmlFor="searchTerm" className="form-label">Rechercher un accident :</label>
        <input
          type="text"
          className="form-control"
          id="searchTerm"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>

      <div className="row">
        {filteredAccidents.map((accident, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{accident.title}</h5>
                <p className="card-text">{accident.description}</p>
                <a href={accident.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accident;
