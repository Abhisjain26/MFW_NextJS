'use client';

import { useMemo, useState } from 'react';
import { useGetContractQuery } from '@akinon/next/data/client/checkout';
import { LoaderSpinner, Modal } from '@theme/components';

const useContract = (slug: string, label: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useGetContractQuery(slug, { skip: !isModalOpen });

  const ContractButton = useMemo(() => {
    const View = () => (
      <span
        className="underline cursor-pointer transition-all hover:text-secondary"
        onClick={(event: React.MouseEvent) => {
          event.preventDefault();
          setIsModalOpen(true);
        }}
      >
        {label}
      </span>
    );

    return View;
  }, [label]);

  const ContractModal = useMemo(() => {
    const View = () => (
      <Modal
        portalId={`orders-${slug}-contract-modal`}
        open={isModalOpen}
        setOpen={(state) => {
          setIsModalOpen(state);
        }}
        className="w-full max-w-lg"
      >
        <div className="p-10 max-h-[85vh] overflow-y-auto">
          {data ? (
            <div dangerouslySetInnerHTML={{ __html: data.result }}></div>
          ) : (
            <div className="flex justify-center">
              <LoaderSpinner />
            </div>
          )}
        </div>
      </Modal>
    );

    return View;
  }, [data, slug, isModalOpen]);

  return {
    ContractButton,
    ContractModal
  };
};

export default useContract;
