import { Image } from '@akinon/next/components/image';

const CheckoutFooter = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return (
    <div className="container mx-auto flex items-center justify-start flex-col py-6 lg:flex-row lg:gap-4">
      <div className="flex gap-2">
        <Image
          src={'/visa.png'}
          alt="Visa"
          width={53}
          height={16}
        />
        <Image
          src={'/mastercard.png'}
          alt="Mastercard"
          width={27}
          height={16}
        />
        <Image
          src={'/vbv.png'}
          alt="Verified by Visa"
          width={37}
          height={16}
        />
        <Image
          src={'/mastersecure.png'}
          alt="Mastercard Secure Code"
          width={46}
          height={16}
        />
        <Image
          src={'/ssl-secure.png'}
          alt="SSL Secure"
          width={16}
          height={16}
        />
      </div>
      <div className="text-xs text-black-800 mt-2 xs:mt-3 lg:ms-3 lg:mt-0">
        Copyright ® {year} Akinon. All Rights Reserved.
      </div>
    </div>
  );
};

export default CheckoutFooter;
