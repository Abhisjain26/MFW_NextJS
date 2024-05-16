'use client';

import React, { useEffect, useState } from 'react';
import Style from './home-news.module.css';
import { Link } from '@theme/components';
import { Image } from '@akinon/next/components/image';

export default function HomeNewsContent({ data }) {
    const [showFullText, setShowFullText] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };
    return (
        <div>
            <div className={`container container_mx ${Style.news}`}>
                <div className={`${Style.news_container}`}>
                    <div className='home_dress'>
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
                            {/* <div className={`${Style.home_news_para}`} dangerouslySetInnerHTML={{ __html: item.value.subtext }}></div> */}
                            <div className={`${Style.home_news_para}`} dangerouslySetInnerHTML={{ __html: showFullText || !isMobileView ? item.value.subtext : `${item.value.subtext.substring(0, 135)}...` }} />

                            {isMobileView &&
                                <div>
                                    {item.value.text.length > 300 &&
                                        <button className={`btn pinkbtn ${Style.read_more_btn}`} onClick={toggleText}>
                                            {showFullText ? 'LESS ARTICLES' : 'MORE ARTICLES'}
                                        </button>
                                    }
                                </div>
                            }

                            <div className={` news_hidden ${Style.news_hidden}`}>
                                <hr className={`${Style.home_top}`} />
                                <hr className={`${Style.home_bottom}`} />
                                <div className={`${Style.news_btn}`}>
                                    <button className='pinkbtn '><a href={item.value.link}>MORE ARTICLES</a></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 