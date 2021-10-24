// NPM
import {
  BrowserRouter as Router
} from "react-router-dom";
// Files
import './App.css';
import { AppRouter } from "./components/AppRouter/AppRouter";

function App() {
  return (
      <Router>
        <AppRouter />
      </Router>
  );
}

export default App;
