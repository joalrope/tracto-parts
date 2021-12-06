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
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  const dispatch = useDispatch();

  useEffect(async () => {
    let abortController = new AbortController();
    dispatch(loadingStart());
    const { len, result } = await getProducts(page, size);
    setProducts(result);
    setTotal(len);
    dispatch(loadingFinish());
    return () => {
      abortController.abort();
    };
  }, [page, size]);

  const pagination = {
    total,
    current: page,
    pageSize: size,
    position: 'top',
    onChange: (current) => {
      setPage(current);
    },
    onShowSizeChange: (current, pageSize) => {
      setPage(current);
      setSize(pageSize);
    },
    showSizeChanger: true,
  };

  return (
    <Row className='--stock-page__row' justify='center'>
      <Col xs={24} lg={14}>
        {products?.length > 0 && (
          <div className='--products__container'>
            <Divider className='--products__divider' orientation='center'>
              Inventario
            </Divider>
            <EditableTable cols={gralColumns} dataSource={products} pagination={pagination} />
          </div>
        )}
      </Col>
    </Row>
  );
};
