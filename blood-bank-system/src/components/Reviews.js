import React from 'react';
import "./Reviews.css";

function Reviews() {
  return (
    <div className="reviews flex just-cent ali-cent">
      <div className="slip flex ali-cent">
         <h1>Reviews</h1>
         <div className="cards flex ali-cent">
            <div className="cardi">
               <img src={require("../images/sai.jpg")} alt="" />
               <h2>Sairaj Rajput</h2>
               <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam a quo maxime blanditiis impedit ratione inventore. Lorem ipsum dolor sit amet.</span>
            </div>
            <div className="cardi">
               <img src={require("../images/per2.jpg")} alt="" />
               <h2>Tushar Kalaskar</h2>
               <span>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem suscipit modi assumenda ipsum porro doloribus vel, tempore labore minima.</span>
            </div>
            <div className="cardi">
               <img src={require("../images/per3.jpg")} alt="" />
               <h2>Vilas Rabad</h2>
               <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo assumenda minus quae mollitia animi, sapiente et! Aliquid nisi voluptatibu.</span>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Reviews;
