
import "./css/bootstrap.css";
import "./css/styles.css";
import{Routes,Route} from 'react-router-dom'
import SharedLayOut from "./components/SharedLayOut/SharedLayOut";
import Main from "./components/Main.jsx/Main";
import Iphone from "./Pages/Iphone/Iphone";
import ProductPage from "./Pages/ProductPage/ProductPage";
import For04 from "./Pages/For04/For04";

function App() {
  return (
      <Routes>
        <Route path="/" element={<SharedLayOut/> }>
        <Route path="/" element={<Main />} />
        <Route path="iphone" element ={<Iphone/>}/>
        <Route path="iphone/:productID" element ={<ProductPage/>}/>
        <Route path="*" element = {<For04/>}/>
        </Route>
      </Routes>
  );
}
export default App;
