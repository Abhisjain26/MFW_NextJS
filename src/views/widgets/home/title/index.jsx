import React from 'react'
import Styled from 'styled-components'

const Title = (props) => {
    return (
        <Wrapper>
            <div className='title_all'>
                <h2>{props.title}</h2>
            </div>
        </Wrapper>
    )
}

const Wrapper = Styled.section`
    /* .title_all{
        display:flex;
        justify-content:center;
        font-size:30px;
        font-family: Georgia, 'Times New Roman', Times, serif;
        
        color: #000000;
    } */
    @media screen and (max-width:768px){
        .title_all{
            text-align:center !important;
        }
    }
`

export default Title