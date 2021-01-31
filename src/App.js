import React from 'react'
import './App.css';
import Nav from './component/Nav'
import {Route,Switch,useHistory} from 'react-router-dom'
import Login from './component/login/Login'
import Register from './component/register/Register';
import Home from './component/Home';
import Profile from './component/Profile'
import axios from 'axios'
import _ from 'lodash'
import UserService from './component/shared/UserService'
import authService from './component/shared/auth'




function App() {
  const [user, setuser] = React.useState({})
  const history = useHistory()

  React.useEffect(()=>{
    const user = authService.getCurrentUser
    if (user){
      setuser(user)
    }

  })

  // const  settuserstate = user => {
  //   setuser(user)
  // }


  // const login =(email,password)=>{
  //   axios
  //   .post(
  //     `signin`,
  //     { email: email, password: password },
  //     { headers: headers }
  //   )
  //   .then((user) => {
  //     localStorage.setItem("auth_token",`Bearer ${user.data.token}`)
  //       setuser(user.data)
  //       console.log(user);
  //       history.push('/')
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }
  // const RegisterEndPoint = (form) => {
    
  //   axios.post('register',{form})
  //   .then((user) => {
  //     history.push('/login')
  //   }).catch(error=>{
  //     console.log(error)
  //   })
  // }

  const logout = () =>{
    authService.logout()
  }

  return (
    <div className="App">
      
        <Nav user={user} />
        <Switch>
           <Route path="/login" render={(props)=> (<Login { ...props} />)}  /> {/* Login = {login} */}
          <Route path="/register" render={(props) => <Register />}  />  {/*  Register ={RegisterEndPoint} */}
          <Route path="/profile"  render={(props)=> <Profile user={user} />} />
          <Route path="/"  render={ (props) => <Home user={user} />}  />
        </Switch>
        
    </div>
  );
}

export default App;
