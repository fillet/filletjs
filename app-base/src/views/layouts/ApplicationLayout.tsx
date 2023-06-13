import React from 'react';
import { Outlet } from 'react-router-dom';

import { NotificationContainer } from '@features/toastify-notification';

import './ApplicationLayout.scss';

class ApplicationLayout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Outlet />

        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default ApplicationLayout;
