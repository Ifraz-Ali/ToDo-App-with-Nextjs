// components/ErrorMessage.tsx
'use client';

import React from 'react';

const AlertMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-yellow-500 text-sm my-2">
      {message}
    </div>
  );
};

export default AlertMessage;
