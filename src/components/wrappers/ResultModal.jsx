import React from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd';
import { ModalWrapper } from '../wrappers/ModalWrapper';

const ResultBody = ({ status, title, subTitle }) => {
  return <Result status={status} title={title} subTitle={subTitle} />;
};

export const ResultModal = ({ status, title, subTitle, extra, visible, handleOk, handleCancel }) => {
  return (
    <ModalWrapper
      WrappedComponent={() => {
        return <ResultBody status={status} title={title} subTitle={subTitle} extra={extra} />;
      }}
      title={null}
      draggable={false}
      visible={visible}
      handleOk={handleOk}
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
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
};

ResultBody.propTypes = {
  status: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  extra: PropTypes.node,
};
