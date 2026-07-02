'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-XL80CN2QPP';

const GoogleAnalyticsPageView: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const page = query ? `${pathname}?${query}` : pathname;

    ReactGA.send({ hitType: 'pageview', page });
  }, [pathname, searchParams]);

  return null;
};

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      gtagOptions: { send_page_view: false },
    });
  }, []);

  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsPageView />
    </Suspense>
  );
};

export default GoogleAnalytics;
