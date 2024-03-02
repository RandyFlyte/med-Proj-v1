'use client';
import React, { useState } from 'react';
import PharmaGraph from './PharmaGraph';
import { useTimeStore } from '../_utils/store.js';
import { useDosageStore } from '../_utils/store.js';
import { useEntriesStore } from '../_utils/store.js';
import { useShowGraphStore } from '../_utils/store.js';

const DosageForm = () => {
  const showGraph = useShowGraphStore((state) => state.showGraph);
  const setShowGraph = useShowGraphStore((state) => state.setShowGraph);
  const entries = useEntriesStore((state) => state.entries);
  const setEntries = useEntriesStore((state) => state.setEntries);
  const currentTime = useTimeStore((state) => state.currentTime);
  const setDosage = useDosageStore((state) => state.setDosage);
  const dosage = useDosageStore((state) => state.dosage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = { dosage: parseFloat(dosage), date };
    setEntries([...entries, newEntry]);
    setShowGraph(true);
  };
  const dosageTime = new Date(currentTime).toLocaleTimeString();

  return (
    <div className='max-w-md mx-auto mt-10'>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label
            htmlFor='dosage'
            className='block text-gray-700 text-sm font-bold mb-2'>
            Dosage (mg)
          </label>
          <input
            type='number'
            id='dosage'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder='Enter dosage in mg'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='date'
            className='block text-gray-700 text-sm font-bold mb-2'>
            Date & Time
          </label>
          <input
            type='datetime-local'
            id='date'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={currentTime}
            onChange={(e) => setCurrentTime(new Date(e.target.value))}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            Submit
          </button>
        </div>
      </form>
      {entries.length > 0 && (
        <div>
          <h3>Last Entry:</h3>
          <p>Dosage: {entries[entries.length - 1].dosage} mg</p>
          <p>Time: {entries[entries.length - 1].time}</p>
        </div>
      )}
      {/* Graph */}
      <div className='max-w-md mx-auto mt-10'>
        {/* Form goes here */}
        {showGraph && <PharmaGraph />}
      </div>
    </div>
  );
};

export default DosageForm;
