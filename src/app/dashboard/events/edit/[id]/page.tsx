import { notFound } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { updateEventAction } from "@/lib/actions/event.action";
import { Event } from "@/models";
import connectDB from "@/lib/mongodb";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await connectDB();
  const event = await Event.findById(id).lean();

  if (!event) return notFound();

  // Convert MongoDB object to plain JS object for the client component
  const initialData = JSON.parse(JSON.stringify(event));

  // We need to bind the ID to the server action so it knows WHICH event to update
  const updateActionWithId = updateEventAction.bind(null, id);

  return (
    <div className="w-full p-6 min-h-screen">
       {/* Uses the shared form with "edit" mode and initial data */}
       <EventForm 
          type="edit" 
          initialData={initialData} 
          action={updateActionWithId} 
        />
    </div>
  );
}