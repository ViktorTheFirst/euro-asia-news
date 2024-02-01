import {
  BillsInfoPerYear,
  CategoriesData,
  Month,
  SelectOption,
} from './interfaces';

export const MOCK_YEARS_OPTIONS: SelectOption[] = [
  { label: '2022', value: '2022' },
  { label: '2023', value: '2023' },
  { label: '2024', value: '2024' },
];

export const MOCK_BILLS_INFO_PER_YEAR: BillsInfoPerYear = {
  '2022': {
    January: { confirmationNumber: '789012345', payedAmount: '387' },
    February: { confirmationNumber: '456789012', payedAmount: '241' },
    March: { confirmationNumber: '234567890', payedAmount: '413' },
    April: { confirmationNumber: '901234567', payedAmount: '162' },
    May: { confirmationNumber: '678901234', payedAmount: '499' },
    June: { confirmationNumber: null, payedAmount: null },
    July: { confirmationNumber: '012345678', payedAmount: '422' },
    August: { confirmationNumber: '789012345', payedAmount: '177' },
    September: { confirmationNumber: '456789012', payedAmount: '358' },
    October: { confirmationNumber: null, payedAmount: null },
    November: { confirmationNumber: null, payedAmount: null },
    December: { confirmationNumber: null, payedAmount: null },
  },
  '2023': {
    January: { confirmationNumber: '654321789', payedAmount: '415' },
    February: { confirmationNumber: '321789456', payedAmount: '283' },
    March: { confirmationNumber: '987654321', payedAmount: '392' },
    April: { confirmationNumber: '654321987', payedAmount: '187' },
    May: { confirmationNumber: '321987654', payedAmount: '458' },
    June: { confirmationNumber: '987654321', payedAmount: '326' },
    July: { confirmationNumber: '654321987', payedAmount: '291' },
    August: { confirmationNumber: null, payedAmount: null },
    September: { confirmationNumber: null, payedAmount: null },
    October: { confirmationNumber: null, payedAmount: null },
    November: { confirmationNumber: null, payedAmount: null },
    December: { confirmationNumber: null, payedAmount: null },
  },
  '2024': {
    January: { confirmationNumber: '789654321', payedAmount: '382' },
    February: { confirmationNumber: '456321789', payedAmount: '268' },
    March: { confirmationNumber: null, payedAmount: null },
    April: { confirmationNumber: '987654321', payedAmount: '154' },
    May: { confirmationNumber: '654321987', payedAmount: '478' },
    June: { confirmationNumber: '321987654', payedAmount: '319' },
    July: { confirmationNumber: '987654321', payedAmount: '411' },
    August: { confirmationNumber: '654321987', payedAmount: '188' },
    September: { confirmationNumber: '321987654', payedAmount: '377' },
    October: { confirmationNumber: '987654321', payedAmount: '291' },
    November: { confirmationNumber: '654321987', payedAmount: '432' },
    December: { confirmationNumber: null, payedAmount: null },
  },
};

export const MOCK_MONTHS: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const MOCK_BILLS_TOPICS = ['Water', 'Electricity', 'Arnona', 'Other'];

export const MOCK_CATEGORIES_DATA: CategoriesData[] = [
  {
    title: 'Electrical appliances',
    items: [
      { id: 'b932c0dc-0810-4dc6-8e92-ab15ab530914', title: 'invoice name1' },
      { id: '58a3c621-c676-4c0b-8e0c-2a7788428e64', title: 'invoice name2' },
    ],
  },
  {
    title: 'Computers',
    items: [
      { id: '78d50f1e-e969-46b5-8b72-b8e5d75ae34b', title: 'invoice name3' },
      { id: '24e719b1-b315-437b-aa69-4293bbe835cf', title: 'invoice name4' },
    ],
  },
  {
    title: 'Kids',
    items: [
      { id: 'a5bdc5ce-b2a3-4871-b452-9db0797aab2a', title: 'invoice name5' },
      { id: '9354880d-bd29-4821-b74d-4f70fca79272', title: 'invoice name6' },
    ],
  },
  {
    title: 'Garden',
    items: [
      { id: 'c99603dc-e388-402c-a496-809c161c1407', title: 'invoice name7' },
      { id: 'df988332-bd47-4da6-a288-5be097ec4c7b', title: 'invoice name8' },
    ],
  },
];
