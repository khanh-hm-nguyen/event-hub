import { Event, Person, CalendarMonth } from "@mui/icons-material";

const BookingStats = ({ title, count }: { title: string, count: number}) => {
 return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50" />
      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-teal-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              <Event style={{ fontSize: 14 }} /> Event Management
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarMonth className="text-slate-400" style={{ fontSize: 20 }} />
            <span className="font-medium">Registration Overview </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 bg-teal-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
            <Person style={{ fontSize: 28 }} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Total Attendees</p>
            <p className="text-3xl font-black text-slate-900 leading-none">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingStats