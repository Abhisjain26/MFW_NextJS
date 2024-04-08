# Advanced Usage

## Configuring 3D Payment Based on Country

To enable or disable 3D Payment selectively for different countries, set the `use_three_d` parameter to `false` in the `useCompleteCreditCardPaymentMutation` as provided below:

```js
const [completeCreditCardPayment] = useCompleteCreditCardPaymentMutation();

const response = await completeCreditCardPayment({
  ...data,
  use_three_d: false
}).unwrap();
```

## Removing Experimental or Other Options from Next Config

To remove experimental flags from your `next.config.js` file, use the following code:

```js
const enhancedConfig = withPzConfig(nextConfig);

// ...

delete enhancedConfig.experimental.serverActions;
```

## Customizing Response in Middleware.ts

If you use a custom response such as NextResponse.json(), make sure to set the `pz-override-response` header to `true`, as provided below. Otherwise, you will get a 404 error.

```js
const middleware: NextMiddleware = (
  req: PzNextRequest,
  event: NextFetchEvent
) => {
  if (myCondition) {
    return NextResponse.json({ status: 'ok' }, { headers: { 'pz-override-response': 'true' } });
  }

  return NextResponse.next();
};
```
