import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'materialize-css';
import { AuthContext } from './context/AuthContext';
import {useAuth} from './hooks/auth.hook';
import { Auth } from './pages/Auth';
import {Navbar} from './components/Navbar';
import {Tasks} from './pages/Tasks';
import {Edit} from './pages/Edit';
import { Create } from './pages/Create';


function App() {

  const {token, login, logout, ready} = useAuth();
  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{login, logout, isAuthenticated}}>
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
            <Route path='/edit/:id'><Edit /></Route>
          </Switch>
         </div>
        </Router>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
