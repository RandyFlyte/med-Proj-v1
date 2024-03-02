'use client';
import React, { useState } from 'react';
import PharmaGraph from './PharmaGraph';

const DosageForm = () => {
  const [dosage, setDosage] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  // Helper function to format the current date and time
  const formatDateTimeLocal = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Initialize date state with the current date and time
  const [date, setDate] = useState(formatDateTimeLocal(new Date()));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Dosage: ${dosage}, Date: ${date}`);
    setShowGraph(true); // Show the graph after form submission
    // Handle form submission here
  };

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
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
      {/* Graph */}
      <div className='max-w-md mx-auto mt-10'>
        {/* Form goes here */}
        {showGraph && <PharmaGraph dosage={parseFloat(dosage)} time={date} />}
      </div>
    </div>
  );
};

export default DosageForm;
