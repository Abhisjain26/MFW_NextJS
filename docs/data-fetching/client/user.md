---
title: User
sidebar_label: User
slug: user
custom_edit_url: null
---

## useGetCaptchaQuery

To  use this function, the **useCaptcha** function from **@akinon/next/hooks** needs to be imported.

```javascript
import { useCaptcha } from '@akinon/next/hooks';
```

The **useCaptcha** function provides the following variables: 
* **view**
* **validated**
*  **isVisible**
* **validate**

These variables and the view for Captcha is obtained by using the **useCaptcha()** function, and then the variables are defined as shown below:

```javascript
const {
	CaptchaView,
	validated: captchaValidated,
	isVisible: isCaptchaVisible,
	validate: validateCaptcha
} = useCaptcha();
```

The view obtained from the Captcha can be placed where you want as `<CaptchaView data-testid="login-captcha" />`.

The **isCaptchaVisible** variable is used to show or hide the captcha. When using this variable, it should be checked whether the captcha is validated with **!captchaValidated** before use.

```javascript
{isCaptchaVisible && !captchaValidated}
```

Data returned from function:

```json
{
	CaptchaView: async ()=> {
		length: 1,
		name: "View",
	},
  validated: false,
  isVisible: false,
  validate: async ()=> {
    length: 0
		name: "validate"
  }
}
```