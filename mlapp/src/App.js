import React, { useState }  from 'react'
import Form from './components/Form';
import './App.css';
import Modal from './components/modal/Modal'


function App() {
  const [showModal, setshowModal] = useState(false);
  const [prediction, setprediction] = useState();
  return (
    <div className="App">
      
      <Form showModal={showModal}  setshowModal={setshowModal} setprediction={setprediction} />
      <Modal showModal={showModal}  setshowModal={setshowModal} prediction={prediction} />
    </div>
  )
}

export default App

