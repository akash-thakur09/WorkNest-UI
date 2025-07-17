import { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Department {
  id: number;
  name: string;
  description: string;
}

const DepartmentPage = () => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Human Resources", description: "Manages hiring and employee relations" },
    { id: 2, name: "Engineering", description: "Handles software development and IT systems" },
    { id: 3, name: "Marketing", description: "Promotes products and services" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  const openAddModal = () => {
    setFormData({ id: 0, name: "", description: "" });
    setIsEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (dept: Department) => {
    setFormData(dept);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      setDepartments(prev => prev.map(d => d.id === formData.id ? formData : d));
    } else {
      setDepartments(prev => [...prev, { ...formData, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Department
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 uppercase text-xs text-gray-600">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{dept.name}</td>
                  <td className="px-6 py-4">{dept.description}</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button
                      onClick={() => openEditModal(dept)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(dept.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Department" : "Add Department"}
              </h2>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;
