// components/ErrorMessage.tsx
'use client';

import React from 'react';

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="text-red-500 text-sm my-2">
      {message}
    </div>
  );
};

export default ErrorMessage;
