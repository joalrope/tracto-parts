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
  const [form] = Form.useForm();
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
      onOk() {
        form.resetFields();
      },
    });
  };

  return (
    <main>
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
                form={form}
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
                <Form.Item label='Código' name='code' normalize={(value) => (value ? value.toUpperCase() : value)}>
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
              <i className='ri-store-line' />
              <h3>
                <a>Marcas</a>
              </h3>
            </div>
            <div className='--icon-box'>
              <i className='ri-bar-chart-box-line' />
              <h3>
                <a>Productos</a>
              </h3>
            </div>
            <div className='--icon-box'>
              <i className='ri-bar-chart-box-line' />
              <h3>
                <a>Overhault</a>
              </h3>
            </div>
            <div className='--icon-box'>
              <i className='ri-calendar-todo-line' />
              <h3>
                <a>Mantenimiento Preventivo</a>
              </h3>
            </div>
            <div className='--icon-box'>
              <i className='ri-calendar-todo-line' />
              <h3>
                <a>Mantenimiento Correctivo</a>
              </h3>
            </div>
            <div className='--icon-box'>
              <i className='ri-calendar-todo-line' />
              <h3>
                <a>Servicio Técnico</a>
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className='container mt-5 trademark'>
        <h2>Marcas</h2>
        <article>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum assumenda id beatae. Assumenda aliquid
            molestias voluptate excepturi porro vel unde nulla deleniti debitis nihil neque, sunt iure voluptatum, nisi
            corrupti! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, quos laboriosam? Iure nobis
            natus aspernatur debitis exercitationem, sint dolorum temporibus corrupti officia iste quae iusto est qui,
            architecto, neque autem. Obcaecati, deleniti necessitatibus? Voluptatum error repellendus dolore molestias
            dolorem nam, consectetur ab itaque adipisci enim. Ipsam ipsum error ad ex temporibus facilis cupiditate
            provident, libero neque optio at soluta accusantium? Minima atque voluptatum laudantium. Id beatae quos
            pariatur laboriosam voluptatum ad in deleniti aspernatur, quaerat quibusdam, ipsam illum doloribus quae
            maxime rerum doloremque. Consectetur odio labore aut modi magnam eius! Nam officiis facilis autem ab veniam
            architecto iusto praesentium, quia laboriosam! Consequatur, nulla? Porro blanditiis dolorem officia
            provident eaque nisi fugiat magni consectetur? Cumque dolores, accusamus exercitationem unde temporibus aut.
            Iure, modi! Rerum facere blanditiis cum doloremque, labore suscipit ipsa, sint incidunt cupiditate quisquam
            praesentium mollitia quo voluptatibus ipsam possimus sequi. Praesentium perferendis repudiandae cupiditate
            debitis quidem, ducimus officiis voluptate. Voluptatem neque vero excepturi quo minima alias iure quidem
            omnis nemo ipsam sit officia et reiciendis aperiam molestias consectetur laudantium, dolor recusandae quia
            voluptatibus repellendus ipsa minus nesciunt. Quae, cumque? Explicabo enim sunt commodi distinctio porro
            nesciunt labore, quibusdam molestiae sequi ad? Ea facere culpa fuga libero, aliquam eum, ratione maxime
            minus nemo, aperiam optio molestias odit deleniti expedita eaque. Fugiat labore corrupti repellendus dolorum
            a magni, debitis perferendis iusto quisquam dolor. Porro, mollitia atque aspernatur tempora voluptates illo
            iure necessitatibus blanditiis dolor a quidem officiis sunt repudiandae vel asperiores. Labore, error
            inventore! Quisquam maiores perferendis odit iusto? Repudiandae quo mollitia commodi error maxime nulla
            asperiores iste laborum maiores eligendi sunt soluta enim at ipsum dolorem odit possimus, accusamus
            perferendis. Unde aut ea cumque vitae tempora in velit eveniet dignissimos corrupti. Provident repellendus
            sint, natus dolores enim et velit autem, ipsum error, magnam porro hic id ut officia maxime. Voluptas?
          </p>
        </article>
      </section>
    </main>
  );
};
