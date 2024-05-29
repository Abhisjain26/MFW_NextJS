'use client';

import React, { useState } from 'react';
import Style from './index.module.css'
import { Link } from '@akinon/next/components';

export default function JoinMallForWoemanContent({ data }) {



    return (
        <div className='my-10 container container_md'>
            <h1
                className={`mt-4 w-full text-center mb-5 text-2xl text-left md-mt-0 ${Style.heading_main}`}
                data-testid="product-name"
            >
                <i>Join Mall For Women</i>
            </h1>
            <h2>{data.attributes.first_column_title.value}</h2>
            <h2 className='my-2' dangerouslySetInnerHTML={{ __html: data.attributes.second_column_title.value }}></h2>
            <table className={`mt-5 mb-2 text-center ${Style.table} `}>
                <tr className={`my-2 text-center ${Style.tr} `}>
                    {data.attributes.first_column_table.map((item, i) => (
                        <th className={`${Style.th} `} key={i}><Link href={item?.value?.redirect_url}>{item?.value?.name}</Link></th>
                    ))}
                </tr>
                <tr className={`my-2 text-center ${Style.tr} `}>
                    {data.attributes.second_column_table.map((item, i) => (
                        <td className={`${Style.td} `} key={i}>{item?.value?.name}</td>
                    ))}
                </tr>
                <tr className={`my-2 text-center ${Style.tr} `}>
                    {data.attributes.third_column_table.map((item, i) => (
                        <td className={`${Style.td} `} key={i}>{item?.value?.name}</td>
                    ))}
                </tr>
                <tr className={`my-2 text-center ${Style.tr} `}>
                    {data.attributes.fourth_column_table.map((item, i) => (
                        <td className={`${Style.td} `} key={i}>{item?.value?.name}</td>
                    ))}
                </tr>
                {/* <tr className={`my-2 text-center ${Style.tr} `}>
                    {data.attributes.fifth_column_table.map((item, i) => (
                        <td className={`${Style.td_4_column}`} key={i}>
                            {item?.value?.name === "$nbsp;" ? <h1></h1> :
                                <Link href={item?.value?.redirect_url}>
                                    {item?.value?.name}
                                </Link>
                            }
                        </td>
                    ))}
                </tr> */}
            </table>
            <table className={`text-center border-0 ${Style.table_2} `}>
                <tr>
                    {data.attributes.six_column_table.map((item, i) => (
                        <td className={`${Style.td_4_column}`} key={i}>
                            {item?.value?.name === "$nbsp;" ? <h1></h1> :
                                <Link href={item?.value?.redirect_url}>
                                    {item?.value?.name}
                                </Link>
                            }
                        </td>
                    ))}
                </tr>
            </table>
            <table className={`text-center border-0 ${Style.table_2} `}>
                <tr>
                    {data.attributes.fifth_column_table.map((item, i) => (
                        <td className={`${Style.td_4_column}`} key={i}>
                            {item?.value?.name === "$nbsp;" ? <h1></h1> :
                                <Link href={item?.value?.redirect_url}>
                                    {item?.value?.name}
                                </Link>
                            }
                        </td>
                    ))}
                </tr>
            </table>
            <h2 className='my-2'><b>{data.attributes.third_column_title.value}</b></h2>

            <div className='my-2'>
                {data.attributes.third_column_items.map((item, i) => (
                    <h3 className='py-2' key={i}>{item?.value?.name}</h3>
                ))}
            </div>

        </div >
    );
}
