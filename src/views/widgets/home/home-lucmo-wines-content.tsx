'use client';

import React, { useEffect, useState } from 'react';
import { Link } from '@theme/components';
import Styled from 'styled-components';
import { Image } from '@akinon/next/components/image';

export default function HomeValentineContent({ data }) {
    const [showFullText, setShowFullText] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 767);
        };

        // Call the handleResize function initially and add event listener
        handleResize();
        window.addEventListener('resize', handleResize);

        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };


    return (
        <Wrapper>
            <div className='container home_advertisment_container p-10'>

                {data?.attributes?.home_advertisment?.map((item, i) => (
                    <div className=' flex items-center gap-10 home_advertisment_container'
                        key={i}
                    >
                        <div className='home_advertisment_content'>
                            <div dangerouslySetInnerHTML={{ __html: showFullText || !isMobileView ? item.value.text : `${item.value.text.substring(0, 135)}...` }} />
                            <div className='flex items-center gap-3'>
                                {isMobileView &&
                                    <>
                                        {item.value.text.length > 150 &&
                                            <button className='btn read_more_btn pinkbtn' onClick={toggleText}>
                                                {showFullText ? 'Read Less' : 'Read More'}
                                            </button>
                                        }
                                    </>
                                }
                                <button className='btn pinkbtn rounded-md'>{item.value.link}SHOP NOW</button>
                            </div>
                            <div className='home_advertisment_image'>
                                <Image
                                    src={item.kwargs.value.image.url}
                                    width={500}
                                    height={500}
                                    alt={""}
                                />
                            </div>
                        </div>


                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

const Wrapper = Styled.section`
    .home_advertisment_container{
        border-radius:30px;
        position:relative;
        margin-top:20px;
        margin-bottom:10px;
        background-color:#F3F3F3 !important;
    }
    .home_advertisment_image{
        width:50% ;
        padding-right:30px;
        position:absolute;
        bottom:-120px;
        right:0;
    }
    .home_advertisment_image img{
        width:100%;
        height:100%;
        border-radius:30px;
    }
    .home_advertisment_content{
        width:45%;
    }
    .home_advertisment_content h1{
        font-size:50px;
        line-height:50px;
        color:#000000;
    }
    .home_advertisment_content p{
        margin-top:10px;
    }
    .read_more_btn{
        display:none;
    }
    
    @media screen and (max-width:767px){
        .home_advertisment_content .read_more_btn{
            display:block;
        }
        .home_advertisment_content h1{
            font-size:36px ;
        }
        .home_advertisment_image{
            text-align:center;
            margin-top:40px;
        }
    }
`