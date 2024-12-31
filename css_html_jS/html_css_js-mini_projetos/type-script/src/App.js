import { Test } from './components/Test.tsx';
import React, {useState} from 'react';

function App() {
  const [myState, setMyState] = useState("luck");

  return (
    <div onClick={ () => setMyState("Darth") }>
      <Test myState="Anakin" myFunc={() => console.log("Star Was")}/>
    </div>
  );
}

export default App;
