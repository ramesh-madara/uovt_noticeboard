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
  const [noNoticesMessage, setNoNoticesMessage] = useState<string | null>(null);

  // Fetch active notices
  useEffect(() => {
    fetch("http://ouvt-noticeboard.local/notices/active")
      .then((response) => response.json())
      .then((data) => {
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

  // Submit new notice
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the form data for submission, including start_date, end_date, and status
    const { start_date, end_date, status, ...submitData } = formData;

    // Ensure the data to be sent includes start_date, end_date, and status
    const formDataForSubmission = new URLSearchParams(submitData as any);
    formDataForSubmission.append("start_date", start_date);
    formDataForSubmission.append("end_date", end_date);
    formDataForSubmission.append("status", status);

    fetch("http://ouvt-noticeboard.local/notices/insert", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formDataForSubmission, // Send the updated form data
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          alert("Notice added successfully!");

          // Update the notices state with the new notice immediately
          const newNotice = { id: Date.now().toString(), ...formData };
          setNotices([newNotice, ...notices]); // Prepend the new notice to the list of notices

          // Clear the form after successful submission
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
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="warning">Deadline</option>
                <option value="alert">Event</option>
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
            {/* <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Notice Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div> */}
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
            <p className="text-gray-500">{noNoticesMessage}</p> // Show the error message
          ) : notices.length > 0 ? (
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li key={notice.id} className="p-4 border rounded bg-white">
                  <h3 className="font-bold text-lg">{notice.title}</h3>
                  <p>{notice.content}</p>
                  <p className="text-sm text-gray-500">
                    Type: {notice.type} | Date: {notice.date}
                    {/* Do not show start_date and end_date */}
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
