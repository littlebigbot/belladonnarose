import * as React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';
import { useColorScheme } from '../utility/hooks';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons/faSun';
import { faMoon } from '@fortawesome/free-solid-svg-icons/faMoon';

function ThemeToggle(): React.ReactElement {

  const [isDark, setIsDark]  = useColorScheme(true);

  const classes = classNames.bind(styles);

  return  <button
    className={classes('ThemeToggle', { night: isDark })}
    onClick={() => {
      setIsDark(!isDark);
    }}
  >
    <Icon className={styles.moon} fixedWidth icon={faMoon} aria-hidden={true} />
    <Icon className={styles.sun} fixedWidth icon={faSun} aria-hidden={true} />
  </button>
}

export default ThemeToggle;
