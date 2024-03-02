'use client';
/*
  This file is used to store the data from the API calls.
  The data is stored in a global state using Zustand.
*/
import { create } from 'zustand';

// export const useTimeStore = create((set) => ({
//   currentTime: new Date(), // Initialize with the current date and time
//   setCurrentTime: (time) => set({ currentTime: time }),
// }));

export const useDosageStore = create((set) => ({
  dosage: '',
  setDosage: (dosage) => set({ dosage }),
}));

export const useEntriesStore = create((set) => ({
  entries: [],
  setEntries: (entries) => set({ entries }),
}));

export const useShowGraphStore = create((set) => ({
  showGraph: false,
  setShowGraph: (showGraph) => set({ showGraph }),
}));

export const formatDateTimeLocal = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const hours = `${date.getHours()}`.padStart(2, '0');
  const minutes = `${date.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const useTimeStore = create((set) => ({
  currentTime: formatDateTimeLocal(new Date()),
  setCurrentTime: (time) =>
    set({ currentTime: formatDateTimeLocal(new Date(time)) }),
}));
