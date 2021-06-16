import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { serCurrentPath, startLogin } from '../../../../../actions/auth';
import { useForm } from '../../../../../hooks/userForm';
import { goBack } from '../controllers/goBack';
import '../auth.scss';

export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    Email: 'joalrope@gmail.com',
    Password: '123456',
  });

  const { Email, Password } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLogin(Email, Password));
    dispatch(serCurrentPath('/home'));
    history.push('/app/sales');
  };

  const handleShowRegister = () => {
    history.push('/register');
    goBack();
  };

  const handleShowPasswordForgot = () => {
    history.push('/forgot');
    goBack();
  };

  const handleLoginFacebk = () => {};

  const handleLoginGoogle = () => {};

  const handleLoginTwittr = () => {};

  return (
    <>
      <div className='body login-img'></div>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='login'>
            <button className='close' onClick={goBack}>
              <i className='far fa-times-circle'></i>
            </button>
            <div className='card-header'>
              <h3>Ingresar</h3>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit} autoComplete='off'>
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-user'></i>
                    </span>
                  </div>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Correo'
                    name='Email'
                    value={Email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-key'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='password'
                    name='Password'
                    value={Password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='row align-items-center remember'>
                  <input type='checkbox' />
                  Recordarme
                </div>
                <div className='form-group d-flex justify-content-end'>
                  <input type='submit' value='Ingresar' className='btn submit-btn' />
                </div>
                <div className='d-flex justify-content-end social_icon'>
                  <span>
                    <i onClick={handleLoginFacebk} className='fab fa-facebook-square'></i>
                  </span>
                  <span>
                    <i onClick={handleLoginGoogle} className='fab fa-google-plus-square'></i>
                  </span>
                  <span>
                    <i onClick={handleLoginTwittr} className='fab fa-twitter-square'></i>
                  </span>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <div className='d-flex justify-content-end links' onClick={handleShowRegister}>
                ¿No tiene una cuenta?<Link to='/register'>Registrese</Link>
              </div>
              <div className='d-flex justify-content-end links' onClick={handleShowPasswordForgot}>
                <Link to='/forgot'>Olvidó su contraseña?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
