import React, { useState, useEffect } from "react";
import moment from "moment";
import { AppointmentsData } from "./AppointmentsData";

function WeeklyCalendar() {
  const [data, setData] = useState(AppointmentsData); // Assuming AppointmentsData is an array of appointment objects
  const [selectedWeek, setSelectedWeek] = useState(null); // Track the selected week
  const [selectedDates, setSelectedDates] = useState([]); // Selected dates

  useEffect(() => {
    // Simulate data fetching (replace with actual data source if needed)
    const fetchData = () => {
      setTimeout(() => setData([...data]), 1000); // Simulate delay
    };

    fetchData();
  }, []);

  const [currentWeek, setCurrentWeek] = useState(() => {
    // Function to get the current week's dates (Sunday to Saturday)
    const today = new Date();
    const startOfWeek = today.setDate(today.getDate() - today.getDay());
    return Array(7)
      .fill(0)
      .map((_, i) => new Date(startOfWeek + i * 86400000)); // 86400000 = milliseconds in a day
  });

  const handleCalendarClick = () => {
    setSelectedWeek(currentWeek.map((date) => date.toISOString().slice(0, 10))); // YYYY-MM-DD format
  };

//   const handleCheckboxChange = (date) => {
//     const isSelected = selectedDates.includes(date);
//     setSelectedDates(isSelected ? selectedDates.filter((d) => d !== date) : [...selectedDates, date]);
//   };

  const handleCheckboxChange = (date) => {
    setSelectedDates((prevDates) => {
      if (prevDates.includes(date)) {
        return prevDates.filter((d) => d !== date);
      } else {
        return [...prevDates, date];
      }
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weekly Calendar</h2>
      <button onClick={handleCalendarClick}>Show Calendar</button>
      {selectedWeek && ( // Display calendar only if a week is selected
        <table style={{ margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.name}</td>
                <td>{appointment.id}</td>
                <td>
                  <input
                    type="checkbox"
                    id={appointment.Id}
                    checked={selectedDates.includes(appointment.date)}
                    onChange={() => handleCheckboxChange(appointment.date)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WeeklyCalendar;










