import Search from './components/Search';
import { React, useState } from "react";
import './App.css';

function App() {

  const [zipCode, setZipCode] = useState("");

  return (
    <div className="App">
      <header className="App-header">

        <Search />

      </header>
    </div>
  );
}

export default App;
