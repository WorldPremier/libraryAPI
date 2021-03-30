import React, { Component } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy'
class Book extends Component {
    constructor(props){
        super(props)
      
    }
    render() {
        return (
            <div className=" my-4 -4 col">
              <Flippy 
    flipOnHover={false} 
    flipOnClick={true} 
    flipDirection="horizontal" 
    ref={(r) => this.flippy = r}

    style={{ width: '300px', height: '310px' }} 
  >
    <FrontSide className="  shadow box"
      style={{
        backgroundColor: '#41669d',
      }}
    > 
      < h3 className="behind" style={{backgroundImage:"url('pic/cover.jpg')",width:"87%",height:"90%"}}>{this.props.title}</h3>
      <img src={this.props.src} style={{width:"100%",height:"100%",marginBottom:"20px",zIndex:"1"}} alt={this.props.title}/>
      

    </FrontSide>
    <BackSide
      style={{ backgroundColor: '#41669d'}}>
     < div style={{ backgroundColor: 'white'}}><h4 className="text-center">{this.props.title}</h4>
     <p>{this.props.author}</p>
     <p style={{fontSize:"10px"}}>{this.props.firstLine}</p>
     <p>Publish Year: {this.props.publish}</p></div>
    </BackSide>
  </Flippy>   
            </div>
        );
    }
}

export default Book;