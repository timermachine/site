import { useForm, FormProvider } from 'react-hook-form';
import TimerView from './TimerView';

function Timer({ timer, craddTimer, removeTimer, duplicateTimer }) {
  const methods = useForm({
    defaultValues: timer,
    mode: 'onBlur' //required for control - for react-select
  });
  return (
    //pass crud functions to FormProvider (so dont have to prop drill them?)
    <FormProvider {...methods}>
      {/* T: */}
      <TimerView
        methods={methods}
        craddTimer={craddTimer}
        removeTimer={removeTimer}
        duplicateTimer={duplicateTimer}
      />
    </FormProvider>
  );
}

export default Timer;
