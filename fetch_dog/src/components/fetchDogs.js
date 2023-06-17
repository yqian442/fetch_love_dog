import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const BASE_URL = 'https://frontend-take-home-service.fetch.com';


const Search = ({ isAuthenticated, setIsAuthenticated }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortBy, setSortBy] = useState('asc');
  const [setFavorites] = useState([]);
  const [match, setMatch] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Hit the search endpoint to find matching dogs
      const response = await fetch(
        `${BASE_URL}/dogs/search?breeds=${searchQuery}&sort=${sortBy}&size=10`
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFavorite = (dog) => {
    setFavorites((prevFavorites) => [...prevFavorites, dog]);
  };

  const handleMatch = async () => {
    try {
      // Hit the match endpoint to generate a match
      const response = await fetch(`${BASE_URL}/dogs/match`, { method: 'POST' });

      if (response.ok) {
        const data = await response.json();
        // Fetch the dog details using the match ID
        const dogResponse = await fetch(`${BASE_URL}/dogs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify([data.match]),
        });

        if (dogResponse.ok) {
          const dogData = await dogResponse.json();
          setMatch(dogData[0]);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Hit the logout endpoint to end the user's session
      const response = await fetch(`${BASE_URL}/logout`, { method: 'POST' });

      if (response.ok) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>Search Page</h2>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter dog breed"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      <label>
        Sort By:
        <select value={sortBy} onChange={handleSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
      <br />
      <div>
        {searchResults.map((result) => (
          <div key={result.id}>
            <h3>{result.name}</h3>
            <p>Breed: {result.breed}</p>
            <p>Age: {result.age}</p>
            <p>Zip Code: {result.zip_code}</p>
            <button onClick={() => handleFavorite(result)}>Favorite</button>
          </div>
        ))}
      </div>
      <br />
      <button onClick={handleMatch}>Generate Match</button>
      {match && (
        <div>
          <h2>Match</h2>
          <p>Name: {match.name}</p>
          <p>Breed: {match.breed}</p>
          <p>Age: {match.age}</p>
          <p>Zip Code: {match.zip_code}</p>
        </div>
      )}
    </div>
  );
};

export default Search;
