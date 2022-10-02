import React, { useState, useEffect } from 'react';
import TimerList from './TimerList';
import uuid from 'uuid';
//import qs from 'qs';
// import Storage from './Storage';

/*
Cardinality Control:
Multi-timer: timersData : list of timers @see timer2
TimerList: render only
Timer: FormProvider, default values/structure
TimerView: one Timer Card. contains TimerRows (could merge with Timer -above)
TimerRow: configurable  as timer. / interval. -to reuse subcomponents.
subComponents: - connected by prop config e.g: interval.name and useFormContext.
TextInput: simple text input and styling.

TODO:

create one blank default timer if none found in local storage.
changes to timers here, should update in list.
in place edit - defocus saves.
Start timer -saves.

*/
const defaultValues = {
  id: '',
  direction: -1,
  chainAction: '',
  hasInterval: false,
  timer: {
    name: '',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: '1',
    hasAnnounce: false,
    announce: 'speak this text',
    hasStartPlaylist: false,
    startPlaylist: null,
    hasEndPlaylist: false,
    endPlaylist: null,

    //eg zen nap playlist:
    playDuringUrl:
      'https://www.youtube.com/watch?v=W74E0wWUcqY&list=PLGFsjC9dEUw5cXCjNGAoVISO552RzPLEg',
    hasPlayDuringUrl: true,
    //launched just before time up to mute play and make alarm more likely to be heard:
    //endPlayUrl: 'https://ticaboo.co.uk/timerended'
    endPlayerUrl: 'https://open.spotify.com/track/0nrRP2bk19rLc0orkWPQk2' //spotify avvici
    //or as a wake up call:
    //endPlayUrl: 'https://www.youtube.com/watch?v=wmin5WkOuPw' //prodigy
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: 'speak at interval'
  }
  // intervalName: 'interval',
  // intervalSeconds: 0,
  // intervalAlert: ''
};

const tryMe = {
  id: '',
  direction: -1,
  chainAction: '',
  hasInterval: true,
  timer: {
    name: 'try sample timer',
    h: '',
    m: '',
    s: '20',
    hasAlert: true,
    alert: '32',
    hasAnnounce: true,
    announce: 'You can get the timer to say whatever you want',
    hasPlayDuringUrl: true,
    playDuringUrl:
      'https://www.youtube.com/watch?v=W74E0wWUcqY&list=PLGFsjC9dEUw5cXCjNGAoVISO552RzPLEg',
    //launched just before time up to mute play and make alarm more likely to be heard:
    //endPlayUrl: 'https://ticaboo.co.uk'
    hasEndPlayUrl: true,
    endPlayerUrl: 'https://open.spotify.com/track/0nrRP2bk19rLc0orkWPQk2' //spotify avvici
    //or as a wake up call:
    //endPlayUrl: 'https://www.youtube.com/watch?v=wmin5WkOuPw' //prodigy
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '5',
    hasAlert: true,
    alert: 13,
    hasAnnounce: true,
    announce: 'speak and or sound intervals'
  }
};
const LOCAL_STORAGE_KEY = 'ticabootimer';

let obj = {};
const isEmptyObj = (object) => {
  return JSON.stringify(object) === '{}';
};

/*

List multiple timers, form to edit.

*/

function MultiTimers() {
  const [timers, setTimers] = useState([]);
  //const [timerData, setTimerData] = useState();

  useEffect(() => {
    // fires when app component mounts to the DOM
    console.log('on page load fired.');

    // const qsTimer = qs.parse(window.location.hash);
    // const hasQsTimer = !isEmptyObj(qsTimer);
    // console.log('qsTimer', hasQsTimer);
    const storageTimers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storageTimers !== null && storageTimers.length > 0) {
      //console.log('on page load 1,loading timers from storage ');
      setTimers(storageTimers);
    } else {
      /* if (!hasQsTimer) { */
      //console.log('on page load 2,no qs: add tryme sample timer.');
      setTimers([{ ...tryMe, id: uuid.v4() }]);
    }
    // if (hasQsTimer) {
    //   console.log('on page load 3,checking qsTimer already there...', qsTimer);
    //   if (
    //     //note: ignoring if found,could update but see no good usecase for now.
    //     storageTimers.filter((timer) => timer.id === qsTimer.id).length === 0
    //   ) {
    //     console.log('on page load 4,add new qsTimer');
    //     setTimers([...storageTimers, qsTimer]);
    //   }
    // }
  }, []);

  useEffect(() => {
    // fires when timers array gets updated

    if (timers && timers.length > 0) {
      // console.log('storing');
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timers));
    } else {
      //console.log('add new default timer');
      const timerNumber = timers.length + 1;
      let newTimer = defaultValues;
      newTimer.timer.name = 'Timer ' + timerNumber;
    }
  }, [timers]);

  function duplicateTimer(newTimer) {
    //console.log('dulicitous or what', newTimer);
    newTimer.id = uuid.v4();
    //setTimers([...timers, newTimer]);
    craddTimer(newTimer);
  }
  /* create/ add timer */
  function craddTimer(newTimer) {
    //for bookmarking/sharing:
    // const timerquery = qs.stringify(newTimer);
    // window.location.hash = timerquery;

    if (timers.filter((timer) => timer.id === newTimer.id).length !== 0) {
      setTimers(
        timers.map((timer) => {
          if (timer.id === newTimer.id) {
            return {
              ...newTimer
            };
          }
          return timer;
        })
      );

      //const t = timers.filter((timer) => timer.id !== newTimer.id);
      //setTimers({ ...t, newTimer });
    } else {
      // adds new timer to beginning of timers array
      setTimers([...timers, newTimer]);
    }
  }
  function addNewTimer() {
    const timerNumber = timers.length + 1;
    let newTimer = defaultValues;
    newTimer.timer.name = 'Timer ' + timerNumber;
    craddTimer({
      ...newTimer,
      id: uuid.v4()
    });
  }

  // function editTimer(id) {
  //   const timer = timers.filter((timer) => timer.id === id);
  //   setTimerData(timer[0]);
  // }

  function removeTimer(id) {
    // console.log('removing', id);
    setTimers(timers.filter((timer) => timer.id !== id));
  }

  return (
    <div className="baseBlack">
      <div>
        {/*centering:  className="realative container mx-auto p-6 "> */}
        {/* <TimerForm timerData={timerData}  /> now done in place */}
        <TimerList
          timers={timers}
          removeTimer={removeTimer}
          // editTimer={editTimer}
          craddTimer={craddTimer}
          duplicateTimer={duplicateTimer}
          addNewTimer={addNewTimer}
        />
      </div>
    </div>
  );
}

export default MultiTimers;
