import { CategoriesData } from './interfaces';

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
