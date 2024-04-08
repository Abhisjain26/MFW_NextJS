'use client';

import { useLocalization } from '@akinon/next/hooks';
import { Link } from '@theme/components';
import { ROUTES } from '@theme/routes';

export default function Error() {
  const { t } = useLocalization();

  return (
    <section className="text-center px-6 my-14 md:px-0 md:m-14">
      <div className="text-7xl font-bold md:text-8xl">500</div>
      <h1 className="text-lg md:text-xl"> {t('common.page_500.title')} </h1>
      <p className="text-lg md:text-xl"> {t('common.page_500.description')} </p>
      <Link href={ROUTES.HOME} className="text-lg underline">
        {t('common.page_500.link_text')}
      </Link>
    </section>
  );
}
