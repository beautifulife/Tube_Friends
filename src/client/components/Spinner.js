import React from 'react';
import { SyncLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="Spinner">
      <SyncLoader sizeUnit="px" size={15} color="#ff0000" loading={true} />
    </div>
  );
};

export default Spinner;
