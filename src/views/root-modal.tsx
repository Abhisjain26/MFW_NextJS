'use client';

import { Modal } from '@theme/components';
import { useAppSelector } from '@akinon/next/redux/hooks';

export default function RootModal() {
  const { open, title, content } = useAppSelector(
    (state) => state.root.rootModal
  );

  return (
    <Modal
      portalId="root-modal"
      title={title}
      open={open}
      className="w-full sm:w-[28rem] max-h-[90vh] overflow-y-auto"
    >
      <div className="p-6">{content}</div>
    </Modal>
  );
}
