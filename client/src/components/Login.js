import React from 'react';
import { useForm } from 'react-hook-form';

import { getUser } from '../API';

function Login(props) {
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    try {
      const user = await getUser(data);
      console.log(user);
      if (user.length > 0 & user[0].password === data.password) {
        props.login(user[0].username);
      }
      else {
        alert('failed: try different username/pw')
      }
    } catch (error) {
    console.error(error);
    }
  }

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="grey-text text-darken-3">Sign in</h5>
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input name="username" type="text" required ref={register} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required ref={register} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
