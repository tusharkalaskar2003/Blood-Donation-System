import React from 'react';
import "./About.css";

function About() {
   return (
      <div className="about flex ali-cent" id="about">
         <h1>About</h1>
         <div className="about-contain flex ali-cent">
            <img src={ require("../images/aboutImage.jpg") } alt="" />
            <div className="about-info flex just-cent ali-cent">
               <div className="circle"></div>
               <h2>Donate.<span>me</span></h2>
               <span className="dumy-para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, vel quibusdam maiores molestiae aut at ex eveniet minus, ut numquam corrupti veritatis assumenda praesentium. Natus ipsa veniam iusto nihil debitis saepe repudiandae libero sequi, distinctio laborum blanditiis fugiat, impedit amet excepturi laudantium ipsam necessitatibus autem eum ipsum corporis doloremque quidem?</span>
               <div className="circle c2"></div>
            </div>

         </div>
      </div>
   )
}

export default About
