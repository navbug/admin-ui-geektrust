import React, { useState } from 'react';

const UserTable = ({ users, onEdit, onDelete, selectedUsers, onSelectUser, onSelectAll }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm(user);
  };

  const handleSave = () => {
    onEdit(editingId, editForm);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const isAllSelected = users.length > 0 && users.every(user => selectedUsers.includes(user.id));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map(user => (
            <tr key={user.id} className={selectedUsers.includes(user.id) ? 'bg-indigo-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => onSelectUser(user.id)}
                  className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <div className="text-sm text-gray-500">{user.email}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {editingId === user.id ? (
                  <input
                    type="text"
                    name="role"
                    value={editForm.role}
                    onChange={handleInputChange}
                    className="form-input block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.role}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                {editingId === user.id ? (
                  <button onClick={handleSave} className="text-indigo-600 hover:text-indigo-900 mr-4 save">
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900 mr-4 edit">
                    Edit
                  </button>
                )}
                <button onClick={() => onDelete(user.id)} className="text-red-600 hover:text-red-900 delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;