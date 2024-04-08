import 'server-only';

import { getWidgetData } from '@akinon/next/data/server';

type FooterCopyrightItem = {
  value: string;
};

type FooterCopyrightType = {
  copyright_text: FooterCopyrightItem;
};

export default async function FooterCopyright() {
  const data = await getWidgetData<FooterCopyrightType>({
    slug: 'footer-copyright'
  });

  return (
    <div className="flex items-center justify-center border-t px-4 py-3 bg-gray-100 w-full bg-transparent	">
      <span className="text-xs text-black">
        {data?.attributes?.copyright_text?.value}
      </span>
    </div>
  );
}
