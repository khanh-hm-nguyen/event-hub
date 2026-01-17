const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => {
  return (
    <div className="agenda">
      <h2 className="text-xl font-bold mb-4">Agenda</h2>
      <ul className="list-disc pl-5 space-y-2">
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventAgenda;
