import React, { useEffect } from 'react';
import { ReplayIcon } from '../../icons';
import { useFormContext } from 'react-hook-form';

import ButtonAnimation from './ButtonAnimation';

/*

*/

const ReplayButton = ({ clickHandler }) => {
  // const { watch } = useFormContext();

  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <div className="border-neutral-300 border-2 rounded-full mx-2 p-1 ">
        <ReplayIcon />
      </div>
    </ButtonAnimation>
  );
};

export default ReplayButton;
