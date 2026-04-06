
import React, { useEffect, useRef } from 'react';

interface AdMobBannerProps {
  adUnitId: string;
  publisherId: string;
}

const AdMobBanner: React.FC<AdMobBannerProps> = ({ adUnitId, publisherId }) => {
  const adRef = useRef<HTMLElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;

    try {
      // Only push if the element exists and hasn't been initialized yet
      if (adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (e) {
      // Silently catch the "already has ads" error as it's common in React Strict Mode
      if (e instanceof Error && !e.message.includes('already have ads')) {
        console.error('AdMob error:', e);
      }
    }
  }, []);

  return (
    <div className="w-full flex justify-center py-4 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-full overflow-hidden">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '320px', minHeight: '50px' }}
          data-ad-client={publisherId}
          data-ad-slot={adUnitId.split('/')[1] || adUnitId}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdMobBanner;
