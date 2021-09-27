import React from 'react';
import { Form, Input, Modal } from 'antd';

import './home.scss';
import { getProductByCode } from '../../../../actions/products';
import { getQtyAvailable } from '../../../../helpers/products/get-qty-available';
import { useDispatch } from 'react-redux';
import { loadingFinish, loadingStart } from '../../../../actions/ui';

const defaultMessage =
  'Para facilitarte el mantenimiento de tú equipo, ofrecemos la opción de consultar nuestra disponibilidad de repuestos.';

export const Home = () => {
  const dispatch = useDispatch();
  const onFinish = async ({ code }) => {
    dispatch(loadingStart());
    const { ok, result } = await getProductByCode(code);
    let line1;
    let line2;
    const line5 = `está disponible en nuestros almacenes.`;
    const line6 = 'Puede pasar a la brevedad por nuestra oficina, para su adquisicion';
    const line7 = 'Ofrecemos la opción de traerlo directamente del fabricante vía aerea o marítima';

    if (ok) {
      const qty = getQtyAvailable(result);
      const line3 = `El repuesto ${result.title} número de parte ${result.code}`;
      line2 = qty > 0 ? line6 : line7;
      const line4 = qty > 0 ? '' : 'NO';
      line1 = `${line3} ${line4} ${line5}`;
    } else {
      line1 = `El número de parte ${code} NO ${line5}`;
      line2 = `${line7}`;
    }
    dispatch(loadingFinish());
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
