import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

function configureStoreDev() {
  return configureStore({
    reducer: rootReducer,

    devTools: {
      name: 'EuroAsiaNews Redux',
    },
  });
}

export default configureStoreDev;
