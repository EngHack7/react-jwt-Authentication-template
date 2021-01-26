import React,{useEffect} from 'react'
import axios from 'axios'
const endpoint = "http://localhost:5000";



function Home() {
    const headers = {
        "Content-Type": "Application/json",
        "Authorization":"Bearer " + localStorage.getItem('auth_token')
      };
      
    return (
        <div>
            Home
        </div>
    )
}

export default Home
