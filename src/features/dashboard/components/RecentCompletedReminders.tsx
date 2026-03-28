import { MdOutlineRecentActors } from "react-icons/md";
const completedReminders = [
  {
    id: 1,
    title: "Call John",
    contact: "John Doe",
    completedDate: "2026-05-01",
  },
  {
    id: 2,
    title: "Send birthday wishes",
    contact: "Jane Doe",
    completedDate: "2026-05-03",
  },
  {
    id: 3,
    title: "Pay electricity bill",
    contact: "Utility Office",
    completedDate: "2026-05-05",
  },
];

const RecentCompletedReminders = () => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <MdOutlineRecentActors className="h-6 w-6" />
        <p className="font-bold text-lg">Recently Completed Reminders</p>
      </div>

      <div className="flex flex-col">
        {completedReminders.map((reminder) => (
          <div key={reminder.id}>
            <div className="flex justify-between py-2">
              <div>
                <p className="font-medium">{reminder.title}</p>
                <p className="text-sm text-gray-500">{reminder.contact}</p>
              </div>
              <p className="text-sm text-gray-600">{reminder.completedDate}</p>
            </div>
            <hr className="border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCompletedReminders;
