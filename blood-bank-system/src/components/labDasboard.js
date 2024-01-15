import React, { useEffect, useState } from 'react'
import "./LabDasboard.css";
import LabInfo from './LabInfo';
import LabRequestList from './LabRequestList';
// import { GiWaterDrop } from "react-icons/gi";

function LabDasboard() {

  const [isDown, setIsDown] = useState(false);
  const [down, setDown] = useState("down");
  const [hide, setHide] = useState("");
  const [slide, setSlide] = useState("");
  const [addBlur, setAddBlur] = useState("");
  const [set, setSet] = useState("translate");
  const [blur, setBlur] = useState("");


  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    setIsDown(!isDown);
    // document.getElementById("add-btn").disabled = true;
    if (isDown) {
      setDown("up");
      setHide("vis");
      setSlide("slide");
      setAddBlur("blur");
    }
    else {
      setDown("down");
      setHide("");
      setSlide("");
      setAddBlur("");
    }
  };

  const [hospital_det, setHospital_det] = useState({
    id: "",
    name: "",
    address: "",
    contact: "",
  });

  const [admin_det, setAdmin_det] = useState({
    id: "",
    name: "",
    contact: "",
  });
  
  useEffect(()=>{
    const getHospitalAdminInfo=async()=>{
      const response = await fetch("/getHospitalAdminInfo");
      const result = await response.json();
      const adminData = result.adminData;
      const hospData = result.hospData;
      
      setHospital_det({
        id: hospData[0],
        name: hospData[1],
        address: hospData[2],
        contact: hospData[3],
      });
      setAdmin_det({
        id: adminData[0],
        name: adminData[1],
        contact: adminData[2],
      });
      
      console.log()
      if (adminData[1] === null && adminData[2] === null){
        setAdmin_det({
          id: adminData[0],
          name: "<your Name>",
          contact: "<Contact info.>"
        });
      }
    }
    getHospitalAdminInfo();
  }, [])

  const blurInfo = ()=>{
    setSet("");
    setBlur("blur");
  }

  const [updateDet, setUpdateDet] = useState({
    name: "",
    mobile: ""
  });

  let name, value;
  const updateHandleChanges=(e)=>{
    name = e.target.name;
    value = e.target.value;
    setUpdateDet({...updateDet, [name]:value});
  }

  const updateDetails = async(e)=>{
    e.preventDefault();
    const {name, mobile} = updateDet;

    const res = await fetch("/updateDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, mobile
      })
   });

   const data = await res.json();
   if(data.code === 200){
    window.alert("Details updated successful...");
   }
   else{
    window.alert("Failed to update....");
   }
   setSet("translate");
   setBlur("");
  }


  return (
    <div className="dashboard rel">
      <div className={ `info rel flex ${slide} ${blur}` }>
        <div className="cards flex ali-cent">
          <div className={ `hospital-tab flex ${hide}` }>
            <span>ID: { hospital_det.id }</span>
            <span>Name: { hospital_det.name }</span>
            <span>Address: { hospital_det.address }</span>
            <span>Contact Information: { hospital_det.contact }</span>
          </div>
          <div className={ `logo flex just-cent ${hide}` }>
            <img src={ require("../images/Logo.png") } alt="" />
          </div>
          <div className={ `admin-tab flex ${hide}` }>
            <span>ID: { admin_det.id }</span>
            <span>Name: { admin_det.name }</span>
            <span>Contact Information: { admin_det.contact }</span>
            <i onClick={blurInfo} className='bx bxs-message-square-edit edit-btn'></i>
          </div>
        </div>
        <div className="up-down-btn flex just-cent">
          <i class={ `bx bx-chevron-${down}` } onClick={ handleClick }></i>
        </div>
      </div>
        <div className={`popup abs ${set}`}>
            <h3>Update Details</h3>
            <form method="POST" className="flex just-cent ali-cent">
              <div className="input">
                <label htmlFor="name">Full Name:</label>
                <input type="text" name="name" value={updateDet.name} onChange={updateHandleChanges}/>
              </div>
              <div className="input">
                <label htmlFor="mobile">Mobile No.:</label>
                <input type="text" name="mobile" value={updateDet.mobile} onChange={updateHandleChanges}/>
              </div>
              <div className="btn">
                <button onClick={updateDetails}>Submit</button>
                <span className="cancel" onClick={()=>{setSet("translate"); setBlur("")}}>Cancel</span>
              </div>
            </form>
        </div>
      <div className={ `contaner-das ${addBlur}` }>
        {!show ? <LabInfo state={{show, setShow}}/>
        :<LabRequestList state={{show, setShow}}/>}
      </div>
    </div>
  )
}

export default LabDasboard
