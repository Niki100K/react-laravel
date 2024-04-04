import React, { useContext, useState } from 'react';
import './Sign.css'
import { useDispatch } from 'react-redux'
import { AppContext } from '../../AppContext';
export default function Sign({ handle }) {
  const dispatch = useDispatch()
  const { API } = useContext(AppContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const form = [
    {
      field: 'name',
      value: formData.name,
      maxSymbols: 25,
      label: 'Enter your name',
    },
    {
      field: 'email',
      value: formData.email,
      maxSymbols: 50,
      label: 'Enter your email',
    },
    {
      field: 'password',
      value: formData.password,
      maxSymbols: 50,
      label: 'Enter your password',
    },
    {
      field: 'password_confirmation',
      value: formData.password_confirmation,
      maxSymbols: 50,
      label: 'Confirm Password',
    },
  ];
  
  const handleForm = (field, e) => {
    let value = e.target.value;
    if (field === 'name') {
      value = value.replace(/[^a-zA-Z]/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [correctSign, setCorrectSign] = useState('in');
  const handleSign = (type) => {
    setCorrectSign(type);
  };

  const [fetchError, setFetchError] = useState({})
  const handleSignUser = async (e, api) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API}/api/${api}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.password_confirmation,
        })
      })
      const data = await response.json()
      if (response.status === 200) {
        dispatch({
          type: 'setData',
          payload: data
        })
        handle('')
      } else {
        setFetchError(data)
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='Sign c f'>
      {correctSign === 'in' && <SignIn form={form.slice(1, 3)} handle={handleSign} handleForm={handleForm} sign={handleSignUser} />}
      {correctSign === 'up' && <SignUp form={form} handle={handleSign} handleForm={handleForm} sign={handleSignUser}/>}
      {Object.values(fetchError).map((info, index) => (
        <dfn key={index}>{info}</dfn>
      ))}
    </div>
  );
}

function SignIn ({ form, handle, handleForm, sign }) {
  return (
    <div>
      <form onSubmit={(e) => sign(e, 'login')} action="">
        {form.map((info, index) => (
          <div className='input c f' key={index}>
            <input 
              id={info.field}
              onChange={(e) => handleForm(info.field, e)}
              maxLength={info.maxSymbols}
              required
              placeholder=''
              type={info.field}
            />
            <label htmlFor={info.field}>{info.label}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <p>Don't have account? <span onClick={() => handle('up')}>Click Me</span> to Sign Up</p>
    </div>
  );
}

function SignUp ({ form, handle, handleForm, sign }) {
  return (
    <div>
      <form onSubmit={(e) => sign(e, 'register')} action="">
        {form.map((info, index) => (
          <div className='input c f' key={index}>
            <input
              id={info.field}
              onChange={(e) => handleForm(info.field, e)}
              maxLength={info.maxSymbols}
              required
              placeholder=''
              type={
                info.field === 'password_confirmation' ? 'password' : info.field
              }
            />
            <label htmlFor={info.field}>{info.label}</label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      <p>Already have account? <span onClick={() => handle('in')}>Click Me</span> to Sign In</p>
    </div>
  );
}
