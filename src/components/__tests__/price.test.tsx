import { render, screen, fireEvent } from '@testing-library/react';
import { Price } from '../price';
import { Provider } from 'react-redux';
import { store } from '@theme/redux/store';

describe('Price Component', () => {
  it('should change the display type', () => {
    render(
      <Provider store={store}>
        <Price value="1000" displayType="input" />
      </Provider>
    );

    const price = screen.getByRole('textbox');

    price.setAttribute('displayType', 'input');
    expect(price).toHaveAttribute('displayType', 'input');
  });

  it('should change the value of the input', () => {
    render(
      <Provider store={store}>
        <Price value="1000" displayType="input" />
      </Provider>
    );

    const price = screen.getByRole('textbox');

    fireEvent.change(price, {
      target: {
        value: '3333'
      }
    });

    expect(price).toHaveDisplayValue(/3.333/i);
  });

  it('should be removed currency symbol', () => {
    const { container } = render(
      <Provider store={store}>
        <Price value="1000" useCurrencySymbol={false} />
      </Provider>
    );

    const price = container.querySelector('span');

    expect(price).not.toHaveTextContent(new RegExp('[^a-zA-Z0-9]$'));
  });

  it('should be start with a currency symbol', () => {
    const { container } = render(
      <Provider store={store}>
        <Price value="1000" useCurrencyAfterPrice={false} />
      </Provider>
    );

    const price = container.querySelector('span');
    expect(price).toHaveTextContent(new RegExp('^[^a-zA-Z0-9]'));
  });

  it('should be a negative value', () => {
    const { container } = render(
      <Provider store={store}>
        <Price value="1000" useNegative={true} />
      </Provider>
    );

    const price = container.querySelector('span');

    expect(price).toHaveTextContent(new RegExp('^-'));
  });
});
