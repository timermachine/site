import React from 'react';
import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import Timer from './Timer';

function TimerList({
  timers,
  removeTimer,
  duplicateTimer,
  craddTimer,
  addNewTimer
}) {
  return (
    <div className="flex flex-row flex-wrap baseBlack baseWhite">
      {/* TL: */}
      {timers.map((timer) => (
        <div
          key={timer.id}
          // <320
          className=" flex flex-col w-[435px] xxs:w-[320] rounded-lg baseCard  border-amber-500 px-2 m-3">
          <Timer
            className=""
            key={timer.id}
            timer={timer}
            removeTimer={removeTimer}
            craddTimer={craddTimer}
            duplicateTimer={duplicateTimer}
          />
        </div>
      ))}
      <AddNewTimer key="addnewcell010101" addNewTimer={addNewTimer} />
    </div>
  );
}

export default TimerList;
