import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { displayPdfGenerated } from '../../actions/display';

export const GeneratePdfFromHtml = ({ WrappedComponent, data, msgWhenUnmounting }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.html2canvas = html2canvas;
    var doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter',
    });

    let content = document.getElementById('content-22');
    let urlBlob;

    doc.html(content, {
      callback: function (doc) {
        doc.viewerPreferences({ FitWindow: true }, true);
        //doc.autoPrint({ variant: 'non-conform' });
        const blob = doc.output('blob');
        urlBlob = URL.createObjectURL(blob);
        window.open(urlBlob);

        dispatch(displayPdfGenerated(false));
      },
      margin: [40, 40, 40, 40],
    });
  }, [dispatch]);

  useEffect(() => {
    return (urlBlob) => {
      URL.revokeObjectURL(urlBlob);
      if (msgWhenUnmounting) {
        msgWhenUnmounting();
      }
    };
  });

  return (
    <div className='content-22' id='content-22'>
      <WrappedComponent data={data} />
    </div>
  );
};

GeneratePdfFromHtml.propTypes = {
  WrappedComponent: PropTypes.node,
  data: PropTypes.object,
  msgWhenUnmounting: PropTypes.func,
};
