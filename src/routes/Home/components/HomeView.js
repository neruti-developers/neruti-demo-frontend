import React from 'react'
import './HomeView.scss'
import Cover from '../assets/Mockup.jpg'

const jumbotronStyle = {
  color : '#fff',
  backgroundImage:"url(" + Cover + ")",
  backgroundSize:'cover',
  backgroundPosition:'center',
  fontFamily:'Montserrat, sans-serif',
  height:'800px'
}


export const HomeView = () => (
	
  	<div className='jumbotron' style={jumbotronStyle}>
  		<div className='container'  >
    	</div>
	</div>
)

export default HomeView
