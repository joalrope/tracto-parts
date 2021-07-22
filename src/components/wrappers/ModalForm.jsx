import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Form, Modal } from 'antd';
import Draggable from 'react-draggable';
import logo from '../../assets/images/logo.png';
import './modal-form.scss';

export const ModalForm = ({ WrappedComponent, title, visible, onOk, okText, onCancel, cancelText, draggable }) => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = nodeRef?.current?.getBoundingClientRect();
    setDisable(true);
    setBounds({
      bounds: {
        left: -targetRect?.left + uiData?.x,
        right: clientWidth - (targetRect?.right - uiData?.x),
        top: -targetRect?.top + uiData?.y,
        bottom: clientHeight - (targetRect?.bottom - uiData?.y),
      },
    });
  };

  let modalTitle = null;

  if (draggable) {
    modalTitle = (
      <div
        className='--form-modal__title-container'
        style={{
          width: '100%',
          cursor: 'move',
        }}
        onMouseOver={() => {
          if (disable) {
            setDisable(!disable);
          }
        }}
        onMouseOut={() => {
          setDisable(true);
        }}
        // fix eslintjsx-a11y/mouse-events-have-key-events
        // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
        onFocus={() => {}}
        onBlur={() => {}}
        // end
      >
        <div className='--form-modal__title-logo'>
          <Image src={logo} alt={'Logo Tractocenter'} />
        </div>
        <div className='--form-modal__title-value'>{title}</div>
      </div>
    );
  } else {
    if (typeof title === 'string') {
      modalTitle = title;
    }
  }

  const nodeRef = createRef();

  return (
    <Modal
      className='--form-modal__container'
      visible={visible}
      title={modalTitle}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onOk(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      modalRender={(modal) => (
        <Draggable
          nodeRef={nodeRef}
          disabled={disable}
          bounds={bounds}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div className='--form-modal__draggable' ref={nodeRef}>
            {modal}
          </div>
        </Draggable>
      )}
    >
      <WrappedComponent form={form} />
    </Modal>
  );
};

ModalForm.propTypes = {
  WrappedComponent: PropTypes.func,
  title: PropTypes.string,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  draggable: PropTypes.bool,
};
