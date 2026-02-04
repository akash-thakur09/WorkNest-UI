import { useEffect, useState, useMemo, useCallback } from "react";
import { getEmployeeAttendanceService } from "../services/attendenceService";
import { useAuth } from "../hooks/useAuth";

type AttendanceStatus = "Present" | "Absent" | "Leave" | "Half Day";

interface Attendance {
  date: string; 
  status: AttendanceStatus;
}

const statusColorMap: Record<AttendanceStatus, string> = {
  Present: "bg-green-300",
  Absent: "bg-red-300",
  Leave: "bg-purple-500",
  "Half Day": "bg-yellow-400",
};

const AttendanceCalendar = () => {
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const {user} = useAuth();
  
  // Memoize employeeId to prevent unnecessary re-renders
  const employeeId = useMemo(() => user?.id || "", [user?.id]);

  // Memoize date calculations to prevent recalculation on every render
  const today = useMemo(() => new Date(), []);
  const year = useMemo(() => today.getFullYear(), [today]);
  const month = useMemo(() => today.getMonth(), [today]);
  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const startDay = useMemo(() => new Date(year, month, 1).getDay(), [year, month]);

  // Memoize utility function
  const pad = useCallback((num: number): string => num.toString().padStart(2, "0"), []);

  // Memoize status getter function
  const getStatusForDate = useCallback((date: string): AttendanceStatus | undefined => {
    return attendanceData.find((entry) => entry.date === date)?.status;
  }, [attendanceData]);

  // Memoize date cell renderer
  const getDateCell = useCallback((day: number) => {
    const dateKey = `${year}-${pad(month + 1)}-${pad(day)}`;
    const status = getStatusForDate(dateKey);
    const bgColor = status ? statusColorMap[status] : "bg-gray-200";

    return (
      <div
        key={dateKey}
        className={`h-4 w-6 flex items-center justify-center rounded text-gray-600 font-semibold ${bgColor}`}
      >
        {day}
      </div>
    );
  }, [year, month, pad, getStatusForDate]);

  // Memoize calendar header days
  const calendarHeaderDays = useMemo(() => 
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
      <div key={day} className=" text-gray-800">{day}</div>
    )), []);

  // Memoize empty cells for calendar start
  const emptyCells = useMemo(() => 
    Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />), [startDay]);

  // Memoize calendar days
  const calendarDays = useMemo(() => 
    Array.from({ length: daysInMonth }, (_, i) => getDateCell(i + 1)), [daysInMonth, getDateCell]);

  // Memoize legend items
  const legendItems = useMemo(() => [
    { color: "bg-green-500", label: "Present" },
    { color: "bg-red-500", label: "Absent" },
    { color: "bg-purple-500", label: "Leave" },
    { color: "bg-yellow-400", label: "Half Day" }
  ], []);

  useEffect(() => {
    if (!employeeId) return;

    getEmployeeAttendanceService(employeeId)
      .then((res) => {
        console.log("Attendance data fetched in calender component:", res.data);

        const fetchedData: Attendance[] = res.data.map((entry: Attendance) => ({
          date: entry.date,
          status: entry.status as AttendanceStatus,
        }));

        const fetchedDatesSet = new Set(fetchedData.map((entry) => entry.date));

        const todayDate = today.getDate();
        const allDaysTillToday: Attendance[] = [];

        for (let day = 1; day <= todayDate; day++) {
          const dateStr = `${year}-${pad(month + 1)}-${pad(day)}`;

          if (!fetchedDatesSet.has(dateStr)) {
            allDaysTillToday.push({ date: dateStr, status: "Absent" });
          }
        }

        const finalData = [...fetchedData, ...allDaysTillToday];

        finalData.sort((a, b) => a.date.localeCompare(b.date));

        setAttendanceData(finalData);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
      });
  }, [employeeId, month, year, today, pad]);

  return (
    <div className="bg-white rounded-lg shadow-md text-white w-[250px]">
      <h2 className=" bg-gray-600 p-2 rounded-t-lg font-bold text-sm">
        Attendance Calendar - {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] p-2">
        {calendarHeaderDays}
        {emptyCells}
        {calendarDays}
      </div>

      <div className="flex gap-2 flex-wrap p-2">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div className={`${item.color} h-2 w-2 rounded-full`}></div>
            <div className="text-black text-xs"> {item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceCalendar;
