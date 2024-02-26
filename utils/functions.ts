import path from 'path';
import fs from 'fs/promises';
import { BillInfo, Month, MonthDictionary } from './interfaces';

export const capitalizeFirstLetter = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || '';

export const getNavbarHeader = (inputString: string): string => {
  if (inputString === '/') return 'TEREMOK';
  const trimmedString = inputString.replace(/^\/+/, '').trim();
  return capitalizeFirstLetter(trimmedString);
};

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const onFormSubmit = (event: any) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  return Object.fromEntries(data.entries());
};

export const extractBillInfoByMonth = (
  selectedMonth: Month,
  billsDataPerYear: BillInfo[]
) => {
  return billsDataPerYear.find((bill: BillInfo) =>
    bill.months.includes(selectedMonth)
  );
};

export const extractRelatedMonthInBundle = (
  selectedMonth: Month,
  billsDataPerYear: BillInfo[]
): Month[] | undefined => {
  return billsDataPerYear.find((bill: BillInfo) =>
    bill.months.includes(selectedMonth)
  )?.months;
};

export const getDisabledMonths = (billsByType: BillInfo[]): MonthDictionary => {
  const disabledMonths: MonthDictionary = {
    January: false,
    February: false,
    March: false,
    April: false,
    August: false,
    December: false,
    July: false,
    June: false,
    May: false,
    October: false,
    November: false,
    September: false,
  };

  billsByType.forEach((bill) => {
    bill.months.forEach((month) => {
      disabledMonths[month] = true;
    });
  });

  return disabledMonths;
};
