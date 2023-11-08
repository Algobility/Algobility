import React from 'react';

const Table = ({ data }) => {
  return data.length == 0 ? (
    <div className='text-center robo italic text-neutral-400 mt-6'>
      No upcoming contests. Check again in a few days.
    </div>
  ) : (
    <table className='w-full  rounded-lg overflow-hidden robo'>
      <thead className=''>
        <tr className=''>
          <th className='py-2 px-3 text-left text-neutral-400'>Name</th>
          <th className='py-2 px-3 text-left text-neutral-400'>Date</th>
          <th className='py-2 px-3 text-left text-neutral-400'>Start Time</th>
          <th className='py-2 px-3 text-left text-neutral-400'>Duration</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-500 border-t'>
        {data.map((row, index) => (
          <tr key={index} className='bg-opacity-20 '>
            <td className='py-3 px-4'>{row.name}</td>
            <td className='py-3 px-4'>
              {new Date(row.startTime).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </td>
            <td className='py-3 px-4'>{new Date(row.startTime).toLocaleString().split(',')[1]}</td>
            <td className='py-3 px-4'>
              {(new Date(row.endTime) - new Date(row.startTime)) / (1000 * 60 * 60)}
              {' hrs'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
