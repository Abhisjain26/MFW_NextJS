import React from 'react';
import Style from './index.module.css';
import { Image } from '@akinon/next/components';
import { Icon, Link } from '@theme/components';
import Select, { components } from "react-select";

// Assume IconOption is defined somewhere
const IconOption = (props) => {
    const { children, data, innerRef, innerProps } = props;
    return (
        <components.Option {...props}>
            {data.icon && <Icon name='chevron-end' />}
            {children}
        </components.Option>
    );
};
const GiftCard = () => {
    const options = [
        { value: "$10", label: "$10" },
        { value: "$20", label: "$20" }
    ];

    return (
        <div className={`container`}>
            <div className={`${Style.gift_card_title} mb-3`}>
                <i>Gift Card</i>
            </div>
            <div className={`${Style.gift_card}`}>
                <div className={`${Style.gift_card_image} relative`}>
                    <Image src='images/local/gift-card.svg' width={100} height={100} alt='Mall For Women' />
                    <div className={`${Style.gift_card_logo}`}>
                        <Image src='images/local/mall-for-women-transparent.svg' width={30} height={30} alt='Mall For Women' />
                    </div>
                </div>
                <div className={`${Style.gift_card_content}`}>
                    <h2 className={`${Style.gift_card_content_title}`}>Mall For Women Gift Card</h2>
                    <p className={`${Style.gift_card_content_text}`}>Spoil that special someone with a Mall For Women Gift Card. Redeemable in our Beauty, Fashion, Intimate, Bath & Body, Health & Wellness, Kids, Gadgets, Books, Food & Beverage departments.</p>
                    <h3 className={`${Style.gift_card_content_price}`}>1502.12 INR</h3>
                    <p className={`${Style.gift_card_content_cal}`}><Link href='/checkout' className='underline'>Shipping </Link> calculated at checkout.</p>
                    <div className={`${Style.denominations}`}>
                        <h5>Denominations</h5>
                        <div className='mb-2 w-6/12'>
                            <Select
                                defaultValue={options[0]}
                                options={options}
                                components={{ Option: IconOption }}
                                className='font-normal	'
                            />
                        </div>
                    </div>
                    <button className={`${Style.gift_card_content_cart}`}><span><Icon name='cart' />Add To Cart</span></button>
                    <button className={`${Style.gift_card_content_paypal}`}><span>Buy with <Image src='images/local/paypal-button.svg' className={`${Style.paypal_giftcard}`} width={30} height={30} alt='PayPal' /></span></button>

                    <h6 className={`${Style.payment_option}`}><Link href='/payment-options'>More Payment Options</Link></h6>

                    <div className={`flex items-center justify-between px-2 ${Style.payment_content}`}>
                        <div className='flex w-4/12 items-center gap-1'>
                            <Image src='images/local/secure.svg' className={`${Style.secure_image}`} height={10} width={10} alt='Secure' />
                            <h3 className='text-sm'>Secure Checkout With</h3>
                        </div>
                        <div className='flex w-7/12 items-center justify-around'>
                            <Image src='images/local/mastercard.svg' height={10} className={`${Style.payment_image}`} width={10} alt='Master card' />
                            <Image src='images/local/visa.svg' height={10} className={`${Style.payment_image}`} width={10} alt='VISA' />
                            <Image src='images/local/american-express.svg' height={10} className={`${Style.payment_image}`} width={10} alt='American Express' />
                            <Image src='images/local/paypal.svg' height={10} className={`${Style.payment_image}`} width={10} alt='PayPal' />
                        </div>
                    </div>

                    <div>
                        <div className={`${Style.payment_icon} mt-3`}><span>Share</span>
                            <span className='flex items-center gap-1'>
                                <Icon name='paypal' />
                                <Icon name='facebook' />
                                <Icon name='telegram' />
                                <Icon name='instagram' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftCard;
