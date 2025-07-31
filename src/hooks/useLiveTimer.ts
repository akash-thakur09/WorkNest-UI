import { useEffect, useState, useMemo, useCallback } from "react";

function parseTime(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

export const useLiveTimer = (checkInTime: string, checkOutTime?: string) => {
  const [elapsed, setElapsed] = useState("00:00:00");

  // Memoize parsed check-in time to prevent recalculation
  const checkIn = useMemo(() => {
    if (!checkInTime) return null;
    return parseTime(checkInTime);
  }, [checkInTime]);

  // Memoize the timer calculation function
  const calculateElapsed = useCallback(() => {
    if (!checkIn || checkOutTime) return "00:00:00";

    const now = new Date();
    const diffMs = now.getTime() - checkIn.getTime();

    const totalSeconds = Math.floor(diffMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  
    return `${hours}:${minutes}`;
  }, [checkIn, checkOutTime]);

  useEffect(() => {
    if (!checkIn || checkOutTime) return;

    const interval = setInterval(() => {
      const newElapsed = calculateElapsed();
      setElapsed(newElapsed);
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [checkIn, checkOutTime, calculateElapsed]);

  return elapsed;
};
