import { forwardRef } from 'react';
import { FileInputProps } from '@theme/components/types';

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function fileInput(props, ref) {
    return <input type="file" {...props} ref={ref} />;
  }
);
