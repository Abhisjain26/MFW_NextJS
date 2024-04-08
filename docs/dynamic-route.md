## Dynamic Route

**Some Pages Where Dynamic Route is Used**

-   `/users/email-set-primary/${TOKEN-ID}`
-   `/users/registration/account-confirm-email/${TOKEN-ID}`

The page **/users/email-set-primary/${TOKEN-ID}** is the page to which a user is directed when they change their email, using the token sent to the new email address. Upon signing in this page, the token value is obtained via params, and the `useChangeEmailVerificationQuery(id.join('/'))` function makes the API call. The user's new email address is updated through the API call.

The page **/users/registration/account-confirm-email/${TOKEN-ID}** is the page to which a user is directed when they become a new member, using the token sent to their email address. Upon signing in this page, the token value is obtained via params, and the `useConfirmEmailVerificationQuery(id.join('/'))` function makes the API call. The verification of the user's email address is completed through the API call.

**How to Use?**

1. Create a folder in the main path of your page structure: 

	`users > registration > acount-confirm-email > [[...id]] > page.tsx`

2. Then, define an enum in `src > routes > index.ts`:

	```typescript
	enum AUTH_ROUTES {
		EMAIL_SET_PRIMARY = '/users/email-set-primary/.+',
		CONFIRM_EMAIL = '/users/registration/account-confirm-email/.+'
	}
	```

3. To export the defined **AUTH_ROUTES**, assign the enum to the `ROUTES` variable at the bottom of the page:

	```typescript
	export  const  ROUTES = {
		...AUTH_ROUTES
	};
	```
