import logo from './logo.svg';
import './App.css';
import Header from './Components/Header'
import ProductDetail from "./Components/ProductDetail"
import CardMap from './View/Pages/Shopping/ProductMap';
function App() {
  return (
    <div className="App">
     <Header/>
     <CardMap/>
     <ProductDetail/>
    </div>
  );
}
export default App;
