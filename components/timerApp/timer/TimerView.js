import React, { useState } from 'react';
import TimerRow from './TimerRow';
import IntervalRow from './IntervalRow';
import Collapse from './subcomponents/Collapse';
import TimerPlayer from './TimerPlayer';
import RemoveTimerButton from './subcomponents/buttons/RemoveTimerButton';
import DuplicateTimerButton from './subcomponents/buttons/DuplicateTimerButton';

import { formatTimeShort, formatTimerInfo } from '../Utils';
import PlayButton from './subcomponents/buttons/PlayButton';
import URLform from './subcomponents/URLform';

//import SwitchToggle from './subcomponents/SwitchToggle';

/*
TODO - on loose focus submit.
TODO - on 'Start', save, player Visible, auto begin.
*/

// const Spacer = () => <div className="mt-4"></div>;

const TimerView = ({ methods, craddTimer, removeTimer, duplicateTimer }) => {
  const { watch } = methods;

  const watchIntervalData = watch('interval');

  const [timeWatch, setTimeWatch] = useState();
  const [playerVisible, setPlayerVisible] = useState(false);

  const [autoPlay, setAutoPlay] = useState(false);
  const onSubmit = (timer) => {
    console.log('submit'); /* save timer. pos start player in same shot.*/
    craddTimer(timer);
    setTimeWatch(timer);
    setAutoPlay(true);
    setPlayerVisible(true);
  };
  // const duplicateTimer = (timer) => {
  //   console.log('duplicate it...');
  //   craddTimer({ ...timer, id: '' });
  // };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {/* className="container flex flex-col w-[475px] rounded-lg baseCard  px-2 m-6"> */}
      <RemoveTimerButton title="Delete" removeTimer={removeTimer} />

      {playerVisible && (
        <TimerPlayer
          key={timeWatch.id}
          timerData={timeWatch}
          setPlayerVisible={setPlayerVisible}
          autoPlay={autoPlay}
        />
      )}
      {!playerVisible && (
        <div className="-mt-4">
          <TimerRow name="timer." />
          <Collapse title={formatTimeShort(watchIntervalData)}>
            <URLform />
            <IntervalRow name="interval." />
          </Collapse>

          <div className="flex justify-between mb-2 mt-4">
            {/* save and play */}

            <PlayButton title="Play" type="submit" />
            <DuplicateTimerButton
              title="Duplicate"
              className=" mr-2 "
              clickHandler={duplicateTimer}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default TimerView;
