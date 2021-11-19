import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Divider, Row } from 'antd';
import { getProducts } from '../../../../actions/products';
import { loadingFinish, loadingStart } from '../../../../actions/ui';
import { gralColumns } from '../../../../assets/data/products.dataConfig';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import './stock.scss';

export const Stock = () => {
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  let result;

  useEffect(async () => {
    let abortController = new AbortController();
    dispatch(loadingStart());
    ({ result } = await getProducts());
    setProducts(result);
    dispatch(loadingFinish());
    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <Row className='--stock-page__row' justify='center'>
      <Col xs={24} lg={14}>
        {products?.length > 0 && (
          <div className='--products__container'>
            <Divider className='--products__divider' orientation='center'>
              Inventario
            </Divider>
            <EditableTable cols={gralColumns} dataSource={products} pagination={true} />
          </div>
        )}
      </Col>
    </Row>
  );
};
