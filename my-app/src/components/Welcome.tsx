import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./Welcome.css";
import { useState } from "react";
import baseAPI from "../api/base";
import { AxiosResponse } from "axios";

const CSRF_URL = 'csrf/';

function Welcome({setcsrfToken}: {setcsrfToken: Dispatch<SetStateAction<string>>}) {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMsg('');
    setPassword(e.target.value);
  }

  async function handleEnter() {

    try {
      const response: AxiosResponse = await baseAPI.post(CSRF_URL,  {
        password
        });

      if (response.data?.csrfToken) {
        setcsrfToken(response.data.csrfToken);
      }
      if (response.data?.message) {
        setErrorMsg(response.data.message);
      }
      else if (!response.data.hasOwnProperty('csrfToken')) {
        setErrorMsg("Denied");
      }
    } catch (err) {
      setErrorMsg("Server Error");
    }
  }

  return (
    <div className='welcome'>
      <h1>Welcome</h1>
      {errorMsg && <p className='error'>{errorMsg}</p>}
      <label>Enter Password:</label>
      <input 
        className="welcome-pass"
        type='password' 
        id='pass' 
        name='password'
        onChange={handleChange}
      />
      <button className='welcome-btn' onClick={handleEnter}>Enter</button>
    </div>
  )
}

export default Welcome;