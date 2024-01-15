import React, { useState } from 'react';
import "./AddRecord.css";

function AddRecord(props) {

   const [check, setCheck] = useState(true);

   const clickHandle = ()=>{
      if(!check){
         setCheck(!check);
      }
   }
   const clickHandle2 = ()=>{
      if(check){
         setCheck(!check);
      }
   }

   return (
      <div className="add-record">
         <div className="header flex just-cent ali-cent" >
            <div className="select-cards flex">
               <div className="option-card" onClick={clickHandle}>
                  <h2>New Doner</h2>
               </div>
               <div className="option-card" onClick={clickHandle2}>
                  <h2>Having Doner ID</h2>
               </div>
            </div>
            <div className="back-btn">
               <div className="b flex just-cent ali-cent" onClick={()=>{props.state.setShowAddRecord(true)}}>
                  <i class='bx bx-arrow-back' ></i>
               </div>
            </div>
         </div>
         <div className="line"></div>
         <div className="forms">
            { check ?
               <div className="new">
                  <form action="#" className="flex just-cent ali-cent">
                     <i class='bx bxs-user-circle'></i>
                     <div className="p-info flex">
                        <div className="input">
                           <label htmlFor="mobile">Mobile No.:</label>
                           <input type="number" name="mobile" required />
                        </div>
                        <div className="input">
                           <label htmlFor="fname">First Name</label>
                           <input type="text" name="fname" required />
                        </div>
                        <div className="input">
                           <label htmlFor="mname">Middle Name</label>
                           <input type="text" name="mname" required />
                        </div>
                        <div className="input">
                           <label htmlFor="lname">Last Name</label>
                           <input type="text" name="lname" required />
                        </div>
                     </div>
                     <div className="cont p-info flex">
                        <div className="input">
                           <label htmlFor="gender">Gender:</label>
                           <select name="gender" id="">
                              <option value="">--Select Gender--</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                           </select>
                        </div>
                        <div className="input">
                           <label htmlFor="blood">Blood Group:</label>
                           <select name="blood" id="">
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                           </select>
                        </div>
                        <div className="input">
                           <label htmlFor="dob">DOB:</label>
                           <input type="date" name="dob" required />
                        </div>
                        <div className="input">
                           <label htmlFor="donate">Current Donated Blood:</label>
                           <input type="number" name="donate" placeholder="In Litter" required />
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input">
                           <label htmlFor="address">Address:</label>
                           <input type="text" className="adres" name="address" required />
                        </div>
                        <div className="input">
                           <label htmlFor="pin">Pin Code:</label>
                           <input type="number" name="pin" required />
                        </div>
                     </div>
                     <div className="btn flex just-cent ali-cent">
                        <button type="submit">Submit</button>
                     </div>
                  </form>
               </div>
               :
               <div className="old">
                  <form action="#">
                     <div className="fetch flex just-cent ali-cent">
                        <div className="input">
                           <label htmlFor="username">Mobile No.</label>
                           <input type="number" required />
                        </div>
                        <button>Fetch</button>
                     </div>
                     <div className="btn flex just-cent ali-cent">
                        <button type="submit">Submit</button>
                     </div>
                  </form>
               </div>
            }
         </div>
      </div>
   )
}

export default AddRecord
