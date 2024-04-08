import { useMemo } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { getCurrency } from '@akinon/next/utils';
import { PriceProps } from '@theme/types';
import { useLocalization } from '@akinon/next/hooks';

export const Price = (props: NumberFormatProps & PriceProps) => {
  const {
    value,
    currencyCode,
    displayType = 'text',
    useCurrencySymbol = false,
    useCurrencyAfterPrice = true,
    useCurrencySpace = true,
    useNegative = false,
    useNegativeSpace = true,
    thousandSeparator = '.',
    decimalScale = 2,
    decimalSeparator = ',',
    fixedDecimalScale = true,
    ...rest
  } = props;
  const { currency: selectedCurrencyCode } = useLocalization();
  const currencyCode_ = currencyCode || selectedCurrencyCode;

  // TODO: This is very bad practice. It broke decimalScale.
  const _value = value?.toString().replace('.', ',');

  const currency = useMemo(
    () =>
      getCurrency({
        currencyCode: currencyCode_,
        useCurrencySymbol,
        useCurrencyAfterPrice,
        useCurrencySpace
      }),
    [currencyCode_, useCurrencySymbol, useCurrencyAfterPrice, useCurrencySpace]
  );

  return (
    <NumberFormat
      value={useNegative ? `-${useNegativeSpace}${_value}` : _value}
      {...{
        [useCurrencyAfterPrice ? 'suffix' : 'prefix']: currency
      }}
      displayType={displayType}
      thousandSeparator={thousandSeparator}
      decimalScale={decimalScale}
      decimalSeparator={decimalSeparator}
      fixedDecimalScale={fixedDecimalScale}
      {...rest}
    />
  );
};
