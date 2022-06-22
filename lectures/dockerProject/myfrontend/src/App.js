import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Frontpage from './ui/Frontpage';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';
import UserList from './ui/users/UserList';
import UserForm from './ui/users/UserForm';
import UserDetails from './ui/users/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Redirect exact from="/" to="/frontpage" />
            <Route exact path="/frontpage">
              <Frontpage />
            </Route>
            <Route exact path="/users">
              <UserList />
            </Route>
            <Route exact path="/users/:id">
              <UserDetails />
            </Route>
            <Route exact path="/users/form/:id?">
              <UserForm />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
