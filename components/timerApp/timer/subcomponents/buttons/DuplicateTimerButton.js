import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { DuplicateIcon } from '../../icons';
import ButtonAnimation from './ButtonAnimation';

/*

*/

const DuplicateTimerButton = ({ clickHandler }) => {
  const { watch } = useFormContext();
  //const watchID = watch('id');

  const duplicateTimerHandler = () => {
    clickHandler(watch());
  };
  return (
    <ButtonAnimation
      className="rounded-full  p-1 "
      clickHandler={duplicateTimerHandler}>
      <DuplicateIcon />
    </ButtonAnimation>
  );
};

export default DuplicateTimerButton;
