import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../../../../hooks/userForm';
import { startRegister } from '../../../../../actions/auth';
import { goBack } from '../controllers/goBack';
import '../auth.scss';

export const Register = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    Name: 'Joalrope2',
    Email: 'joalrope2@gmail.com',
    Password: '123456',
    Password2: '123456',
  });

  const { Name, Email, Password, Password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startRegister(Name, Email, Password));
    goBack();
  };

  const handleValidatePassword = () => {
    if (Password && Password2) {
      if (Password !== Password2) {
        Swal.fire('Las contraseñas NO son iguales', 'Por favor corrija', 'warning');
      }
    }
  };

  return (
    <>
      <div className='body register-img'></div>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <div className='register'>
            <button className='close' onClick={goBack}>
              <i className='far fa-times-circle'></i>
            </button>
            <div className='card-header'>
              <h3>Registro</h3>
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
                    placeholder='Nombre de usuario'
                    name='Name'
                    value={Name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-envelope-open-text'></i>
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
                    onBlur={handleValidatePassword}
                  />
                </div>
                <div className='input-group form-group'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-redo-alt'></i>
                    </span>
                  </div>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='repita password'
                    name='Password2'
                    value={Password2}
                    onChange={handleInputChange}
                    onBlur={handleValidatePassword}
                  />
                </div>

                <div className='form-group d-flex justify-content-end'>
                  <input type='submit' value='Registrar' className='btn submit-btn' />
                </div>
                <div className='d-flex justify-content-end social_icon'>
                  <span>
                    <i className='fab fa-facebook-square'></i>
                  </span>
                  <span>
                    <i className='fab fa-google-plus-square'></i>
                  </span>
                  <span>
                    <i className='fab fa-twitter-square'></i>
                  </span>
                </div>
              </form>
            </div>
            <div className='card-footer'>
              <div className='d-flex justify-content-end links'>
                ¿Ya tiene una cuenta?<Link to='/login'>Ingrese</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
