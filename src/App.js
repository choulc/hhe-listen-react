// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Listen from './pages/Listen';
import Index from './pages/Index';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/listen/:volumeNum">
          <Listen />
        </Route>
        <Route path="/">
          <Index />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
