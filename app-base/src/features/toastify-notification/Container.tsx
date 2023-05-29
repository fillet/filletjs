import React from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastNotificationContainer = (): JSX.Element => <ToastContainer position='bottom-center' />;

ToastNotificationContainer.defaultProps = {};

export default ToastNotificationContainer;
