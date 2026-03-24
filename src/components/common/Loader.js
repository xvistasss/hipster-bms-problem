import React from 'react';

const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed flex flex-1 w-full h-screen z-40 items-center justify-center p-4 text-sm text-gray-500">
      <div className="w-10 h-10 animate-spin rounded-full border-b-2 border-red-500" />
      <span className="absolute ml-2">{message}</span>
    </div>
  );
};

export default Loader;
