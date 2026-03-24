import React from 'react';

const EmptyState = ({
  title = 'No data available',
  description = 'There is nothing to display right now. Try changing the date',
  action = "Create Booking",
  reaction = () => {}
}) => {
  return (
    <div className="fixed top-0 flex flex-col w-full h-screen items-center justify-center text-center px-4">
      <div className="text-5xl mb-4">📭</div>

      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-500 max-w-sm mb-4">
        {description}
      </p>

      {action && (
        <button className="px-4 py-2 bg-black text-white rounded" onClick={reaction}>
            {action}
        </button>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
