import React from 'react';
import { Col, Row } from 'antd';
import { StockEntranceForm } from '../../../../forms/StockEntranceForm/StockEntranceForm';

export const StockEntrance = () => {
  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24}>
          <h4>Entrada de Inventario</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} className='--current-form__container'>
          <StockEntranceForm />
        </Col>
      </Row>
    </div>
  );
};
