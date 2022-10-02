import React, { useEffect } from 'react';
import { formatTimerInfo } from '../Utils';
import useTimeWatch from '../Use/useTimeWatch';
import { Clock, OverClock } from './Clock';
import ReplayButton from './subcomponents/buttons/ReplayButton';
import PlayButton from './subcomponents/buttons/PlayButton';
import PauseButton from './subcomponents/buttons/PauseButton ';
import EditButton from './subcomponents/buttons/EditButton';

/*

Timer : for Up/Down timer display and control
direction: -1 countdown (downTimer), +1 stopwatch (upTimer)
downTimer cb at zero (for notification), continues into negative (over run)
upTimer dumb - keeps on trucking to infinty.

Update merging into -wind:
useTimeWatch here rather than parent. -does parent need to know anything from here?
Show Timer name.
Data structure changed. adapt to it. ***
and for interval.

*/

export default function TimePlayer({ timerData, setPlayerVisible, autoPlay }) {
  //console.log('timerData', timerData);
  const {
    remaining,
    direction,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset
  } = useTimeWatch({ timerData });

  const reset = () => {
    handlePause();
    handleReset();
    setPlayerVisible(false);
  };

  const replay = () => {
    handlePause();
    handleReset();
    handleStart();
    console.log(autoPlay);
  };

  // was double starting - causing two intervals -odd effect - 2 seconds,two calls in one second.
  useEffect(() => {
    if (autoPlay) handleStart();
  }, []);

  return (
    <>
      <div className="ml-1 mb-2 pl-2 h-10 ">
        <div className="trimmed">
          {' '}
          <span className="text-2xl max-w-fit">
            {timerData.timer.name}
          </span>{' '}
          <span className="text-2xl max-w-2xl">
            {formatTimerInfo(timerData.timer)}
          </span>
        </div>

        <div className="text-xs -mt-1 trimmed">
          {formatTimerInfo(timerData.interval, 'interval: ')}
        </div>
      </div>
      <div className="">
        {remaining <= 0 && direction === -1 && (
          // overtime
          <>
            <p className="flex justify-center text-green-500">
              <span className="text-7xl">00:00</span>
              <span className="text-2xl">00</span>
            </p>
            {/* <p className="text-2xl ml-4">{formatTime(remaining, direction)}</p> */}
            <div className="flex justify-center mr-8">
              <OverClock seconds={remaining} />
            </div>
          </>
        )}
        {remaining > 0 && direction === -1 && (
          <div className="flex justify-center">
            <Clock seconds={remaining} />
          </div>
        )}
        {direction === 1 && (
          // stopwatch
          <div className="flex justify-center">
            <Clock seconds={remaining} />
          </div>
        )}
      </div>
      <div className="flex justify-between mr-2 mb-2">
        {!isActive && !isPaused ? (
          <PlayButton title="Play" clickHandler={handleStart} />
        ) : isPaused ? (
          <div className="flex items-start text-green-500">
            <PauseButton
              className=""
              title="Pause"
              clickHandler={handlePause}
            />
            <span className="text-xsm ml-2 mt-[10px]">Running</span>
          </div>
        ) : (
          <div className="flex items-start">
            <PlayButton title="Play" clickHandler={handleResume} />
            <span className="text-xsm text-neutral-400 ml-2 mt-[10px]">
              Paused
            </span>
          </div>
        )}
        {!isPaused && (
          <div>
            <ReplayButton clickHandler={replay} />
            <EditButton title="Reset" clickHandler={reset} />
          </div>
        )}
      </div>
    </>
  );
}
