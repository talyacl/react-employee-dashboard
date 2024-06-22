import React, { useState } from 'react';

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Developer' },
    { id: 2, name: 'Jane Smith', position: 'Designer' },
    { id: 3, name: 'Emma Johnson', position: 'Product Manager' },
  ]);

  const [newEmployee, setNewEmployee] = useState({ name: '', position: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.position) return;
    setEmployees([
      ...employees,
      { id: employees.length + 1, name: newEmployee.name, position: newEmployee.position },
    ]);
    setNewEmployee({ name: '', position: '' });
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleEditEmployee = (employee) => {
    setIsEditing(true);
    setCurrentEmployee(employee);
  };

  const handleUpdateEmployee = () => {
    setEmployees(employees.map(employee => (employee.id === currentEmployee.id ? currentEmployee : employee)));
    setIsEditing(false);
    setCurrentEmployee({});
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          className="border p-2 mr-2"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <button onClick={handleAddEmployee} className="bg-blue-500 text-white px-4 py-2">Add Employee</button>
      </div>

      {isEditing && (
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 mr-2"
            value={currentEmployee.name}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Position"
            className="border p-2 mr-2"
            value={currentEmployee.position}
            onChange={(e) => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
          />
          <button onClick={handleUpdateEmployee} className="bg-green-500 text-white px-4 py-2">Update Employee</button>
        </div>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Position</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{employee.id}</td>
              <td className="py-2 px-4 border-b">{employee.name}</td>
              <td className="py-2 px-4 border-b">{employee.position}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEditEmployee(employee)} className="bg-yellow-500 text-white px-2 py-1 mr-2">Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDashboard;

