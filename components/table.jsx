import React from 'react';

const Table = ({ data }) => {
  return data.length == 0 ? (
    <div className='text-center robo italic text-neutral-400 mt-6'>No upcoming contests. Check again soon.</div>
  ) : (
    <table className='w-full border rounded-lg overflow-hidden robo'>
      <thead className='border-b'>
        <tr>
          <th className='py-2 px-3 text-left text-neutral-400'>Name</th>
          <th className='py-2 px-3 text-left text-neutral-400'>Date</th>
          <th className='py-2 px-3 text-left text-neutral-400'>
            Start Time {' (GMT'}
            {new Date().getTimezoneOffset() / -60 < 0
              ? new Date().getTimezoneOffset() / -60
              : '+' + new Date().getTimezoneOffset() / -60}
            {')'}
          </th>
          <th className='py-2 px-3 text-left text-neutral-400'>Duration</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-200'>
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
              {' hours'}
            </td>
            <td className='py-3 px-4'>
              {' '}
              {new Date(row.startTime) < new Date() ? (
                <a href='/live' className='bg-primc px-4 py-1 rounded-md inline-block'>
                  Participate
                </a>
              ) : (
                <button className='bg-neutral-600 text-neutral-400 px-4 py-1 rounded-md'>Participate</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
