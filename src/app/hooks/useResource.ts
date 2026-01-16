import { useState, useCallback } from "react";

// Generic Type T = The interface of your data (IEvent, IBooking, etc.)
export const useResource = <T extends { _id: string }>(
  endpoint: string, 
  dataKey: string   
) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. GET (Fetch All)
  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || `Failed to fetch ${dataKey}`);
      
      // Dynamic access: data['events'] or data['bookings']
      setItems(data[dataKey] || []); 
    } catch (err) {
      setError("error");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, dataKey]);

  // 2. POST (Create)
  // We accept payload as BodyInit (FormData or stringified JSON)
  // isJson tells us if we need to set Content-Type header
  const createItem = async (payload: BodyInit, isJson: boolean = false): Promise<boolean> => {
    setIsLoading(true);
    setError("");
    try {
      const headers: HeadersInit = isJson ? { "Content-Type": "application/json" } : {};

      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: payload,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create item");

      await fetchItems(); // Refresh list
      return true;
    } catch (err) {
      setError("Error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 3. DELETE
  const deleteItem = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");

      // Optimistic update
      setItems((prev) => prev.filter((item) => item._id !== id));
      return true;
    } catch (err) {
      alert("Error");
      return false;
    }
  };

  return {
    items,
    isLoading,
    error,
    fetchItems,
    createItem,
    deleteItem,
  };
};