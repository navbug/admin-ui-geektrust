import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex">
        <input
          type="text"
          placeholder="Search by name, email or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input flex-grow mr-2"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded search-icon">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;