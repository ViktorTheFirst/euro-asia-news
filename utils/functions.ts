import { BillInfo, Month, MonthDictionary, PragraphRole } from './interfaces';

export const capitalizeFirstLetter = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || '';

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

export const getUrlFromArticle = (h1: string, itemId: string): string => {
  return `${h1.replace(/ /g, '_').toLowerCase()}+${itemId}`;
};

export const formatDate = (dateInput: Date | string | number): string => {
  // Ensure we have a Date object
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  try {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Error formatting date';
  }
};
