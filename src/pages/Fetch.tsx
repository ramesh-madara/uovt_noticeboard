import React, { useState, useEffect } from "react";
import process from "process";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: string;
  start_date: string;
  end_date: string;
  date: string;
  status: string;
}

const NoticesManager: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    start_date: "",
    end_date: "",
    date: "",
    status: "active", // Default status is 'active'
  });
  const [noNoticesMessage, setNoNoticesMessage] = useState<string | null>(null);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  // Fetch active notices
  useEffect(() => {
    fetch(`${apiUrl}/notices/active`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched notices:", data); // Debugging the response
        if (data.error) {
          setNoNoticesMessage(data.message); // Show the error message
          setNotices([]); // No notices available
        } else {
          setNotices(data.data); // Set the fetched notices
          setNoNoticesMessage(null); // Clear the error message if notices are found
        }
      })
      .catch((error) => {
        console.error("Error fetching notices:", error);
        setNoNoticesMessage("Error fetching notices.");
      });
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { start_date, end_date, status, ...submitData } = formData;
    const formDataForSubmission = new URLSearchParams(submitData as any);
    formDataForSubmission.append("start_date", start_date);
    formDataForSubmission.append("end_date", end_date);
    formDataForSubmission.append("status", status);

    try {
      const response = await fetch(`${apiUrl}/notices/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formDataForSubmission,
      });

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (!data.error) {
        alert("Notice added successfully!");

        // **Update the UI instantly**
        setNotices((prevNotices) => [data.data, ...prevNotices]);

        // Reset the form
        setFormData({
          title: "",
          content: "",
          type: "",
          start_date: "",
          end_date: "",
          date: "",
          status: "active",
        });
      } else {
        alert("Error adding notice.");
      }
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  // Handle Delete Notice with Confirmation
  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );
    if (confirmDelete) {
      fetch(`${apiUrl}/notices/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            alert("Notice deleted successfully.");
            setNotices(notices.filter((notice) => notice.id !== id)); // Remove deleted notice from state
          } else {
            alert("Error deleting notice.");
          }
        })
        .catch((error) => console.error("Error deleting notice:", error));
    }
  };

  // Handle Edit (Update) Notice
  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      type: notice.type,
      start_date: notice.start_date,
      end_date: notice.end_date,
      date: notice.date,
      status: notice.status,
    });
  };

  // Submit the Update (PUT) request
  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingNotice) return;

    const { start_date, end_date, status, ...submitData } = formData;
    const formDataForSubmission = new URLSearchParams(submitData as any);
    formDataForSubmission.append("start_date", start_date);
    formDataForSubmission.append("end_date", end_date);
    formDataForSubmission.append("status", status);

    fetch(`${apiUrl}/notices/update/${editingNotice.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataForSubmission,
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          alert("Notice updated successfully!");

          // Update the notice in the state
          setNotices(
            notices.map((notice) =>
              notice.id === editingNotice.id
                ? { ...notice, ...formData }
                : notice
            )
          );
          setEditingNotice(null); // Close the edit modal
          setFormData({
            title: "",
            content: "",
            type: "",
            start_date: "",
            end_date: "",
            date: "",
            status: "active",
          });
        } else {
          alert("Error updating notice.");
        }
      })
      .catch((error) => console.error("Error updating notice:", error));
  };

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Notice Section */}
        <section className="p-4 bg-gray-100 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Create Notice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter notice title"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700"
              >
                Content
              </label>
              <textarea
                name="content"
                id="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter notice content"
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Type</option>
                <option value="Important">Important</option>
                <option value="General">General</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </form>
        </section>

        {/* View Notices Section */}
        <section className="p-4 bg-gray-100 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Active Notices</h2>
          {noNoticesMessage ? (
            <p className="text-gray-500">{noNoticesMessage}</p>
          ) : notices.length > 0 ? (
            <ul className="space-y-4">
              {notices.map((notice) =>
                notice ? (
                  <li key={notice.id} className="p-4 border rounded bg-white">
                    <h3 className="font-bold text-lg">{notice.title}</h3>
                    <p>{notice.content}</p>
                    <p className="text-sm text-gray-500">
                      Type: {notice.type} | Start : {notice.start_date} | End :{" "}
                      {notice.end_date}
                    </p>
                    {/* orange text */}
                    <p className="bg-green-500 text-white px-2 py-1 w-[80px] rounded">
                      <b>{notice.status}</b>
                    </p>

                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ) : null
              )}
            </ul>
          ) : (
            <p>No active notices available.</p>
          )}
        </section>
      </div>

      {/* Update Notice Modal */}
      {editingNotice && (
        <div className="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Notice</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option disabled>Select</option>
                  <option value="Important">Important</option>
                  <option value="General">General</option>
                  <option value="Birthday">Birthday</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="start_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="start_date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="end_date"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  name="end_date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => setEditingNotice(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoticesManager;
