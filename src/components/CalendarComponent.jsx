import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles for the calendar

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date()); // To store the selected date

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the selected date
  };

  return (
    <div className=" p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="rounded-lg"
      />
      <div className="mt-4">
        <p>
          <strong>Selected Date: </strong>
          {date.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default CalendarComponent;
