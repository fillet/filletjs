import React from 'react';

import FilletLogo from './images/logo.svg';
import './index.scss';

const HomeView = (): JSX.Element => (
  <div className="HomeView">
    <img src={FilletLogo} alt="Logo Fillet" />
  </div>
);

export default HomeView;
