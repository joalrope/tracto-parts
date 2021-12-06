import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Divider, Row } from 'antd';
import { getSales } from '../../../../actions/sales';
import { loadingFinish, loadingStart } from '../../../../actions/ui';
import { columns } from '../../../../assets/data/sale.dataConfig';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import { PrintActionRender } from './PrintActionRender';

export const DeliveryNotes = () => {
  const dispatch = useDispatch();
  const [sales, setSales] = useState(null);
  let result;

  useEffect(async () => {
    let abortController = new AbortController();
    dispatch(loadingStart());
    result = await getSales();
    setSales(result);
    dispatch(loadingFinish());
    return () => {
      abortController.abort();
    };
  }, []);

  if (!columns.find((obj) => obj.key === 'action')) {
    columns.push({
      title: '',
      key: 'action',
      width: 10,
      render: PrintActionRender,
    });
  }

  return (
    <Row className='--stock-page__row' justify='center'>
      <Col xs={24} lg={14}>
        {sales?.length > 0 && (
          <div className='--products__container'>
            <Divider className='--products__divider' orientation='center'>
              Notas de Entregas
            </Divider>
            <EditableTable cols={columns} dataSource={sales} pagination={true} />
          </div>
        )}
      </Col>
    </Row>
  );
};
