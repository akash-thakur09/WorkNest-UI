import { useEffect, useState } from "react";
import { getEmployeeAttendanceService } from "../services/attendenceService";

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

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); 
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  useEffect(() => {
  const employeeId = localStorage.getItem("employeeId");

  getEmployeeAttendanceService(employeeId!)
    .then((res) => {
      console.log("Attendance data fetched:", res.data);

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
}, [month, year]);


  const getStatusForDate = (date: string): AttendanceStatus | undefined =>
    attendanceData.find((entry) => entry.date === date)?.status;

  const getDateCell = (day: number) => {
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
  };

  return (
    <div className="bg-white rounded-lg shadow-md text-white w-[250px]">
      <h2 className=" bg-gray-600 p-2 rounded-t-lg font-bold text-sm">
        Attendance Calendar - {today.toLocaleString("default", { month: "long" })} {year}
      </h2>

      <div className="grid grid-cols-7 gap-1 text-center text-[10px] p-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className=" text-gray-800">{day}</div>
        ))}

        {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}

        {Array.from({ length: daysInMonth }, (_, i) => getDateCell(i + 1))}
      </div>

      <div className="flex gap-2 flex-wrap p-2">
        <div className="flex items-center gap-1">
            <div className="bg-green-500 h-2 w-2 rounded-full"></div>
            <div className="text-black text-xs"> Present</div>
        </div>
        <div className="flex items-center gap-1">
            <div className="bg-red-500 h-2 w-2 rounded-full"></div>
            <div className="text-black text-xs"> Absent</div>
        </div>
        <div className="flex items-center gap-1">
            <div className="bg-purple-500 h-2 w-2 rounded-full"></div>
            <div className="text-black text-xs"> Leave</div>
        </div>
        <div className="flex items-center gap-1">
            <div className="bg-yellow-400 h-2 w-2 rounded-full"></div>
            <div className="text-black text-xs"> Half Day</div>
        </div>
      </div>
    </div>
  );
};

const pad = (num: number): string => num.toString().padStart(2, "0");

export default AttendanceCalendar;
