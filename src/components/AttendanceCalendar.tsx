// import { useEffect, useState } from "react";
// import axiosInstance from "../services/axiosInstance"; // ✅ Your axios setup
// import { FaCircle } from "react-icons/fa";

// type AttendanceStatus = "Present" | "Absent" | "Leave" | "Half Day";

// interface Attendance {
//   date: string; // Format: "YYYY-MM-DD"
//   status: AttendanceStatus;
// }

// const statusColorMap: Record<AttendanceStatus, string> = {
//   Present: "bg-green-500",
//   Absent: "bg-red-500",
//   Leave: "bg-purple-500",
//   "Half Day": "bg-yellow-400",
// };

// const AttendanceCalendar = () => {
//   const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);

//   // 📅 Calculate current month
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = today.getMonth(); // 0-indexed (0 = Jan)
//   const daysInMonth = new Date(year, month + 1, 0).getDate();

//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/attendance/me?month=${month + 1}&year=${year}`);
//         setAttendanceData(data); // Must return array with `date` & `status`
//       } catch (error) {
//         console.error("Failed to fetch attendance", error);
//       }
//     };

//     fetchAttendance();
//   }, [month, year]);

//   const getStatusForDate = (date: string): AttendanceStatus | undefined => {
//     return attendanceData.find((a) => a.date === date)?.status;
//   };

//   const getDateCell = (day: number) => {
//     const dateKey = `${year}-${(month + 1).toString().padStart(2, "0")}-${day
//       .toString()
//       .padStart(2, "0")}`;
//     const status = getStatusForDate(dateKey);
//     const bgColor = status ? statusColorMap[status] : "bg-gray-200";

//     return (
//       <div
//         key={dateKey}
//         className={`h-16 flex items-center justify-center rounded text-white font-semibold ${bgColor}`}
//       >
//         {day}
//       </div>
//     );
//   };

//   // First day of month (0 = Sunday)
//   const startDay = new Date(year, month, 1).getDay();

//   return (
//     <div className="p-4 bg-white rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4">Attendance Calendar - {today.toLocaleString("default", { month: "long" })} {year}</h2>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-2 text-center">
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <div key={day} className="font-semibold text-gray-800">{day}</div>
//         ))}

//         {/* Empty slots before month starts */}
//         {Array(startDay).fill(null).map((_, idx) => <div key={`empty-${idx}`} />)}

//         {/* Actual dates */}
//         {Array.from({ length: daysInMonth }, (_, idx) => getDateCell(idx + 1))}
//       </div>

//       {/* Color Legend */}
//       <div className="flex gap-4 mt-6 flex-wrap">
//         <LegendItem color="bg-green-500" label="Present" />
//         <LegendItem color="bg-red-500" label="Absent" />
//         <LegendItem color="bg-purple-500" label="Leave" />
//         <LegendItem color="bg-yellow-400" label="Half Day" />
//         <LegendItem color="bg-gray-200" label="No Data" />
//       </div>
//     </div>
//   );
// };

// // Legend item as sub-component
// const LegendItem = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-2">
//     <FaCircle className={`${color} text-sm`} />
//     <span className="text-gray-700 text-sm">{label}</span>
//   </div>
// );

// export default AttendanceCalendar;



import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";

type AttendanceStatus = "Present" | "Absent" | "Leave" | "Half Day";

interface Attendance {
  date: string; // Format: "YYYY-MM-DD"
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
  const month = today.getMonth(); // 0-indexed (0 = Jan)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  // 🎯 Dummy data setup
  useEffect(() => {
    const dummyData: Attendance[] = [
      { date: `${year}-${pad(month + 1)}-01`, status: "Present" },
      { date: `${year}-${pad(month + 1)}-02`, status: "Present" },
      { date: `${year}-${pad(month + 1)}-03`, status: "Absent" },
      { date: `${year}-${pad(month + 1)}-04`, status: "Leave" },
      { date: `${year}-${pad(month + 1)}-05`, status: "Present" },
      { date: `${year}-${pad(month + 1)}-06`, status: "Half Day" },
      { date: `${year}-${pad(month + 1)}-07`, status: "Present" },
      { date: `${year}-${pad(month + 1)}-08`, status: "Absent" },
      { date: `${year}-${pad(month + 1)}-09`, status: "Leave" },
      { date: `${year}-${pad(month + 1)}-10`, status: "Present" },
    ];
    setAttendanceData(dummyData);
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

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] p-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className=" text-gray-800">{day}</div>
        ))}

        {/* Blank slots before the 1st of month */}
        {Array(startDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => getDateCell(i + 1))}
      </div>

      {/* Color Legend */}
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

// Format helper: pad 1-digit numbers to 2-digits
const pad = (num: number): string => num.toString().padStart(2, "0");

// const LegendItem = ({ color, label }: { color: string; label: string }) => (
//   <div className="flex items-center gap-2">
//     <FaCircle className={`${color} text-sm`} />
//     <span className="text-gray-700 text-sm">{label}</span>
//   </div>
// );

export default AttendanceCalendar;
