import React, { useState, useEffect } from "react";
import './App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/names.json")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching the JSON data:", error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h2>Country Search</h2>
      <input
        type="text"
        placeholder="Search by country or capital..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <li key={index}>
              <strong>{country.name}</strong> - {country.capital}
            </li>
          ))
        ) : (
          <li className="no-result">No countries found</li>
        )}
      </ul>
    </div>
  );
};

export default App;
