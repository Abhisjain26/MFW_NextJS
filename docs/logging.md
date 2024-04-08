# Log Documentation

## Import logger interface

```typescript
import logger from '@akinon/next/utils/log';
```

## Available Log Levels

- trace
- debug
- info
- warn
- error
- fatal

## Set Environment Variables for Debug Levels in Console

#### For development mode `yarn dev`
``LOG_LEVEL_DEV=trace``

#### For production mode `yarn start`
``LOG_LEVEL=error``

## Function Signature

```typescript
debug(message: string, payload: any): void;
```

## Example usage

```typescript
import logger from '@akinon/next/utils/log';

const payload = {
  id: 1,
  username: 'akinon'
};

logger.debug('Logged user', payload);
```
---

**Important note: Setting levels lower than the "info" level (for example, debug and trace) in the production environment may cause significant performance problems. Please do not use levels such as debug and trace for a long time.**

**Using a logger in client-side codes (for example, in client components) writes the log to the browser's console. Please make sure you are not logging sensitive content on the client-side.**
