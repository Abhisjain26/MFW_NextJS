'use client';

import { useLocalization } from '@akinon/next/hooks';
import { Select } from './select';

interface LanguageSelectProps {
  className?: string;
}

export const LanguageSelect = (props: LanguageSelectProps) => {
  const { locale, locales, setLocale } = useLocalization();

  const handleChange = async (e) => {
    const selectedLanguage = e.currentTarget.value;

    setLocale(selectedLanguage);
  };

  return (
    <Select
      onChange={handleChange}
      options={locales.map((lang) => ({
        value: lang.value,
        label: lang.label
      }))}
      value={locale}
      icon="globe"
      data-testid="language"
      borderless
      className={props.className}
    />
  );
};
