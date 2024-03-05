// our-domain.com/bills/[billType]/add-bill
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Divider,
  Box,
  Typography,
} from '@mui/material';

import MonthListComponent from '@/components/list/MonthList';
import BillForm from '@/components/form/BillForm';
import {
  getCreationBill,
  setCreationBillInfoAction,
  resetCreationBillInfoAction,
} from '@/store/Bills';
import { BillInfo, Month } from '@/utils/interfaces';
import { addBillAPI, getBillsByTypeAPI } from '@/api/bills/billsAPI';
import { getDisabledMonths } from '@/utils/functions';

const getSteps = () => {
  return ['Select period to pay', 'Add additional data', 'Upload the bill'];
};

interface AddBillPageProps {
  billsByType: BillInfo[];
}

const AddBillPage = ({ billsByType }: AddBillPageProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const router = useRouter();
  const dispatch = useDispatch();

  const creationBill = useSelector(getCreationBill);

  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const isNextBtnDisabled = useMemo(() => {
    if (activeStep === 0 && creationBill.months.length === 0) return true;
    if (
      activeStep === 1 &&
      (creationBill.confirmationNumber.length === 0 ||
        creationBill.payedAmount.length === 0)
    )
      return true;
    return false;
  }, [activeStep, creationBill]);

  const isMonthListDisabled = useMemo(() => {
    return activeStep !== 0;
  }, [activeStep]);

  const isInputsDisabled = useMemo(() => {
    return activeStep > 1;
  }, [activeStep]);

  const alreadyPopulatedMonths = useMemo(
    () => getDisabledMonths(billsByType),
    [billsByType]
  );

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (isLastStep) {
      // first add the bill then redirect to bills page so updated bills can be fetched
      addBillAPI(creationBill)
        .then(() => {
          dispatch(resetCreationBillInfoAction());
        })
        .finally(() => {
          router.push(`/bills/${router.query.billType}`);
        });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      dispatch(
        setCreationBillInfoAction({
          ...creationBill,
          confirmationNumber: '',
          payedAmount: '',
        })
      );
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSelectedMonths = (months: Month[]) => {
    dispatch(setCreationBillInfoAction({ ...creationBill, months }));
  };

  const handleConfNumberChange = (event: any) => {
    dispatch(
      setCreationBillInfoAction({
        ...creationBill,
        confirmationNumber: event.target.value,
      })
    );
  };

  const handlePayedAmountChange = (event: any) => {
    dispatch(
      setCreationBillInfoAction({
        ...creationBill,
        payedAmount: event.target.value,
      })
    );
  };

  return (
    <Box
      component={Box}
      display='flex'
      flexDirection='column'
      justifyContent='space-around'
      alignItems='center'
      sx={{ height: (theme) => `calc(100vh - ${theme.appBarHeight}vh)` }}
    >
      <Stepper
        activeStep={activeStep}
        sx={{ width: '80%', caretColor: 'transparent', minHeight: '60px' }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant='caption'>Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box
        component={Box}
        display='flex'
        flexDirection='column'
        sx={{ height: '75vh', width: '95%', padding: '10px' }}
      >
        <Box
          component={Box}
          display='flex'
          flexDirection='column'
          justifyContent='space-around'
        >
          <Box component={Box} display='flex' justifyContent='space-evenly'>
            <MonthListComponent
              isListDisabled={isMonthListDisabled}
              disabledItems={alreadyPopulatedMonths}
              getSelectedMonths={handleSelectedMonths}
            />
            {activeStep > 0 && (
              <>
                <Divider orientation='vertical' flexItem />
                <BillForm
                  confirmationNumber={creationBill.confirmationNumber}
                  payedAmount={creationBill.payedAmount}
                  isInputsDisabled={isInputsDisabled}
                  confNumberChangeHandler={handleConfNumberChange}
                  payedAmountChangeHandler={handlePayedAmountChange}
                />
              </>
            )}
          </Box>
          <Box component={Box} display='flex' justifyContent='flex-end' sx={{}}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            {isStepOptional(activeStep) && (
              <Button
                sx={{ marginLeft: '10px' }}
                variant='contained'
                color='primary'
                onClick={handleSkip}
              >
                Skip
              </Button>
            )}
            {isLastStep ? (
              <Button variant='contained' color='primary' onClick={handleNext}>
                Finish
              </Button>
            ) : (
              <Button
                disabled={isNextBtnDisabled}
                variant='contained'
                color='primary'
                onClick={handleNext}
                sx={{ marginLeft: '10px' }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = context.req.cookies;
  const params = context.params;
  const billsByType = await getBillsByTypeAPI(
    params?.billType as string,
    cookies.householdId!
  );

  return {
    props: {
      billsByType: billsByType?.data,
    },
  };
};

export default AddBillPage;
