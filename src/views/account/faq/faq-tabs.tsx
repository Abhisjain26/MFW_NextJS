'use client';

import { Accordion, LoaderSpinner, TabPanel, Tabs } from '@theme/components';
import React from 'react';
import { useGetWidgetQuery } from '@akinon/next/data/client/misc';

interface Props {
  searchKey?: string;
}

export function FaqTabs(props: Props) {
  const { searchKey } = props;
  const { data, isLoading } = useGetWidgetQuery('faq');

  if (isLoading) {
    return <LoaderSpinner className="mt-4" />;
  }

  return (
    <div className="px-4 py-6 border border-gray-500 mb-5 space-y-3 lg:px-8 lg:py-10 lg:my-4">
      <Tabs>
        {data?.attributes?.faq_categories?.map((item, index) => (
          <TabPanel key={index} title={item.value.category}>
            <div key={index}>
              <div className="text-lg font-medium text-black-700 mb-4">
                {item.value.category}
              </div>

              {data?.attributes?.faq_contents
                ?.filter(
                  (faq) =>
                    faq.value.content.toLocaleLowerCase().includes(searchKey) ||
                    faq.value.title.toLocaleLowerCase().includes(searchKey)
                )
                .map((faq, index) => {
                  if (faq.value.category == item.value.category_id) {
                    return (
                      <Accordion title={faq.value.title} key={index}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: faq.value.content
                          }}
                        />
                      </Accordion>
                    );
                  }
                })}
            </div>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}
