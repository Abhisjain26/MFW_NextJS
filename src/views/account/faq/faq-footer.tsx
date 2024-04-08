'use client';

import { Link } from '@theme/components';
import React from 'react';
import { ROUTES } from '@theme/routes';
import { Trans } from '@akinon/next/components/trans';

export function FaqFooter() {
  const LinkText = (props) => {
    return (
      <Link {...props} href={props.href || '#'} className="underline">
        {props.title}
      </Link>
    );
  };

  return (
    <div className="text-sm mt-6">
      <Trans
        i18nKey="account.faq.footer.info"
        components={{
          ContactLink: (
            <LinkText href={ROUTES.ACCOUNT_CONTACT} title="contact us" />
          ),
          Faq: <LinkText href={ROUTES.ACCOUNT_FAQ} title="FAQ" />
        }}
      />
    </div>
  );
}
