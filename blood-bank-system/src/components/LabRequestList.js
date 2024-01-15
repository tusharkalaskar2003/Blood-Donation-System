import React, { useState } from 'react'

function LabRequestList(props) {

  const state = props.state;
  // const state = "vilas"
  console.log(!state.show);

  const goToRequestList = () => {
    state.setShow(!state.show);
  }

  // let x = "xxxxx";
  // useEffect(()=>{
  //    x = state.show;
  // }, [state.show]);

  const [btnValid, setBtnValid] = useState("");

  const handleCheckBox = (e) => {
    let x = document.getElementById("conf").disabled;
    console.log(x);
    if (x) {
      document.getElementById("conf").disabled = false;
      setBtnValid("green");
    }
    else {
      document.getElementById("conf").disabled = true;
      setBtnValid("");
      // console.log("false");
    }
  }

  const [isPop, setIsPop] = useState(false);
  const [blur, setBlur] = useState("");
  const [getDown, setGetDown] = useState("");

  const confirmClick = (e) => {
    console.log(e);
    if (isPop) {
      setBlur("blur");
      setIsPop(false);
      setGetDown("get-down");
    }
    else {
      setIsPop(true);
      setBlur("");
      setGetDown("");
    }
  }

  return (
    <div className={ `request-list flex ali-cent` }>
      <div className={ `lister flex ali-cent ${blur}` }>
        <div className="back">
          <i class='bx bx-arrow-back' onClick={ goToRequestList } ></i>
        </div>
        <div className="head ali-cent flex">
          <h2 className="rel">Request List: </h2>
          <div className="search flex just-cent ali-cent">
            <input type="text" placeholder="Search" />
            <i class='bx bx-search'></i>
          </div>
        </div>
        <div className="line"></div>
        <div className="detail">
          <div className="card-det flex">
            <span>Name</span>
            <span>Appointment Data</span>
            <span>Mobile No.</span>
            <span>Blood Group</span>
            <span>Status</span>
          </div>
          <div className="cardp flex">
            <span>Rohit Laxman Fasale</span>
            <span>12/12/2023</span>
            <span>9359775994</span>
            <span>A-</span>
            <span><button className="conf" onClick={ confirmClick }>Confirm</button></span>
          </div>
          <div className="cardp flex">
            <span>Vilas Balu Rabad</span>
            <span>20/12/2023</span>
            <span>7387410172</span>
            <span>O+</span>
            <span><button className="conf" onClick={ confirmClick }>Confirm</button></span>
          </div>
        </div>
      </div>
      <div className={ `confirmation abs flex just-cent ali-cent ${getDown}` }>
        <form action="#">
          <div className="liter flex">
            <label htmlFor="liter">Enter Blood Qauntity</label>
            <input type="number" name="liter" placeholder="In Liter" required />
          </div>
          <div className="checkbox flex just-cent ali-cent">
            <input type="checkBox" onChange={ handleCheckBox } name="checkbox" />
            <label htmlFor="checkbox">Comfirm</label>
          </div>
          <div className="btns flex jus-cent ali-cent">
            <span className="cancel" onClick={ confirmClick }>Cancel</span>
            <button type="submit" id="conf" className={ `btn ${btnValid}` } disabled>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LabRequestList
