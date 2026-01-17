const EventTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-row gap-1.5 flex-wrap">
      {tags.map((tag) => (
        <div
          className="pill bg-white/5 px-3 py-1 rounded-full text-xs"
          key={tag}
        >
          {tag}
        </div>
      ))}
    </div>
  );
};
export default EventTags;
