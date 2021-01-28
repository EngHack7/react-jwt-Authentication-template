import React from 'react'
import './App.css';
import Nav from './component/Nav'
import {Route,Switch,useHistory} from 'react-router-dom'
import Login from './component/login/Login'
import Register from './component/register/Register';
import Home from './component/Home';
import Profile from './component/Profile'
import axios from 'axios'
import {RegisterEndPoint} from './component/shared/auth'

const endpoint = "http://localhost:5000";


const headers = {
  "Content-Type": "Application/json",
};

export var UserContext = React.createContext()

function App() {
  const [user, setuser] = React.useState('')
  const history = useHistory()

  React.useEffect(()=>{
      axios.get('signin',{headers : headers}
      ).then(user =>{
        settuserstate(user.data)
      })
  })

  const  settuserstate = user => {
    setuser(user)
  }

  const logout =() => {
    localStorage.clear()
    setuser({})
    
}

  const login =(email,password)=>{
    axios
    .post(
      `signin`,
      { email: email, password: password },
      { headers: headers }
    )
    .then((user) => {
      localStorage.setItem("auth_token",`Bearer ${user.data.token}`)
        setuser(user.data)
        console.log(user);
        history.push('/')
    })
    .catch((error) => {
      alert(error);
    });
  }
  const RegisterEndPoint = (form) => {
    
    axios.post('register',{form})
    .then((user) => {
      history.push('/login')
    }).catch(error=>{
      console.log(error)
    })
  }


  return (
    <div className="App">
      <UserContext.Provider value={{user:user,setuser : setuser}} >
        <Nav user={user} />
        <Switch>
           <Route path="/login" render={(props)=> (<Login Login = {login} setuser={setuser} ></Login>)}  />
          <Route path="/register" render={(props) => <Register Register ={RegisterEndPoint} />}  />
          <Route path="/profile:id"  render={()=> <Profile user={user} />} />
          <Route path="/"  render={ (props) => <Home user={user} />}  />
        </Switch>
        </UserContext.Provider>
    </div>
  );
}

export default App;
