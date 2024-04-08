import React from 'react';

export type PaymentHeaderProps = {
  title: string;
};

const PaymentHeader = ({ title }: PaymentHeaderProps) => {
  return (
    <div className="flex justify-start items-center border-solid border-gray-400 px-4 py-2 sm:px-6 sm:py-3 sm:min-h-15">
      <span className="text-black-800 text-lg font-medium sm:text-2xl">
        {title}
      </span>
    </div>
  );
};

export default PaymentHeader;
