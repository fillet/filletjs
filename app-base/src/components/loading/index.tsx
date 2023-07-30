import classNames from 'classnames';
import React from 'react';

import './index.scss';

interface Props {
  visible?: boolean;
  overlay?: boolean;
}

const Loading = ({ visible = true, overlay }: Props): JSX.Element | null => {
  if (!visible) return null;

  return (
    <div className={classNames('Loading', { 'Loading--overlay': overlay })}>
      <span className='Loading__spinner'></span>
    </div>
  );
};

export default Loading;
