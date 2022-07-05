import React, { useEffect, useState } from "react";

function App() {
  const [pups, setPups] = useState([]);
  const [pupInfo, setPupInfo] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/pups')
      .then(r => r.json())
      .then(data => setPups(data));
  }, []);

  function handlePupClick(pup) {
    setPupInfo(pup);
  }

  function handleGoodDogClick(pup) {
    fetch(`http://localhost:3001/pups/${ pup.id }`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !pup.isGoodDog
      })
    })
      .then(r => r.json())
      .then(data => {
        setPupInfo(data);
      });
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">{
        pups.map((pup) => (
          <span key={ pup.id } onClick={() => handlePupClick(pup) }>{ pup.name }</span>
        ))
      }</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {
            <>
            <img src={ pupInfo.image } alt={ pupInfo.name }/>
            <h2>{ pupInfo.name }</h2>
            <button onClick={() => handleGoodDogClick(pupInfo) }>{ pupInfo.isGoodDog ? "Bad Dog" : "Good Dog" }</button>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
