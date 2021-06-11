import React from 'react';
import { SearchProduct } from '../pages/private/sales/SearchProduct';
import { SearchClient } from '../pages/private/sales/SearchClient';
import { ProductInfo } from '../pages/private/sales/ProductInfo/ProductInfo';
import { useSelector } from 'react-redux';

export const Search = () => {
  const { activeProduct } = useSelector((state) => state.product);
  //const { role } = useSelector((state) => state.auth);
  const role = 'developer';

  return (
    role !== 'basic' && (
      <section>
        <fieldset>
          <legend>Busqueda</legend>
          <SearchClient />
          <SearchProduct />
        </fieldset>
        {activeProduct && <ProductInfo product={activeProduct} mode={'portrait'} />}
      </section>
    )
  );
};
