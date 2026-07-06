'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-XL80CN2QPP';

const GoogleAnalyticsTracker: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current) {
      ReactGA.initialize(GA_MEASUREMENT_ID, {
        gtagOptions: { send_page_view: false },
      });
      isInitializedRef.current = true;
    }

    const query = searchParams.toString();
    const page = query ? `${pathname}?${query}` : pathname;

    ReactGA.send({ hitType: 'pageview', page });
  }, [pathname, searchParams]);

  return null;
};

const GoogleAnalytics: React.FC = () => (
  <Suspense fallback={null}>
    <GoogleAnalyticsTracker />
  </Suspense>
);

export default GoogleAnalytics;
