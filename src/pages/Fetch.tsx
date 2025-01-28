import React, { useState, useEffect } from "react";

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

  // Fetch active notices
  useEffect(() => {
    fetch("http://ouvt-noticeboard.local/notices/active")
      .then((response) => response.json())
      .then((data) => setNotices(data.data))
      .catch((error) => console.error("Error fetching notices:", error));
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

  // Submit new notice
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data excluding start_date and end_date
    const { start_date, end_date, ...submitData } = formData;

    fetch("http://ouvt-noticeboard.local/notices/insert", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(submitData as any),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          alert("Notice added successfully!");
          setNotices([...notices, { id: Date.now().toString(), ...formData }]);
          setFormData({
            title: "",
            content: "",
            type: "",
            start_date: "",
            end_date: "",
            date: "",
            status: "active", // Reset to default status after submission
          });
        } else {
          alert("Error adding notice.");
        }
      })
      .catch((error) => console.error("Error adding notice:", error));
  };

  return (
    <div className="p-4 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Notice Section */}
        <section className="p-4 bg-gray-100 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Create Notice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Content"
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Type</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="alert">Alert</option>
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
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
          {notices.length > 0 ? (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice.id} className="p-4 border rounded bg-white">
                  <h3 className="font-bold text-lg">{notice.title}</h3>
                  <p>{notice.content}</p>
                  <p className="text-sm text-gray-500">
                    Type: {notice.type} | Start Date: {notice.start_date} | End
                    Date: {notice.end_date}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No active notices available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default NoticesManager;
