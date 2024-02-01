// our-domain.com/bills/[billType]/add-bill
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MonthListComponent from '@/components/list/MonthList';
import { Container, Row } from '@/styles/globalStyles';

import { onFormSubmit } from '@/utils/functions';
import {
  Button,
  InputAdornment,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

const AddBillContainer = styled(Container)`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: ${(props) => 100 - props.theme.appBarHeight}vh;
  background-color: pink;
`;

const ContentWrapper = styled(Container)`
  width: 95%;
  display: flex;
  background-color: #28a6cc;
  height: 75vh;
  padding: 10px;
`;

const ContentContainer = styled(Container)`
  flex-direction: column;
  display: flex;
  justify-content: space-around;
`;

const ButtonsContainer = styled(Container)`
  display: flex;
  width: 220px;
  justify-content: space-evenly;
`;

const FormContainer = styled(Container)`
  flex-direction: column;
  width: 50%;
  background-color: #c437bdac;
  height: 50vh;
  padding: 20px;
  margin: 0 70px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  width: 50%;
`;

const StyledStepper = styled(Stepper)`
  width: 80%;
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
  const [confNumber, setConfNumber] = useState('');
  const [payedAmount, setPayedAmount] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const steps = getSteps();
  const isLastStep = activeStep === steps.length - 1;

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (isLastStep) {
      // TODO: send data to BE
      console.log({
        selectedMonths,
        confNumber,
        payedAmount,
      });
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setConfNumber('');
      setPayedAmount('');
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
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  const handleSelectedMonths = (months: string[]) => {
    setSelectedMonths(months);
  };

  const isNextBtnDisabled = useMemo(() => {
    if (activeStep === 0 && selectedMonths.length === 0) return true;
    if (
      activeStep === 1 &&
      (confNumber.length === 0 || payedAmount.length === 0)
    )
      return true;
    return false;
  }, [activeStep, selectedMonths, confNumber, payedAmount]);

  const isMonthListDisabled = useMemo(() => {
    return activeStep !== 0;
  }, [activeStep]);

  const isInputsDisabled = useMemo(() => {
    return activeStep > 1;
  }, [activeStep]);

  const handleConfNumberChange = (event: any) => {
    setConfNumber(event.target.value);
  };

  const handlePayedAmountChange = (event: any) => {
    setPayedAmount(event.target.value);
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
            <Row>
              <MonthListComponent
                getSelectedMonths={handleSelectedMonths}
                isListDisabled={isMonthListDisabled}
              />
              {activeStep > 0 && (
                <FormContainer>
                  <Typography>Confirmation number</Typography>
                  <StyledTextField
                    id='conf-number'
                    label='Confirmation number'
                    variant='outlined'
                    margin='normal'
                    value={confNumber}
                    onChange={handleConfNumberChange}
                    disabled={isInputsDisabled}
                  />

                  <Typography>Payed amount</Typography>
                  <StyledTextField
                    id='payed-amount'
                    label='Payed amount'
                    variant='outlined'
                    margin='normal'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>{`\u20aa`}</InputAdornment>
                      ),
                    }}
                    value={payedAmount}
                    onChange={handlePayedAmountChange}
                    disabled={isInputsDisabled}
                  />
                </FormContainer>
              )}
            </Row>
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
                  href={`/bills/`}
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
