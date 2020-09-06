import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createUser } from '../API';

function Register(props) {
  
  const { register, handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    try {
      await createUser(data);
      console.log(data);
      props.login(data.username);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit(onSubmit)}>
        <h5 className="grey-text text-darken-3">Register</h5>
        <div className="input-field">
          <label htmlFor="username">Username</label>
          <input name="username" type="text" required ref={register} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required ref={register} />
        </div>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" required ref={register} />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" required ref={register} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
