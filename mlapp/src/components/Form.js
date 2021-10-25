
import React, { useState } from "react";
import axios from "axios";
import styled, { createGlobalStyle, css } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  html {
    height:135vh
  }
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, #f05053, #e1eec3);
    height: 100%;
    margin: 0;
    color: #555;
  }
`;

const sharedStyles = css`
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin: 10px 0 20px 0;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 135vh;
  padding: 0 20px;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 700px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  ${sharedStyles}
`;

const StyledButton = styled.button`
  display: block;
  background-color: #f7797d;
  color: #fff;
  font-size: 0.9rem;
  border: 0;
  border-radius: 5px;
  height: 40px;
  padding: 0 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledFieldset = styled.fieldset`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 20px 0;
  legend {
    padding: 0 10px;
  }
  label {
    padding-right: 20px;
  }
  input {
    margin-right: 10px;
  }
`;


function Form(props) {
  const [pId, setPId] = useState();
  const [pClass, setpClass] = useState();
  const [age, setage] = useState();
  const [sex, setsex] = useState("male");
  const [sibSp, setsibSp] = useState();
  const [parch, setparch] = useState();
  const [fare, setfare] = useState();
  const [embarked, setembarked] = useState("S");

  const handelpidChange = (event) => {
    setPId(event.target.value);
  };
  const handelpclassChange = (event) => {
    setpClass(event.target.value);
  };
  const handelsexChange = (event) => {
    setsex(event.target.value);
  };
  const handelageChange = (event) => {
    setage(event.target.value);
  };
  const handelsibspChange = (event) => {
    setsibSp(event.target.value);
  };
  const handelparchChange = (event) => {
    setparch(event.target.value);
  };
  const handelfareChange = (event) => {
    setfare(event.target.value);
  };

  const handelembarkedChange = (event) => {
    setembarked(event.target.value);
  };

  const handlesubmit = async (event) => {
    event.preventDefault();
    console.log(pId, pClass, sex, age, sibSp, parch, fare, embarked);
    await axios.post("http://localhost:8888/predict", {
      pId: pId,
      pClass: pClass,
      sex: sex,
      age: age,
      sibSp: sibSp,
      parch: parch,
      fare: fare,
      embarked: embarked,
    }).then((response) => {
        console.log("response",response.data.prediction)
        //response.data.prediction === 1 ? props.setprediction("UP") : props.setprediction("DOWN");
        if(response.data.prediction==1){
          props.setprediction("UP");
        }
        else{
          props.setprediction("DOWN");
        }
        props.setshowModal(true);
        
    });
  };

  return (
    <>
            <GlobalStyle/>
                <StyledFormWrapper>
                    <StyledForm onSubmit={handlesubmit}>
                        <h2>Predict the Survivor</h2>
                        
                        <label>Passenger ID</label>
                        <StyledInput type="number" value={pId} onChange={handelpidChange} />
                        
                        <label>Passenger Class</label>
                        <StyledInput type="number" value={pClass} onChange={handelpclassChange} />

                        <StyledFieldset>
                            <legend>Sex</legend>

                            <label>
                                <input type="radio" value="male" name="sex" 
                                       checked={sex==='male'} onChange={handelsexChange} />
                                Male
                            </label>
                            <label>
                                <input type="radio" value="female" name="sex" 
                                       checked={sex==='female'} onChange={handelsexChange} />
                                Female
                            </label>
                            
                        </StyledFieldset>

                        <label>Age</label>
                        <StyledInput type="number" value={age} onChange={handelageChange} />

                        <label>SibSp</label>
                        <StyledInput type="number" value={sibSp} onChange={handelsibspChange} />

                        <label>Parch</label>
                        <StyledInput type="number" value={parch} onChange={handelparchChange} />

                        <label>Fare</label>
                        <StyledInput type="number" value={fare} onChange={handelfareChange} />

                        <StyledFieldset>
                            <legend>Embarked Class</legend>

                            <label>
                                <input type="radio" value="S" name="embarked" 
                                       checked={embarked==='S'} onChange={handelembarkedChange} />
                                S Class
                            </label>
                            <label>
                                <input type="radio" value="C" name="embarked" 
                                       checked={embarked==='C'} onChange={handelembarkedChange} />
                                C Class
                            </label>
                            <label>
                                <input type="radio" value="Q" name="embarked" 
                                       checked={embarked==='Q'} onChange={handelembarkedChange} />
                                Q Class
                            </label>


                            
                        </StyledFieldset>

                        <StyledButton type="submit">Predict</StyledButton>
                    </StyledForm>
                </StyledFormWrapper>
            </>
  );
}

export default Form;