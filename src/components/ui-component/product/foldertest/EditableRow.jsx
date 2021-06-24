import React from 'react';
import { Form } from 'antd';
import { EditableContext } from './AntdTable';

export const EditableRow = ({ /* index, */ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

EditableRow.propTypes = {};
