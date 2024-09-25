import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import Loading from './components/Loading';
import { fetchUsers } from './utils/api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const usersPerPage = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        value.toLowerCase().includes(term.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleEdit = (id, updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUsers(selectedUsers.filter(userId => userId !== id));
  };

  const handleSelectUser = (id) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(id)
        ? prevSelected.filter(userId => userId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = (isSelected) => {
    const currentPageUsers = getCurrentPageUsers();
    if (isSelected) {
      setSelectedUsers([...new Set([...selectedUsers, ...currentPageUsers.map(user => user.id)])]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => !currentPageUsers.find(user => user.id === id)));
    }
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedUsers.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedUsers([]);
  };

  const getCurrentPageUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handlePageChange = (newPage) => {
    setIsLoading(true);
    setCurrentPage(newPage);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Admin Dashboard</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
              <Loading />
            ) : (
              <UserTable
                users={getCurrentPageUsers()}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectedUsers={selectedUsers}
                onSelectUser={handleSelectUser}
                onSelectAll={handleSelectAll}
              />
            )}
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;