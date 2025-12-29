import EventForm from "@/components/admin/EventForm";
import { createEventAction } from "@/lib/actions/event.action";

export default function CreateEventPage() {
  return (
    <div className="w-full p-6 min-h-screen">
       {/* Uses the shared form with "create" mode */}
       <EventForm type="create" action={createEventAction} />
    </div>
  );
}