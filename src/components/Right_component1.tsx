import React, { useState, useEffect } from "react";
import axios from "axios";
import process from "process";
// const [data, setData] = useState([]);

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

const Right_component1 = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // http://ouvt-noticeboard.local/notices/active
        const response = await axios.get(`${apiUrl}/notices/active`);
        if (response.data.status === 200 && !response.data.error) {
          const activeNotices = response.data.data;
          setNotices(activeNotices);
        }
      } catch (error) {
        console.error("Notices Fetch Failed!");
      }
    };

    fetchNotices();
  }, []);
  return (
    <div className=" overflow-y-auto">
      <div className="flex flex-col md:mr-2">
        {notices.map((items, index) => {
          if (items.type == "Important" && items.status == "active") {
            return (
              <span
                key={index}
                className="w-full bg-red-700 h-auto flex flex-col p-3 hover:bg-red-600 mt-1 mb-1 rounded-2xl"
              >
                <h1 className="font-bold text-xl text-white">{items.title}</h1>
                <p className="pt-3 pb-1 text-gray-100">{items.content}</p>
                <p className="w-full text-amber-100 text-end pt-1 text-sm">
                  {items.date}
                </p>
              </span>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Right_component1;
