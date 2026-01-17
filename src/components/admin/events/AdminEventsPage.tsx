import { Suspense } from "react";
import AdminLoading from "@/app/(dashboard)/admin/loading";
import AdminEventsContent from "./AdminEventsContent";

const AdminEventsPage = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header stays static and loads instantly */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Events Management
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Deploy and organize your organization's event schedule.
          </p>
        </div>
      </div>

      {/* Stream the stats and table */}
      <Suspense fallback={<AdminLoading />}>
        <AdminEventsContent />
      </Suspense>
    </div>
  );
};

export default AdminEventsPage;
