import React from 'react';
import PropTypes from 'prop-types';
import { ActionButtom } from '../../../../controls/ActionButtom/ActionButtom';
import { TableAttrib } from '../../../../../classes/table-attrib-class';
import { parseJwt } from '../../../../../helpers/parse-jwt';
import './landscape-table.scss';

export const LandscapeTable = ({ data, columns, actionButtons }) => {
  const attrib = new TableAttrib(columns);
  const role = parseJwt();

  return (
    <div className='landscape-table-container animate__animated animate__animated animate__slower'>
      <table className='landscape-table'>
        <thead>
          <tr>
            {Object.keys(data[0]).map(
              (value) => attrib.isCellVisible(value) && <th key={value}>{attrib.getTitleHeader(value)}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {/* {Object.entries(data).map(([key, values]) => (
            <tr key={key}>
              {Object.entries(values).map(
                ([id, { value, span }]) =>
                  attrib.isCellVisible(id, role) && (
                    <td
                      key={id + key}
                      rowSpan={span}
                      align={attrib.getCellAlign(id)}
                      className={attrib.getCellClass(id)}
                      // onClick={() => handleClick(id, value)}
                    >
                      {attrib.getCellValue(id, value)}
                    </td>
                  )
              )}
              {Object.values(actionButtons).map(({ type, handleButtonClick }) => (
                <ActionButtom key={key} type={type} row={key} handleClick={handleButtonClick} />
              ))}
            </tr>
          ))} */}

          {Object.entries(data).map(([key, values]) => (
            <tr key={key}>
              {Object.entries(values).map(
                ([id, { value, span }]) =>
                  attrib.isCellVisible(id, role) && (
                    <td
                      key={id + key}
                      rowSpan={span}
                      align={attrib.getCellAlign(id)}
                      className={attrib.getCellClass(id)}
                      // onClick={() => handleClick(id, value)}
                    >
                      {attrib.getCellValue(id, value)}
                    </td>
                  )
              )}
              {Object.values(actionButtons).map(({ type, handleButtonClick }, index) => (
                <ActionButtom key={index} type={type} row={key} handleClick={handleButtonClick} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

LandscapeTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  actionButtons: PropTypes.array,
};
