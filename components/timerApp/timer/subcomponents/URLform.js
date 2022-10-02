import React from 'react';
import CheckedText from './CheckedText';
import { useFormContext } from 'react-hook-form';
import CheckedSelect from './CheckedSelect';
import audioData from '../../data/audio.json';

// name: 
const URLform = ({ name, label }) => {
  const { register, watch } = useFormContext();

  return (
    <div className=" border-t border-amber-500 mb-2">
      <CheckedSelect
        check={name + 'hasStartPlaylist'}
        selector={name + 'startPlaylist'}
        label="Start playlist"
        selectOptions={audioData.Media}
      />
      <CheckedSelect
        check={name + 'hasEndPlaylist'}
        selector={name + 'endPlaylist'}
        label="On End playlist"
        selectOptions={audioData.Media}
      />
      <CheckedText
        name={'timer.playDuringUrl'}
        check={'timer.hasPlayDuringUrl'}
        type="url"
        label="Play link"
      />
      <CheckedText
        name={'timer.endPlayUrl'}
        check={'timer.hasEndPlayUrl'}
        type="url"
        label="On End link"
      />
    </div>
  );
};

export default URLform;
