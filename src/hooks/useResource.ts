import { useState, useCallback } from "react";

export const useResource = <T extends { _id: string }>(
  endpoint: string,
  dataKey: string,
) => {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(endpoint);
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) throw new Error((data.message as string) || "Fetch failed");
      setItems((data[dataKey] as T[]) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, dataKey]);

  const createItem = async (payload: BodyInit, isJson: boolean = false) => {
    setIsLoading(true);
    try {
      const headers: HeadersInit = isJson
        ? { "Content-Type": "application/json" }
        : {};
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: payload,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchItems();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (
    id: string,
    payload: BodyInit,
    isJson: boolean = false,
  ) => {
    setIsLoading(true);
    try {
      const headers: HeadersInit = isJson
        ? { "Content-Type": "application/json" }
        : {};
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers,
        body: payload,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      await fetchItems();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setItems((prev) => prev.filter((item) => item._id !== id));
      return true;
    } catch (err: any) {
      alert(err.message);
      return false;
    }
  };

  return {
    items,
    setItems,
    isLoading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
};
