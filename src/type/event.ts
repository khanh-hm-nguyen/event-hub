export interface IEvent {
  _id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: 'online' | 'offline' | 'hybrid';
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type CreateEventFormData = Omit<IEvent, '_id' | 'slug' | 'createdAt' | 'updatedAt' | 'image'> & {
  image: File | null; 
};