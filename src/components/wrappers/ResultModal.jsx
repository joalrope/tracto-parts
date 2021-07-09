import React from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';
import { ModalWrapper } from '../wrappers/ModalWrapper';

const ResultBody = ({ status, title, subTitle }) => {
  return <Result status={status} title={title} subTitle={subTitle} />;
};

export const ResultModal = ({
  status,
  title,
  subTitle,
  extra,
  visible,
  okText,
  handleOk,
  cancelText,
  handleCancel,
}) => {
  return (
    <ModalWrapper
      WrappedComponent={() => {
        return <ResultBody status={status} title={title} subTitle={subTitle} extra={extra} />;
      }}
      title={null}
      draggable={false}
      visible={visible}
      okText={okText}
      handleOk={handleOk}
      cancelText={cancelText}
      handleCancel={handleCancel}
    />
  );
};

ResultModal.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  extra: PropTypes.node,
  visible: PropTypes.bool,
  okText: PropTypes.string,
  handleOk: PropTypes.func,
  cancelText: PropTypes.string,
  handleCancel: PropTypes.func,
};

ResultBody.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  extra: PropTypes.node,
};
