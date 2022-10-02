import { useState, useRef } from 'react';
import { useAudio } from './useAudio';
import { getAudioSrc, timeToSeconds } from '../Utils';

/*
TD: pause - opens interstitial. only do this if interstitial activly 'sounding'.
*/
let tabHandle;

const tabOpener = (url) => {
  tabHandle = window.open(
    url,
    '_ticabooPlayDuringUrl2',
    // 'popup',
    'left=0,top=900,width=400,height=320'
  );
  console.log(tabHandle);
  //if (tabHandle) tabHandle.blur();
  // if (tabHandle !== null) tabHandle.opener.window.focus();
  // window.focus();
};

const tabHoldingPageLoad = () => {
  tabOpener(document.location.origin + '/interstitial');
};

const useTimeWatch = ({ timerData }) => {
  // console.log('useTime timer', timerData);
  const d = timeToSeconds(
    timerData.timer.h,
    timerData.timer.m,
    timerData.timer.s
  );

  const intervalDuration = timeToSeconds(
    timerData.interval.h,
    timerData.interval.m,
    timerData.interval.s
  );
  const initialDirection = () => {
    //timer 0 seconds - run time up (stopwatch mode)
    //timer >0 seconds - run time down (when hits zero switches to overrun )
    return d === 0 ? 1 : -1;
  };

  //const [elapsed, setElapsed] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);
  const [duration, setDuration] = useState(d);
  const [remaining, setRemaining] = useState(d);
  const [direction] = useState(initialDirection);

  const intervalActive = () => {
    return intervalDuration === 0 ? false : true;
  };

  const sayAloud = (announce) => {
    //console.log(speechSynthesis);
    //most odd-speak fires twice if dont trap for pending.
    //speechSynthesis.cancel();
    if (speechSynthesis.pending === false) {
      var msg = new SpeechSynthesisUtterance(announce);
      speechSynthesis.speak(msg);
    }
  };

  /*

todo: 
split 'Audio'  to 'IntervalSounds' and 'AlarmSounds' soooo...
getAudioSrc needs to distinguish

*/
  //console.log('alerts', alerts);
  const intervalAudio = useAudio({
    src: getAudioSrc(timerData.interval.alert, 'IntervalSounds'),
    loop: false
  });

  const endAudio = useAudio({
    src: getAudioSrc(timerData.timer.alert, 'AlarmSounds'),
    loop: true,
    amplificationMultiplier: 1
  });

  const tick = () => {
    console.log('tick');

    clearInterval(countRef.current);
    const stopSecond = 1;
    countRef.current = setInterval(() => {
      setRemaining((remaining) => {
        //start playDuringURL
        if (
          direction === -1 &&
          remaining === d &&
          timerData.timer.hasPlayDuringUrl &&
          timerData.timer.playDuringUrl.length > 5
        ) {
          console.log('timer URL started');
          tabOpener(timerData.timer.playDuringUrl, '_ticabooPlayDuringUrl2');
        }
        //end url playing 5 seconds before end
        if (
          direction === -1 &&
          remaining === 5 &&
          timerData.timer.hasPlayDuringUrl
        ) {
          console.log('timer URL cease before alam ');
          tabHoldingPageLoad();
        }

        //-1 to action on second(tick one behind)
        if (direction === -1 && remaining === stopSecond) {
          if (timerData.timer.hasAlert) {
            endAudio.toggle();
            endAudio.reset();
          }

          // console.log('twice?', direction, remaining);
          if (timerData.timer.hasAnnounce) sayAloud(timerData.timer.announce);

          //end playDuringURL
          if (
            direction === -1 &&
            remaining === stopSecond &&
            timerData.timer.hasPlayDuringUrl
          ) {
            console.log('timer URL Ending');
            tabOpener(timerData.timer.endPlayUrl, '_ticabooPlayDuringUrl2');
          }

          // doneCB(chainActionId);
          //clearInterval(countRef.current); //disabled: always continue overtiming.
        }
        //prevent interval at start & end of timer:
        //todo: allow intervals in stopwatch mode/overrun. more complex that removing these. need to fix short interval oddness as well
        //i.e. unit tests only way.
        //first if: remaining > -1 &&  2nd if: direction === -1 &&
        if (
          intervalActive &&
          remaining > -1 &&
          remaining % intervalDuration === stopSecond
        ) {
          if (
            direction === -1 &&
            remaining !== duration &&
            remaining !== stopSecond
          ) {
            if (timerData.interval.hasAlert) {
              intervalAudio.toggle();
            }
            if (timerData.interval.hasAnnounce)
              sayAloud(timerData.interval.announce);

            //CB halts block - never reaches return... (useCallBack?)/simpler? props/ref?
            //intervalCB();
          }
        }
        // console.log('remaining: ', remaining, direction, remaining + direction);
        return remaining + direction;
      });
    }, 1000);
  };

  //dont need effect -put back in handlers
  // useEffect(() => {
  //   if (isActive && isPaused) {
  //     tick();
  //   }
  // }, [isActive, isPaused]);

  const handleStart = () => {
    console.log('handleStart');
    setIsActive(() => true);
    setIsPaused(() => true);
    clearInterval(countRef.current);
    tick();
  };

  const handlePause = () => {
    console.log('handlePause');

    /*
    a bit complex:
    only load sound kill page if in in play state, and activly alarming, and hasURLEndPlay - phew think thats it!
    */
    if (timerData.timer.hasPlayDuringUrl && tabHandle) tabHoldingPageLoad();

    clearInterval(countRef.current);
    setIsPaused(false);
    if (endAudio.isPlaying) endAudio.toggle();
  };

  const handleResume = () => {
    console.log('handleResume');
    setIsPaused(true);
    tick();
  };

  const handleReset = () => {
    //  console.log('handleReset');
    clearInterval(countRef.current);
    setRemaining(duration);
    setIsActive(false);
    setIsPaused(false);
    //direction +1 means upTimer, cb only on manual reset.
    //if (direction === 1) doneCB();
  };

  const handleResetAndRestart = () => {
    handleReset();
    handleStart();
  };

  //on load kick off timer: causes infinite loop of re-renders:
  //handleStart();

  return {
    remaining,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
    handleResetAndRestart,
    direction,
    setDuration, //x
    setRemaining
  };
};

export default useTimeWatch;
