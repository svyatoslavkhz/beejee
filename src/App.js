import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'materialize-css';
import { Auth } from './components/Auth';
import {Navbar} from './components/Navbar';
import {Tasks} from './components/Tasks'
import { Create } from './components/Create';
function App() {
  return (
    <div className="App">
      <Router>
      <header className="App-header">
        <Navbar />
      </header>
         <div className="container">
          <Switch>
            <Route path='/' exact><Tasks /></Route>
            <Route path='/login' exact><Auth /></Route>
            <Route path='/create' exact><Create /></Route>
          </Switch>
         </div>
        </Router>
    </div>
  );
}

export default App;
