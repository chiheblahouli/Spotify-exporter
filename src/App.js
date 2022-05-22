import './App.css';
import Login from './Login/Login.js'
import Navbar from './Navbar/Navbar';
import Image from './music-with-phone.png'

function App() {
  return (
    <div className="App">
      <img src={Image} alt="Music with phone" />
      <Login />
    </div>
  );
}

export default App;
