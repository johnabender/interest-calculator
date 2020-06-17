import { configureStore } from '@reduxjs/toolkit';

import { calculatorApp } from './reducers';

const store = configureStore({ reducer: calculatorApp });

export default store;
