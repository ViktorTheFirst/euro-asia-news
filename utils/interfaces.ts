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
}

export interface ValidationError {
  type: string;
  error: string;
}

export enum ValidationFields {
  name = 'name',
  email = 'email',
  password = 'password',
  passwordAgain = 'passwordAgain',
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

// -------------- SHOPLIST INTERFACES ---------------------

export interface ShopListItem {
  _id?: string;
  title: string;
  amount: number;
  isDone: boolean;
}

export interface ShopListData {
  householdId: string;
  initialList: ShopListItem[];
  shopList: ShopListItem[];
  isChanged: boolean;
}

// -------------- NEWS INTERFACES ---------------------

export enum PragraphRole {
  lead = 'lead',
  quote = 'quote',
  regular = 'regular',
}

export enum ArticleType {
  main = 'main',
  image = 'image',
  video = 'video',
  audio = 'audio',
  regular = 'regular',
}
export interface IParagraph {
  role: PragraphRole;
  text: string;
}

export type IArticlePreview = Pick<
  IArticle,
  | 'previewImageURL'
  | 'previewImageAlt'
  | 'h1'
  | 'itemId'
  | 'tags'
  | 'h1Paragraphs'
  | 'articleType'
>;

export interface IArticle {
  itemId: string;
  articleType: ArticleType;
  previewImageURL: string;
  previewImageAlt: string;
  h1: string;
  date: Date;
  h1Paragraphs: IParagraph[];
  h2: string;
  h2Paragraphs: IParagraph[];
  h3: string;
  h3Paragraphs: IParagraph[];
  imageURL: string;
  imageAlt: string;
  authorh4: string;
  authorParagraph: IParagraph;
  authorMedia: string[];
  tags: string[];
}
