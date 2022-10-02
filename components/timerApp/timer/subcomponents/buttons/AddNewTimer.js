import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import Quote from '../../../Quote';

const AddNewTimer = ({ addNewTimer }) => {
  return (
    <div className="container flex flex-col rounded-lg baseCard baseWhite  w-[275px] border-amber-500 px-4 m-4">
      <Quote />
      <div className="grid place-items-center justify-center  h-[150px]">
        <ButtonAnimation clickHandler={addNewTimer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </ButtonAnimation>
      </div>
    </div>
  );
};

export default AddNewTimer;
