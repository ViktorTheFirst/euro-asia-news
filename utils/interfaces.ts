export interface CategoriesData {
  title: string;
  items: InvoiceData[];
}

export interface InvoiceData {
  id: string;
  title: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface MonthInfo {
  confirmationNumber: string | null;
  payedAmount: string | null;
}

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export interface BillsInfo {
  [month: string]: MonthInfo;
}
export interface BillsInfoPerYear {
  [year: string]: BillsInfo;
}
