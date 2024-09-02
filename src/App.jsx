import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [currTime, setCurrTime] = useState({
    d: "00",
    h: "00",
    m: "00",
    s: "00",
  });
  const [start, setStart] = useState(false);
  const [restart, setRestart] = useState(true);
  const [time, setTime] = useState({
    Day: 0,
    Hour: 0,
    Minute: 0,
    Second: 0,
  });
  useEffect(() => {
    setCurrTime({
      d: time.Day < 10 ? `0${time.Day}` : `${time.Day}`,
      h: time.Hour < 10 ? `0${time.Hour}` : `${time.Hour}`,
      m: time.Minute < 10 ? `0${time.Minute}` : `${time.Minute}`,
      s: time.Second < 10 ? `0${time.Second}` : `${time.Second}`,
    });
    if (start) {
      const intervalId = setInterval(() => {
        if (time.Second !== 0) {
          const curr_sec = time.Second - 1;
          setTime({ ...time, Second: curr_sec });
        } else {
          // second == 0
          if (time.Minute !== 0) {
            const curr_sec = 59;
            const curr_min = time.Minute - 1;
            setTime({ ...time, Second: curr_sec, Minute: curr_min });
          } else {
            // minute == 0
            if (time.Hour !== 0) {
              const curr_sec = 59;
              const curr_min = 59;
              const curr_hour = time.Hour - 1;
              setTime({
                ...time,
                Minute: curr_min,
                Hour: curr_hour,
                Second: curr_sec,
              });
            } else {
              // hour == 0
              if (time.Day !== 0) {
                const curr_sec = 59;
                const curr_min = 59;
                const curr_hour = 23;
                const curr_day = time.Day - 1;
                setTime({
                  ...time,
                  Day: curr_day,
                  Hour: curr_hour,
                  Minute: curr_min,
                  Second: curr_sec,
                });
              } else {
                // day == 0
                if (
                  time.Day === 0 &&
                  time.Hour === 0 &&
                  time.Minute === 0 &&
                  time.Second === 0
                ) {
                  setStart(!start);
                  setRestart(true)
                }
              }
            }
          }
        }
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [time, start]);

  function Form() {
    return (
      <div className="form">
        <div>
          <label htmlFor="day">Day </label>
          <input
            id="day"
            type="number"
            min={0}
            value={time.Day}
            onChange={(e) => setTime({ ...time, Day: e.target.value })}
            disabled={start}
          />
        </div>
        <div>
          <label htmlFor="hour">Hour </label>
          <input
            id="hour"
            type="number"
            min={0}
            max={23}
            value={time.Hour}
            onChange={(e) => setTime({ ...time, Hour: e.target.value })}
            disabled={start}
          />
        </div>
        <div>
          <label htmlFor="minute">Minute </label>
          <input
            id="minute"
            type="number"
            min={0}
            max={59}
            value={time.Minute}
            onChange={(e) => setTime({ ...time, Minute: e.target.value })}
            disabled={start}
          />
        </div>
        <div>
          <label htmlFor="second">Second </label>
          <input
            id="second"
            type="number"
            min={0}
            max={59}
            value={time.Second}
            onChange={(e) => setTime({ ...time, Second: e.target.value })}
            disabled={start}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="main" style={{}}>
      <div className="time">
        <p>
          {currTime.d} : {currTime.h} : {currTime.m} : {currTime.s}
        </p>
      </div>
      {restart && <Form />}
      <div className="button">
        <button
          onClick={() => {
            if (!start) {
              if (
                time.Day !== 0 ||
                time.Hour !== 0 ||
                time.Minute !== 0 ||
                time.Second !== 0
              ) {
                setStart(true);
                setRestart(false);
              }
            } else {
              setStart(false);
            }
          }}
          style={{ backgroundColor: !start ? "green" : "red"}}
        >
          {!start ? "Start" : "stop"}
        </button>
        <button
          onClick={() => {
            setRestart(true);
            setStart(false);
            setTime({ Day: 0, Hour: 0, Minute: 0, Second: 0 });
            setCurrTime({ d: "00", h: "00", m: "00", s: "00" });
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
