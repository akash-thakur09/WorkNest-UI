import React, { useState, useMemo, useCallback, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: number;
}

interface OptimizedExampleProps {
  users: User[];
  onUserSelect: (user: User) => void;
  searchTerm: string;
  filterByDepartment: string;
}

const OptimizedExample: React.FC<OptimizedExampleProps> = ({
  users,
  onUserSelect,
  searchTerm,
  filterByDepartment
}) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'salary' | 'department'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ✅ GOOD: Memoize expensive filtering and sorting operation
  const filteredAndSortedUsers = useMemo(() => {
    console.log('Filtering and sorting users...'); // This will only log when dependencies change
    
    let filtered = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !filterByDepartment || user.department === filterByDepartment;
      return matchesSearch && matchesDepartment;
    });

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, searchTerm, filterByDepartment, sortBy, sortOrder]);

  // ✅ GOOD: Memoize computed statistics
  const statistics = useMemo(() => {
    const totalUsers = filteredAndSortedUsers.length;
    const totalSalary = filteredAndSortedUsers.reduce((sum, user) => sum + user.salary, 0);
    const averageSalary = totalUsers > 0 ? totalSalary / totalUsers : 0;
    
    const departmentCounts = filteredAndSortedUsers.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalUsers,
      averageSalary: Math.round(averageSalary),
      departmentCounts,
      highestSalary: Math.max(...filteredAndSortedUsers.map(u => u.salary)),
      lowestSalary: Math.min(...filteredAndSortedUsers.map(u => u.salary))
    };
  }, [filteredAndSortedUsers]);

  // ✅ GOOD: Memoize event handlers
  const handleUserClick = useCallback((user: User) => {
    setSelectedUserId(user.id);
    onUserSelect(user);
  }, [onUserSelect]);

  const handleSortChange = useCallback((newSortBy: 'name' | 'salary' | 'department') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  }, [sortBy, sortOrder]);

  const handleClearSelection = useCallback(() => {
    setSelectedUserId(null);
  }, []);

  // ✅ GOOD: Memoize expensive render operations
  const userRows = useMemo(() => {
    return filteredAndSortedUsers.map(user => (
      <tr
        key={user.id}
        className={`cursor-pointer hover:bg-gray-100 ${
          selectedUserId === user.id ? 'bg-blue-100' : ''
        }`}
        onClick={() => handleUserClick(user)}
      >
        <td className="px-4 py-2">{user.name}</td>
        <td className="px-4 py-2">{user.email}</td>
        <td className="px-4 py-2">{user.department}</td>
        <td className="px-4 py-2">{user.role}</td>
        <td className="px-4 py-2">${user.salary.toLocaleString()}</td>
      </tr>
    ));
  }, [filteredAndSortedUsers, selectedUserId, handleUserClick]);

  // ✅ GOOD: Memoize static data
  const sortOptions = useMemo(() => [
    { value: 'name', label: 'Name' },
    { value: 'salary', label: 'Salary' },
    { value: 'department', label: 'Department' }
  ], []);

  // ✅ GOOD: Memoize complex JSX
  const statisticsDisplay = useMemo(() => (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="bg-blue-100 p-4 rounded">
        <h3 className="font-bold">Total Users</h3>
        <p className="text-2xl">{statistics.totalUsers}</p>
      </div>
      <div className="bg-green-100 p-4 rounded">
        <h3 className="font-bold">Avg Salary</h3>
        <p className="text-2xl">${statistics.averageSalary.toLocaleString()}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded">
        <h3 className="font-bold">Highest Salary</h3>
        <p className="text-2xl">${statistics.highestSalary.toLocaleString()}</p>
      </div>
      <div className="bg-red-100 p-4 rounded">
        <h3 className="font-bold">Lowest Salary</h3>
        <p className="text-2xl">${statistics.lowestSalary.toLocaleString()}</p>
      </div>
      <div className="bg-purple-100 p-4 rounded">
        <h3 className="font-bold">Departments</h3>
        <p className="text-2xl">{Object.keys(statistics.departmentCounts).length}</p>
      </div>
    </div>
  ), [statistics]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Optimized User Management</h2>
      
      {/* Statistics Display */}
      {statisticsDisplay}

      {/* Sort Controls */}
      <div className="mb-4 flex gap-4 items-center">
        <label className="font-medium">Sort by:</label>
        <div className="flex gap-2">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value as 'name' | 'salary' | 'department')}
              className={`px-3 py-1 rounded ${
                sortBy === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {option.label} {sortBy === option.value && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          ))}
        </div>
        
        {selectedUserId && (
          <button
            onClick={handleClearSelection}
            className="ml-auto px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear Selection
          </button>
        )}
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Salary</th>
            </tr>
          </thead>
          <tbody>
            {userRows}
          </tbody>
        </table>
      </div>

      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching the current filters.
        </div>
      )}
    </div>
  );
};

export default OptimizedExample; 