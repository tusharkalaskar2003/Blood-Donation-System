import React, { useEffect, useState } from 'react'
import "./Home.css";
import { CiSearch } from "react-icons/ci";
import { BiSolidHelpCircle } from "react-icons/bi";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Reviews from './Reviews.js';
import About from './About.js';

function Home(props) {

   const [vis1, setVis1] = useState("");
   const [vis2, setVis2] = useState("visible");
   const [vis3, setVis3] = useState("");
   const [check, setCheck] = useState(false);
   const [show, setShow] = useState("hide");
   const [vis4, setVis4] = useState("switch");
   const [textChange, setTextChange] = useState("Already have account?");
   const [addblur, setAddBlur] = useState("");
   // const [storeType, setStoreType] = useState=("");

   const navigate = useNavigate();

   const selectChange = (e) => {
      const type = e.target.value;
      console.log(type)
      // setStoreType(type);
      document.getElementById("lab-form").reset();
      document.getElementById("admin-form").reset();
      if (type === "doner") {
         setVis2("");
         setVis1("visible");
      }
      else {
         setVis1("");
         setVis2("visible");
      }
   }

   let x= props.prop.showLogin;
   useEffect(()=>{
      if(x){
         setShow("show");
         setAddBlur("blure");
      }
      else{
         setShow("hide");
         setAddBlur("");
      }
   }, [x]);

   const loginSwitch = (e)=>{
      setCheck(!check);
      document.getElementById("lab-form").reset();
      document.getElementById("admin-form").reset();
      document.getElementById("login-form").reset();
      if(!check){
         setVis3("switch");
         setVis4("");
         setTextChange("Not Resister!");
      }
      else{
         setVis3("");
         setVis4("switch");
         setTextChange("Already have account?");
      }
   }


   //*********************** Login Handling *******************************
   const [loginData, setLoginData] = useState({
      username: "",
      password: ""
   });

   const loginChangeHandle = (e)=>{
      e.preventDefault();
      let name = e.target.name;
      let value = e.target.value;
      setLoginData({...loginData, [name]:value});
   }

   // //======= Posting Login form data to Server ===========
   const postLoginData = async(e)=>{
      e.preventDefault();
   //    const {username, password} = loginData;

   //    const res = await fetch("/loginHandling", {
   //       method: "POST",
   //       headers: {
   //         "Content-Type": "application/json"
   //       },
   //       body: JSON.stringify({
   //          username, password, Type:storeType
   //       })
   //    });

   //    const data = await res.json();
   //    if(data.code === 200 && storeType === "doner"){
   //       navigate("/doner");
   //    }
   //    else if(data.code === 200){
   //       navigate("/lab");
   //    }
   //    else if(data.code === 400){
   //       window.alert("Wrong Credentials");
   //    }
   //    else{
   //       window.alert("Server ERROR!");
   //    }
   }


   //**************** Lab Resistration Handling ***************************
   const [labResiter, setLabResister] = useState({
      username: "",
      name: "",
      id: "",
      mobile: "",
      address: "",
      pincode: ""
   });

   const labResistrationChangesHandle = (e)=>{
      e.preventDefault();
      let name = e.target.name;
      let value = e.target.value;
      setLabResister({...labResiter, [name]:value});
   }

   //========== Posting Hospital Resister Form Data to Server ==========
   const postLabResisterData = async(e)=>{
      e.preventDefault();
      // const {username, name, id, mobile, address, pincode} = labResiter;

      // const res = await fetch("/labResister", {
      //    method: "POST",
      //    headers: {
      //      "Content-Type": "application/json"
      //    },
      //    body: JSON.stringify({
      //       username, name, id, mobile, address, pincode
      //    })
      // });

      // const data = await res.json();
      // if(data.code === 200){
      //    window.alert("Resistration Successfully, Password sent on mobile number...");
      // }
      // else if(data.code === 403){
      //    window.alert("ID Aready EXISTS.!!");
      // }
      // else if(data.code === 500){
      //    window.alert("Internal Server Error!!");
      // }
      // else{
      //    window.alert("Server ERROR!");
      // }
   }


   //***************** Doner Resistration Handling *************************
   const [donerResister, setDonerResister] = useState({
      fname: "",
      mname: "",
      lname: "",
      mobile: "",
      gender: "",
      blood: "",
      age: "",
      address: "",
      pincode: ""
   });

   const donerResistrationChangesHandle = (e)=>{
      e.preventDefault();
      let name = e.target.name;
      let value = e.target.value;
      setDonerResister({...donerResister, [name]:value});
   }

   //=========== Posting Doner Resister Form data to Server ==============
   const postDonerResisterData = async(e)=>{
      e.preventDefault();
      const {fname, mname, lname, mobile, gender, blood, age, address, pincode} = donerResister;
      
      const res = await fetch("/donerResister", {
         method: "POST",
         headers: {
           "Content-Type": "application/json"
         },
         body: JSON.stringify({
           fname:fname,
           mname:mname,
           lname:lname,
           mobile:mobile,
           gender:gender,
           blood:blood,
           age:age,
           address:address,
           pincode:pincode
         })
      });
      const data = await res.json();
      if(data.code === 200){
         window.alert("Resistration Successfully, Password sent on mobile number...");
      }
      else if(data.code === 403){
         window.alert("Moile No. Aready Reasister.!!");
      }
      else if(data.code === 500){
         window.alert("Internal Server Error!!");
      }
      else{
         window.alert("Server ERROR!");
      }
   }

   //console.lo("Vil")
   return (
      <>
      <div className="home rel" id="about">
         <div className={`content ${addblur} rel flex`}>
            <div className="flex rel">
               <span>DONATE BLOOD</span>
               <p>Save Life</p>
               <form action="/">
                  <div className="formDiv flex">
                     <input type="text" placeholder="Search Blood (e.g. O positive)" />
                     <CiSearch className="search-icon" />
                  </div>
               </form>
            </div>
         </div>
         <div className={`form flex just-cent ${show}`}>
            <div className="login flex">
               <div className="options">
                  <label htmlFor="select">Select Type: </label>
                  <select name="select" id="select" onChange={selectChange}>
                     <option value="lab">Lab/Hospital</option>
                     <option value="doner">Doner</option>
                  </select>
               </div>
               <div className={`forms ${vis3}`}>
                  {/* For Lab/Hospitals Resister Page */ }
                  <form method="POST" className={ `lab ${vis1}`} id="lab-form">
                     <div className="names flex">
                        <div className="input lab-name">
                           <input type="text" name="name" autoComplete="off" value={labResiter.name} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="name">Lab/Hospital Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="id" autoComplete="off" value={labResiter.id} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="id">Licensed ID:</label>
                        </div>
                     </div>
                     <div className="det flex">
                        {/* <div className="input mb">
                           <input type="text" name="username" autoComplete="off" value={labResiter.username} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="username">Username</label>
                        </div> */}
                        <div className="input mb">
                           <input type="number" name="mobile" autoComplete="off" value={labResiter.mobile} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="mobile">Mobile No.</label>
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <input type="text"  name="address" autoComplete="off" value={labResiter.address} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="address">Address </label>
                        </div>
                        <div className="input">
                           <input type="Number" name="pincode" autoComplete="off" value={labResiter.pincode} onChange={labResistrationChangesHandle} required/>
                           <label htmlFor="pincode"> Pin Code : </label>
                        </div>
                     </div>
                     <div className="btn flex ali-cent just-cent">
                        <button type="submit" onClick={postLabResisterData}>Submit</button>
                     </div>
                  </form>
                  {/* Doner Resister Form */}
                  <form method="POST" className={`admin ${vis2}`} id="admin-form">
                     <div className="names flex">
                        <div className="input">
                           <input type="text" name="fname" autoComplete="off" value={donerResister.fname} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="fname">First Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="mname" autoComplete="off" value={donerResister.mname} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="mname">Middle Name:</label>
                        </div>
                        <div className="input">
                           <input type="text" name="lname" autoComplete="off" value={donerResister.lname} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="lname">Last Name:</label>
                        </div>
                     </div>
                     <div className="det flex">
                        <div className="input mb">
                           <input type="number" name="mobile" autoComplete="off" value={donerResister.mobile} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="mobile">Mobile No.</label>
                        </div>
                        <div className="input blood">
                           {/* <input type="number" name="gender" id="gender" autoComplete="off" value={donerResister.age} onChange={donerResistrationChangesHandle} required/> */}
                           <select name="blood" id="blood" value={donerResister.blood} onChange={donerResistrationChangesHandle}>
                              <option value="null">Select</option>
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
                        <div className="input gen">
                           {/* <input type="number" name="gender" id="gender" autoComplete="off" value={donerResister.age} onChange={donerResistrationChangesHandle} required/> */}
                           <select name="gender" id="gender" value={donerResister.gender} onChange={donerResistrationChangesHandle}>
                              <option value="null">Select</option>
                              <option value="Male">Male</option>
                              <option value="Femal">Female</option>
                           </select>
                        </div>
                        <div className="input age">
                           <input type="number" name="age" id="age" autoComplete="off" value={donerResister.age} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="age">Age : </label>
                        </div>
                     </div>
                     <div className="addr flex">
                        <div className="input add">
                           <input type="text" name="address" autoComplete="off" value={donerResister.address} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="address">Address </label>
                        </div>
                        <div className="input">
                           <input type="Number" name="pincode" autoComplete="off" value={donerResister.pincode} onChange={donerResistrationChangesHandle} required/>
                           <label htmlFor="pincode"> Pin Code : </label>
                        </div>
                     </div>
                     <div className="btn flex ali-cent just-cent">
                        <button type="submit" onClick={postDonerResisterData}>Submit</button>
                     </div>
                  </form>
               </div>
               {/* Login Form */}
               <div className={`login-form flex ${vis4}`}>
                  <form action="#" className="flex" id="login-form">
                     <div className="input">
                        <input type="text" name="username" value={loginData.username} autoComplete="off" onChange={loginChangeHandle} required/>
                        <label htmlFor="username">Username</label>
                     </div>
                     <div className="input">
                        <input type="text" name="password" value={loginData.password} autoComplete="off" onChange={loginChangeHandle} required/>
                        <label htmlFor="password">Password</label>
                     </div>
                     <button type="submit" onClick={postLoginData}>Login</button>
                  </form>
               </div>
               <span onClick={loginSwitch}>{textChange}</span>
            </div>
         </div>
         <BiSolidHelpCircle className="helpy" />
      </div>
      {
      !x? <>
         <About/>
         <Reviews/>
         <Footer />
         </>
      :<></>
      }
      </>
   )
}

export default Home;

