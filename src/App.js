import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
    return (
        <div className={"container"}>
            <NavBar/>
            <Home/>
            <Footer/>
        </div>
    );
}

export default App;
