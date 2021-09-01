import React from 'react';
import { Form, Input, Modal } from 'antd';

import './home.scss';

const defaultMessage =
  'Para facilitarte el mantenimiento de tú equipo, ofrecemos la opción de consultar nuestra disponibilidad de repuestos.';

export const Home = () => {
  const onFinish = ({ code }) => {
    const line1 = `El repuesto código ${code} no está disponible en nuestros almacnes.`;
    const line2 = 'Ofrecemos la opción de traerlo directamente del fabricante vía aerea o marítima';
    Modal.info({
      title: 'Disponibilidad',
      content: (
        <div>
          <p>{line1}</p>
          <p>{line2}</p>
        </div>
      ),
      okText: 'Aceptar',
      onOk() {},
    });
  };

  return (
    <section className='--home-page__container'>
      <div className='container' data-aos='fade-up'>
        <div className='mt-5 row justify-content-center'>
          <div className='col-xl-6 col-lg-8'>
            <h1>
              Repuestos y servicios para maquinaria pesada<span>.</span>
            </h1>
            <h2>
              tenemos el mayor stock de repuestos y el personal técnico con la mayor experiencia del sector, para
              apoyarte en mantenimiento de tú equipo
            </h2>
          </div>
        </div>
        <div className={'--query-frame__container'}>
          <div className='--home-page__query'>
            <div className='--query-frame__title '>
              <h3>Consultar disponibilidad</h3>
            </div>
            <Form
              name='basic'
              layout='vertical'
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              onFinish={onFinish}

              /*onFinishFailed={onFinishFailed} */
            >
              <Form.Item label='Código' name='code'>
                <Input placeholder='Introduzca código' />
              </Form.Item>
            </Form>

            <div className='--query-frame__message'>
              <p>{defaultMessage}</p>
            </div>
          </div>
        </div>

        <div className='--icon-box__container '>
          <div className='--icon-box'>
            <i className='ri-store-line'></i>
            <h3>
              <a>Marcas</a>
            </h3>
          </div>
          <div className='--icon-box'>
            <i className='ri-bar-chart-box-line'></i>
            <h3>
              <a>Productos</a>
            </h3>
          </div>
          <div className='--icon-box'>
            <i className='ri-bar-chart-box-line'></i>
            <h3>
              <a>Overhault</a>
            </h3>
          </div>
          <div className='--icon-box'>
            <i className='ri-calendar-todo-line'></i>
            <h3>
              <a>Mantenimiento Preventivo</a>
            </h3>
          </div>
          <div className='--icon-box'>
            <i className='ri-calendar-todo-line'></i>
            <h3>
              <a>Mantenimiento Correctivo</a>
            </h3>
          </div>
          <div className='--icon-box'>
            <i className='ri-calendar-todo-line'></i>
            <h3>
              <a>Servicio Técnico</a>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
