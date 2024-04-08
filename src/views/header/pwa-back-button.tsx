'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@akinon/next/hooks';

export const PwaBackButton = () => {
  const [isPwa, setIsPWa] = useState(false);

  const router = useRouter();

  const handler = () => {
    const list = window.matchMedia('(display-mode: standalone)');
    setIsPWa(list.matches);
  };

  useEffect(() => {
    handler();

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  if (
    !isPwa ||
    typeof window === 'undefined' ||
    window.history.state.idx === 0
  ) {
    return null;
  }

  return (
    <div className="relative z-10 md:top-0 md:left-0 md:fixed">
      <button
        className="bg-secondary-600 text-white flex items-center justify-center flex-shrink-0 w-12 h-12 md:w-10 md:h-9 active:bg-secondary-700"
        onClick={() => router.back()}
      >
        <svg
          preserveAspectRatio="xMidYMid meet"
          height="1.6em"
          width="1.6em"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          stroke="currentColor"
        >
          <g>
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </g>
        </svg>
      </button>
    </div>
  );
};
