'use client';

import React from 'react';
import Style from './home-news.module.css';
import { Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';

export default function HomeNewsContent({ data }) {

    return (
        <div>
            <div className={`max-container ${Style.news}`}>
                <div className={`${Style.news_container}`}>
                    <div className={`${Style.home_dress}`}>
                        <Image src='images/home/dress.png'
                            width={20}
                            height={20}
                            alt='Dress' />
                    </div>
                    <div className={`${Style.news_content}`}>
                        <div className={`${Style.news_welcome}`}>
                            Welcome to Mall For Women
                        </div>
                        <div className={`${Style.news_title}`}>
                            NEWS
                        </div>
                    </div>

                    <div className={`${Style.news_blog}`}>
                        <div>
                            <Image src={'images/logoMall.svg'} className={`${Style.news_blog_image}`} width={100} height={100} alt={""} />
                        </div>
                        <div className={`${Style.news_blog_content}`}>
                            <h2>DISCOVER OUR LATEST BLOG!</h2>
                        </div>
                    </div>
                    {data?.attributes?.home_news?.map((item, i) => (
                        <div
                            className={`${Style.home_discount}`}
                            key={i}
                        >
                            <div className={`${Style.home_news_text}`}>
                                <Image
                                    src={item.kwargs.value.image.url}
                                    width={300}
                                    height={300}
                                    alt={""}
                                    className={`${Style.home_advertisment_image}`}
                                />
                                <div className={`${Style.home_news_title}`} dangerouslySetInnerHTML={{ __html: item.value.text }} />
                            </div>
                            <div className={`${Style.home_news_para}`} dangerouslySetInnerHTML={{ __html: item.value.subtext }}></div>

                            <hr className={`${Style.home_top}`} />
                            <hr className={`${Style.home_bottom}`} />
                            <div className={`${Style.news_btn}`}>
                                <button className='pinkbtn '><a href={item.value.link}>MORE ARTICLES</a></button></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 