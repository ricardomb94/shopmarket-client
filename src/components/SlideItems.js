import React from 'react'
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import ReactTypingEffect from 'react-typing-effect';



function SlideItems(props){

        const {slideItemsId, slideItemsImg, slideItemsTitle, slideItemsContent}= props

        return (
        <>
            <Pulse duration={15000} forever={true}>
                <figure id={slideItemsId} className="SlideItemPic" key={slideItemsId}>
                    <img src={`media/${slideItemsImg}`} alt={slideItemsTitle} className="slidepic" />
                {/* <img src={process.env.PUBLIC_URL + '/media/carousel.jpg'} />
                    <img src={process.env.PUBLIC_URL + '/media/carousel1.jpg'} />
            <img src={process.env.PUBLIC_URL + '/media/carousel6.jpg'} />*/}
                    <div className="d-flex justify-content-center align-self-center">
                        <figcaption>
                            <Zoom left cascade>
                                {slideItemsContent}
                                <hr style={{background:'goldenrod'}}/> 
                            </Zoom>
                            
                            <ReactTypingEffect
                            text="  jusqu'à -30%, -50%, -70%, -75% " className="centered" eraseDelay={3000} typingDelay={2000} speed={300}/>
                        </figcaption>
                    </div>
                    
              
                </figure>
            </Pulse>
        </>
        )
   
}

export default (SlideItems)
