import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import Draggable from 'react-draggable';

export const ModalWrapper = ({ WrappedComponent, title, draggable, visible, handleOk, handleCancel }) => {
  const [disable, setDisable] = useState(true);
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

  const draggleRef = React.createRef();

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
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
        {title}
      </div>
    );
  } else {
    if (typeof title === 'string') {
      modalTitle = title;
    }
  }

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      modalRender={(modal) => (
        <Draggable disabled={disable} bounds={bounds} onStart={(event, uiData) => onStart(event, uiData)}>
          <div ref={draggleRef}>{modal}</div>
        </Draggable>
      )}
    >
      <WrappedComponent />
    </Modal>
  );
};

ModalWrapper.propTypes = {
  WrappedComponent: PropTypes.node,
  title: PropTypes.string || PropTypes.node,
  draggable: PropTypes.bool,
  visible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};
