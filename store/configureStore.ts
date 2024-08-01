import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

function configureStoreProd() {
  return configureStore({
    reducer: rootReducer,
    devTools: false,
  });
}

function configureStoreDev() {
  return configureStore({
    reducer: rootReducer,

    devTools: {
      name: 'EuroAsiaNews Redux',
    },
  });
}

const getConfiguredStore =
  process.env.MODE === 'production' ? configureStoreProd : configureStoreDev;

export default configureStoreDev;
