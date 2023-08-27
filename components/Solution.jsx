import { useState } from 'react';

export default function Solution({ children }) {
  const [open, setOpen] = useState(false);
  if (open) {
    return children;
  }
  return (
    <button
      onClick={() => setOpen(true)}
      className='w-full py-2 mt-6 robo text-center bg-neutral-700 hover:bg-neutral-600 transition-all rounded-md'
    >
      Reveal Answer
    </button>
  );
}
