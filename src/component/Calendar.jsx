

import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(moment().startOf("week"));
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentTime, setCurrentTime] = useState("");

  const handlePreviousWeek = () => {
    setSelectedDate(selectedDate.clone().subtract(1, "weeks"));
  };

  const handleNextWeek = () => {
    setSelectedDate(selectedDate.clone().add(1, "weeks"));
  };

  const handleTimeZone = (event) => {
    setSelectedTimeZone(event.target.value);
  };

  const getWeekDays = () => {
    const days = [];
    for (let i = 1; i <= 5; i++) {
      days.push(selectedDate.clone().add(i, "days"));
    }
    return days;
  };

  const getTimeSlot = (day, timeZone) => {
    const times = [];
    const selectedDay = day.clone().tz(timeZone);

    for (let i = 8; i <= 23; i++) {
      const hour = i < 10 ? `0${i}` : `${i}`;
      const localTime = selectedDay
        .clone()
        .set({ hour: i, minute: 0 })
        .format("HH:mm");
      times.push({
        time: localTime,
        isScheduled: false,
      });
      if (i < 23) {
        const halfHourLocalTime = selectedDay
          .clone()
          .set({ hour: i, minute: 30 })
          .format("HH:mm");
        times.push({
          time: halfHourLocalTime,
          isScheduled: false,
        });
      }
    }
    return times;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentMoment = moment().tz(selectedTimeZone);
      setCurrentTime(currentMoment.format("HH:mm"));
    }, 0); 

    return () => clearInterval(intervalId); 
  }, [selectedTimeZone]);

  return (
    <div className="calendar">
      <div className="date">
        <span>{currentTime}</span>
       {selectedDate.format("MMM D YYYY")}
      </div>

      {/* //toggle buttons */}
      <div className="d-flex justify-content-between">
        <button onClick={handlePreviousWeek}>Previous Week</button>
        <button onClick={handleNextWeek}>Next Week</button>
      </div>

    {/* timezone dropdown */}
      <div className="timezonedropdown">
        <select value={selectedTimeZone} onChange={handleTimeZone}>
          <option value="UTC">UTC</option>
          <option value="Asia/Kolkata">Indian Standard Time (IST)</option>
        </select>
      </div>

      
      <div className="col-12">
        {getWeekDays().map((day) => (
          <div className="row d-flex mb-4" key={day.format()} style={{}}>
            <div className="day col-2">
              <div
                className=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span>{day.format("ddd")}</span>
                <span>{day.format("M/DD")}</span>
              </div>
            </div>
            <div
              className=" col-8 d-flex flex-wrap"
              style={{ gap: " 8px 24px" }}
            >
              {day.isSameOrAfter(moment(), "day") ? (
                getTimeSlot(day, selectedTimeZone).map((timeSlot) => (
                  <div
                    className="d-flex flex-shrink-0"
                    key={timeSlot.time}
                    style={{ gap: "4px" }}
                  >
                    <input type="checkbox" />
                    <label style={{ marginLeft: "5px" }}>{timeSlot.time}</label>
                  </div>
                ))
              ) : (
                <div>PAST</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Calendar;
