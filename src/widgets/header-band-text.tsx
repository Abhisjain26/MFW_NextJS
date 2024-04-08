import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';

type HeaderBandText = {
  header_band_text?: {
    value?: string;
  };
};

export default async function HeaderBandText() {
  const data = await getWidgetData<HeaderBandText>({
    slug: 'header-band-text'
  });

  return (
    <span className="text-xs text-black">
      {data?.attributes?.header_band_text?.value}
    </span>
  );
}
