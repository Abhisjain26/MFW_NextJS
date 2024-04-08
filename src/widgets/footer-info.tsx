import 'server-only';

import { Link } from '@theme/components';
import { getWidgetData } from '@akinon/next/data/server';

type FooterInfoItem = {
  value: string;
};

type FooterInfoType = {
  logo_class?: FooterInfoItem;
  button_link: FooterInfoItem;
  description: FooterInfoItem;
  button_text: FooterInfoItem;
  title: FooterInfoItem;
};

export default async function FooterInfo() {
  const data = await getWidgetData<FooterInfoType>({ slug: 'footer-info' });

  return (
    <div className="flex flex-col w-full mb-4 pb-4 text-xs border-b md:border-b-0 md:pb-0 md:mb-0 md:w-3/12 lg:w-1/6 md:pr-7">
      <div className="flex items-center mb-8">
        <div className="mr-3">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            viewBox="0 0 42 42"
          >
            <defs>
              <filter id="t1e4dv4wva">
                <feColorMatrix
                  in="SourceGraphic"
                  values="0 0 0 0 0.816000 0 0 0 0 0.169000 0 0 0 0 0.184000 0 0 0 1.000000 0"
                />
              </filter>
            </defs>
            <g fill="none" fillRule="evenodd">
              <g>
                <g
                  filter="url(#t1e4dv4wva)"
                  transform="translate(-84 -1211) translate(0 1143)"
                >
                  <g>
                    <path
                      fill="#d02b2f"
                      d="M25.915 19.945c-3.562 0-6.449 2.937-6.449 6.559 0 3.622 2.887 6.558 6.45 6.558 3.56 0 6.448-2.936 6.448-6.558s-2.887-6.559-6.449-6.559zm11 11.885c-1.959 4.176-6.147 7.062-11 7.062-6.728 0-12.181-5.546-12.181-12.388s5.453-12.389 12.181-12.389c.77 0 1.52.076 2.25.214L21 0 0 42h42l-5.085-10.17z"
                      transform="translate(84 68)"
                    />
                  </g>
                </g>
              </g>
            </g>
          </svg> */}
        </div>

        <span className="text-2xl font-medium leading-6 uppercase">
          <div
            dangerouslySetInnerHTML={{
              __html: `${data?.attributes?.title?.value}`
            }}
          />
        </span>
      </div>

      <div className="md:mb-10">{data?.attributes?.description?.value}</div>

      <div className="font-medium underline">
        {data?.attributes?.button_link && (
          <Link href={data?.attributes?.button_link?.value}>
            {data?.attributes?.button_text?.value}
          </Link>
        )}
      </div>
    </div>
  );
}
