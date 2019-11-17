import React from 'react';
import { useStores } from '../../hooks/user-store';
import { observer } from 'mobx-react';

export const ThemeToggler = observer(() => {
  const { themeStore } = useStores()

  return (
    <>
      <div>{themeStore.theme}</div>
      <button onClick={() => themeStore.setTheme('light')}>
        set theme: light
      </button>
      <button onClick={() => themeStore.setTheme('dark')}>
        set theme: dark
      </button>
    </>
  )
})