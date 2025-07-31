import { useEffect, useState } from "react";

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

export const useLiveTimer = (checkInTime: string, checkOutTime?: string) => {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    if (!checkInTime || checkOutTime) return;

    const checkIn = parseTime(checkInTime);

    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - checkIn.getTime();

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    
    setElapsed(`${hours}:${minutes}`);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [checkInTime, checkOutTime]);

  return elapsed;
};
