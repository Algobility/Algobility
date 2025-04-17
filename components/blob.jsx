import styles from './cssModules/blob.module.css';
import { useEffect, useRef } from 'react';

export default function Blob() {
  const wrapperRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      if (wrapperRef.current) {
        wrapperRef.current.animate(
          {
            transform: `translate3d(${clientX}px, ${clientY}px, 0)`,
          },
          {
            duration: 3000,
            fill: 'forwards',
            easing: 'ease-out',
          }
        );
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='hidden md:block fixed top-0 left-0 w-screen h-screen pointer-events-none '>
      <div ref={wrapperRef} className={styles.blobWrapper}>
        <div className={styles.blob}></div>
      </div>
      <div className={styles.blur}></div>
    </div>
  );
}

