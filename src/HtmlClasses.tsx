import * as React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';

const classCase = (string: string): string => {
  return string.toLowerCase().replace(/-_\//g, '-');
}

function HtmlClasses(): null  {
  const location = useLocation();

  const path = location.pathname.replace(/\//g,'');

  const locationClass = path.length ? `location-${classCase(path)}` : 'no-location';

  document.documentElement.className = classNames(
    locationClass,
  );


  return null;
}

export default HtmlClasses;
