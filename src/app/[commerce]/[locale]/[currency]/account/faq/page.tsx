'use client';

import React, { useState } from 'react';
import { FaqFooter, FaqSearch, FaqTabs } from '@theme/views/account/faq';

export default function AccountFaqPage() {
  const [searchKey, setSearchKey] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchKey(value);
  };

  return (
    <div className="flex-1">
      <FaqSearch handleChange={handleChange} searchKey={searchKey} />

      <FaqTabs searchKey={searchKey} />

      <FaqFooter />
    </div>
  );
}
