import React from 'react';
import { CounterStore, ThemeStore } from '../store';

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore()
})