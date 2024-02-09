// our-domain.com/bills/[billType]/add-bill
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';

import MonthListComponent from '@/components/list/MonthList';
import { Container, Row } from '@/styles/globalStyles';
import BillForm from '@/components/forms/BillForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCreationBill,
  setCreationBillInfoAction,
  resetCreationBillInfoAction,
} from '@/store/Bills';
import { BillInfo, Month } from '@/utils/interfaces';
import { baseUrl } from '@/utils/constants';
import { addBillAPI } from '@/api/bills/billsAPI';

const AddBillContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: pink;
`;

const ContentWrapper = styled(Container)`
  width: 95%;
  background-color: #28a6cc;
  height: 75vh;
  padding: 10px;
`;

const ContentContainer = styled(Container)`
  flex-direction: column;
  justify-content: space-around;
`;

const ButtonsContainer = styled(Container)`
  width: 220px;
  justify-content: space-evenly;
`;

const StyledStepper = styled(Stepper)`
  width: 80%;
`;

const StyledRow = styled(Row)`
  min-height: 50vh;
  justify-content: space-around;
`;

const getSteps = () => {
  return ['Select period to pay', 'Add additional data', 'Upload the bill'];
};

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return 'Select the month for this bill';
    case 1:
      return 'Add a confirmation number and payed amount';
    case 2:
      return 'Press Finish to upload the bill';
    default:
      return 'Unknown step';
  }
}

const AddBillPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const creationBill = useSelector(getCreationBill);

  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

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
      addBillAPI(creationBill).then((result) => {
        console.log('Bill has been added: ', result?.data);
        dispatch(resetCreationBillInfoAction());
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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSelectedMonths = (months: Month[]) => {
    dispatch(setCreationBillInfoAction({ ...creationBill, months }));
  };

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
    <AddBillContainer>
      <StyledStepper activeStep={activeStep}>
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
      </StyledStepper>
      <ContentWrapper>
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <ContentContainer>
            <Typography variant='h6'>{getStepContent(activeStep)}</Typography>
            <StyledRow>
              <MonthListComponent
                getSelectedMonths={handleSelectedMonths}
                isListDisabled={isMonthListDisabled}
              />
              {activeStep > 0 && (
                <BillForm
                  confirmationNumber={creationBill.confirmationNumber}
                  payedAmount={creationBill.payedAmount}
                  isInputsDisabled={isInputsDisabled}
                  confNumberChangeHandler={handleConfNumberChange}
                  payedAmountChangeHandler={handlePayedAmountChange}
                />
              )}
            </StyledRow>
            <ButtonsContainer>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}
              {isLastStep ? (
                <Button
                  href={`/bills/${router.query.billType}`}
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                  component={Link}
                >
                  {'Finish'}
                </Button>
              ) : (
                <Button
                  disabled={isNextBtnDisabled}
                  variant='contained'
                  color='primary'
                  onClick={handleNext}
                >
                  {'Next'}
                </Button>
              )}
            </ButtonsContainer>
          </ContentContainer>
        )}
      </ContentWrapper>
    </AddBillContainer>
  );
};

export default AddBillPage;
