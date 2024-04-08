# Delete Account

To deactivate a user's account, a request is sent to the `useAnonymizeMutation` service. This service provides the user with the option to delete their account.

The **useAnonymizeMutation** function is imported from `@akinon/next/data/client/account` as below:

```js
import { useAnonymizeMutation } from '@akinon/next/data/client/account';
```

To use the function, create a variable, call the **useAnonymizeMutation** function, and execute the request. The example below demonstrates when the **Delete My Account** button is clicked, the **deleteUser** function is invoked.

```js
const [ deleteUser, { isLoading: isDeleting, error: responseError, isError, isSuccess } ] = useAnonymizeMutation();

return (
  <Button onClick={() => deleteUser()}>
    {isDeleting ? (
      <LoaderSpinner />
    ) : (
      Delete My Account
    )}
  </Button>
)
```
