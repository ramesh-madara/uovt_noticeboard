import React, { useState } from "react";

// const [data, setData] = useState([]);

const notices = [
  {
    title: "Exam Rescheduled",
    content:
      "The exam originally scheduled for Dec 27th is postponed by a week due to the convocation.",
    date: "Jan 15, 2025",
  },
  {
    title: "Digital Electronics Extra Session",
    content:
      "An extra session is scheduled on Saturday from 7:30 PM to 9:30 PM. Vote now!",
    date: "Jan 12, 2025",
  },
  {
    title: "Course Registration Deadline",
    content:
      "All course registrations must be completed by Feb 1, 2025. Late submissions will not be accepted.",
    date: "Jan 10, 2025",
  },
  {
    title: "Course Registration Deadline",
    content:
      "All course registrations must be completed by Feb 1, 2025. Late submissions will not be accepted.",
    date: "Jan 10, 2025",
  },
  {
    title: "Course Registration Deadline",
    content:
      "All course registrations must be completed by Feb 1, 2025. Late submissions will not be accepted.",
    date: "Jan 10, 2025",
  },
];

const Left_component = () => {
  return (
    <div className=" overflow-y-auto">
      <div className="flex flex-col md:mr-2">
        {notices.map((items, index) => {
          return (
            <span
              key={index}
              className="w-full bg-yellow-600 h-auto flex flex-col p-3 hover:bg-amber-800 mt-1 mb-1 rounded-2xl"
            >
              <h1 className="font-bold text-xl text-white">{items.title}</h1>
              <p className="pt-3 pb-1 text-gray-100">{items.content}</p>
              <p className="w-full text-amber-100 text-end pt-1 text-sm">
                {items.date}
              </p>
            </span>
          );
        })}

        {/* <span className="w-full bg-yellow-400 h-32 flex flex-col p-2 mt-2">
          <h1 className="font-bold text-2xl text-white">Heading</h1>
          <p className="pt-1 pb-1 text-gray-100">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            odio ex nulla voluptate quidem, ea est? Ipsum exercitationem, ullam
            blanditiis accusamus nam nemo placeat facere saepe illo excepturi,
            natus autem?
          </p>
        </span>
        <span className="w-full bg-yellow-400 h-32 flex flex-col p-2 mt-2">
          <h1 className="font-bold text-2xl text-white">Heading</h1>
          <p className="pt-1 pb-1 text-gray-100">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            odio ex nulla voluptate quidem, ea est? Ipsum exercitationem, ullam
            blanditiis accusamus nam nemo placeat facere saepe illo excepturi,
            natus autem?
          </p>
        </span>
        <span className="w-full bg-yellow-400 h-32 flex flex-col p-2 mt-2">
          <h1 className="font-bold text-2xl text-white">Heading</h1>
          <p className="pt-1 pb-1 text-gray-100">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            odio ex nulla voluptate quidem, ea est? Ipsum exercitationem, ullam
            blanditiis accusamus nam nemo placeat facere saepe illo excepturi,
            natus autem?
          </p>
        </span> */}
      </div>
    </div>
  );
};

export default Left_component;
