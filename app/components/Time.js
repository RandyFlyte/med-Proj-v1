'use client';
import { useTimeStore } from '../_utils/store';
import { useEffect } from 'react';
import toLocaleTimeString from '../_utils/store';

const Time = () => {
  const setCurrentTime = useTimeStore((state) => state.setCurrentTime);
  const currentTime = useTimeStore((state) =>
    state.currentTime.toLocaleTimeString()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [setCurrentTime]);

  return <div>{currentTime}</div>;
};

export default Time;
