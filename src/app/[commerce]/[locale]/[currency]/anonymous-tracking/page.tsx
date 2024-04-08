'use client';

import { AnonymousTracking } from '@theme/views/anonymous-tracking';
import { AnonymousTrackingOrderDetail } from '@theme/views/anonymous-tracking/order-detail';
import { Login } from '@theme/views/login';
import { useSearchParams } from 'next/navigation';

import { useMemo, useState } from 'react';

export default function AnonymousTrackingPage() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);

  const isSuccess = useMemo(() => {
    const successParam = searchParams.get('formSuccess');

    return successParam === 'true';
  }, [searchParams]);

  return (
    <div className="container px-4 lg:px-0 lg:mx-auto">
      {isSuccess ? (
        <AnonymousTrackingOrderDetail order={order} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 my-7 md:mt-20">
          <Login />

          <AnonymousTracking setOrder={setOrder} />
        </div>
      )}
    </div>
  );
}
