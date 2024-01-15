import React, { useEffect, useState } from 'react';
import "./DonerDashbord.css";

function DonerDashbord() {

   const [down, setDown] = useState("");
   const [show, setShow] = useState("");
   const [blur, setBlur] = useState("");

   const upDownHandle = () => {
      if (down === "") {
         setDown("down");
         setShow("show");
         setBlur("blur");
      }
      else {
         setDown("");
         setShow("");
         setBlur("");
      }
   }
   const [isAppointForm, setIsAppointForm] = useState(false);
   const [showAppoints, setShowAppoints] = useState(false);

   const handleAppoint = () => {
      setIsAppointForm(true);
      setShowAppoints(false);
   }

   const showAppHandle = ()=>{
      setShowAppoints(true);
   }

   const goDashboardHandle = ()=>{
      setIsAppointForm(false);
      setShowAppoints(false);
   }

   

   const [hide, setHide] = useState(true);
   const cancelHandle = (e)=>{
      e.preventDefault();
      let x = window.confirm("Do yo Want to Cancel");
      // console.log(x);
      if(x){
         setHide(true);
      }
   }

   const [state, setState] = useState({
      name:"",
      mobile: "",
      Addrees: "",
      resister: ""
   })

   useEffect(()=>{
      const fetchData = async()=>{
         try{
            const response = await fetch("/getDonerInfo");
            const result = await response.json();
            console.log(result.data[0]);
            const DataArr = result.data;
            setState({
               name:DataArr[0],
               mobile:DataArr[1],
               resister:DataArr[2],
               Addrees:DataArr[3]
            })
         }
         catch(error){
            console.log("Error in fetching data:", error);
         }
      }
      fetchData();
   },[]);


   //********************************* Handling Appointment ****************************/
   const [pincodeHandle, setPincodeHandle] = useState({
      pincode: "",
      hospital: "",
      date: ""
   })

   const pincodeHandleChange = (e)=>{
      let name = e.target.name;
      let value = e.target.value;
      // if(name === "date")
      setPincodeHandle({...pincodeHandle, [name]:value});
   }

   // let Arraylist=[];
   const [Arraylist, setArrayList] = useState([]);
   useEffect(()=>{
      const gettingData = async()=>{
         const {pincode} = pincodeHandle;
         if(pincode === ""){
            setArrayList(["select"]);
         }
         else{
            const res = await fetch("/pinHandle", {
               method: "POST",
               headers: {
                 "Content-Type": "application/json"
               },
               body: JSON.stringify({
                  pincode
               })
            });
   
            let data = await res.json();
            // Arraylist = data.data;
            setArrayList(data.data);
            console.log(Arraylist);
         }
      }

      // if(pincodeHandle.pincode === ""){
      //    Arr
      // }

      gettingData();
   },[pincodeHandle])

   const submitHandle = async(e)=>{
      e.preventDefault();

      const {hospital, date} = pincodeHandle;
      // let id;
      
      // if(pincode.length === 6){
         // for(let i =0; i<6; i++){
         //    id = id+hospital[i];
         // }
         const res = await fetch("/postFetchData", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
               hospital, date
            })
         });

         const data = res.json();
         if(data.code === 200){
            window.alert("Submited Successfully");
         }else{
            window.alert("server Error");
         }
      // }
   }


   return (
      <div className="dashboard">
         <div className={ `info doner-info ${down}` }>
            <div className="cards flex">
               <i className={ `bx bxs-user-circle ${show}` }></i>
               <div className={ `flex ${show}` }>
                  <span>Name: { state.name }</span>
                  <span>Mobile No.: { state.mobile }</span>
                  <span>Reg. Date: { state.resister }</span>
                  <span>Address: { state.Addrees }</span>
               </div>
            </div>
            <div className="up-down-btn flex just-cent">
               <i class={ `bx bx-chevron-down` } onClick={ upDownHandle }></i>
            </div>
         </div>
         <div className={`doner-contain ${blur}`}>
            <div className="Cards flex">
               <div className="Card num" onClick={goDashboardHandle}>
                  <span>6 Times</span>
               </div>
               <div className="Card" onClick={goDashboardHandle}>
                  <span>History</span>
               </div>
               <div className="Card book" onClick={ handleAppoint }>
                  <span >Book Apointment</span>
               </div>
               <div className="Card dt" onClick={showAppHandle}>
                  <span>
                     Appointment:  
                     {!hide
                     ?
                     <span className="date">
                        28/11/2023
                     </span>
                     :
                     <span className="no-date">
                         --/--/----
                     </span>
                     }
                  </span>
               </div>
            </div>
            {
               !showAppoints
               ?
               <>
               { !isAppointForm
                  ?
                  <div className="main flex just-cent ali-cent">
                     <span>Stay Healthy, Stay Happy</span>
                  </div>
                  :
                  <div className="forms f2">
                     {/* <form method="POST">
                        <div className="flex">
                           <div className="input">
                              <label htmlFor="pincode">Pin Code</label>
                              <input type="number" name="pincode" value={pincodeHandle.pincode} onChange={pincodeHandleChange} required />
                           </div>
                           <div className="input in2">
                              <label htmlFor="hospital">Hospital Name</label>
                              <select name="hospital" id="select" value={pincodeHandle.hospital} onChange={pincodeHandleChange} required>
                                 <option value="0">-- Select --</option>
                                 {Arraylist.map((item, index)=>(
                                       <option>{item}{index}</option>
                                 )
                                 )}
                              </select>
                           </div>
                           <div className="input dt">
                              <label htmlFor="date">Appointment Date</label>
                              <input type="date" name="date" value={pincodeHandle.date} onChange={pincodeHandleChange} required />
                           </div>
                        </div>
                        <div className="btn flex just-cent ali-cent">
                           <button type="submit" onClick={submitHandle}>Submit</button>
                        </div>
                     </form> */}
                     <div className="main flex just-cent ali-cent">
                        <span>Comming Soon....</span>
                     </div>
                  </div>
               }
               </>
               :
            <div className="appointment">
               {
               !hide
               ?<>
               <div className="header flex">
                  <span>ID</span>
                  <span>Booked Date</span>
                  <span>Reg. Date</span>
                  <span>Download Form</span>
                  <span>Action</span>
               </div>
               <div className="record flex">
                  <span>769879876</span>
                  <span>07/12/2023</span>
                  <span>30/11/2023</span>
                  <span className="pdf"><i className='bx bxs-file-pdf'></i></span>
                  <span className="cancle"><button onClick={cancelHandle}>Cancel</button></span>
               </div>
               </>
               :
                  <div className="not-found flex">
                     <span>
                        Not Book Appointment
                     </span>
                  </div>
               }
            </div>
            }
         </div>
      </div>
   )
}

export default DonerDashbord
