import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

/*

*/

const CheckedText = ({ name, check, label, type = 'text' }) => {
  const { register, watch, setFocus } = useFormContext();
  const watchChecked = watch(check);

  // useEffect(() => {
  //   if (watchChecked) {
  //     setFocus(name);
  //   }
  // }, [watchChecked, setFocus]);

  return (
    <div className="ml-4 pt-2">
      <span className="ml-1 text-xs text-furniture">{label}</span>
      <div className=" pr-2 mt-1 h-8  w-[210px] rounded-md baseCell">
        <input type="checkbox" {...register(check)} className="ml-2" />

        <input
          type={type}
          {...register(name)}
          className={
            'ml-1 pl-2 mt-1 w-[168px] h-6 rounded-md  baseCell ' +
            (watchChecked ? '' : 'opacity-50')
          }
        />
      </div>
    </div>
  );
};

export default CheckedText;
