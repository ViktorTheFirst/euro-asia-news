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

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserRegistrationData extends UserLoginData {
  name: string;
  partnerName: string;
  partnerEmail: string;
}

// -------------- BILLS INTERFACES ---------------------
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

export interface BillInfo {
  _id: string;
  householdId: string;
  billType: string;
  year: string;
  months: Month[];
  confirmationNumber: string;
  payedAmount: string;
}

export type MonthDictionary = {
  [month in Month]: boolean;
};

// -------------- SJOPLIST INTERFACES ---------------------

export interface ShopListItem {
  title: string;
  amount: number;
  isDone: boolean;
}
