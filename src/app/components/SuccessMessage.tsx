// components/ErrorMessage.tsx
'use client';

import React from 'react';

const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-green-500 text-sm my-2">
      {message}
    </div>
  );
};

export default SuccessMessage;
