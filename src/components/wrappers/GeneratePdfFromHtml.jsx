import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { setDisplayPdfGenerated } from '../../actions/modals';

export const GeneratePdfFromHtml = ({ WrappedComponent, data, msgWhenUnmounting }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.html2canvas = html2canvas;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter',
    });

    let content = document.getElementById('--pdf-content__container');
    let urlBlob;

    pdf.html(content, {
      callback: function (pdf) {
        pdf.viewerPreferences({ FitWindow: true }, true);
        //doc.autoPrint({ variant: 'non-conform' });
        const blob = pdf.output('blob');
        urlBlob = URL.createObjectURL(blob);
        window.open(urlBlob);

        dispatch(setDisplayPdfGenerated(false));
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
    <div className='--pdf-content__container' id='--pdf-content__container'>
      <WrappedComponent data={data} />
    </div>
  );
};

GeneratePdfFromHtml.propTypes = {
  WrappedComponent: PropTypes.func,
  data: PropTypes.object,
  msgWhenUnmounting: PropTypes.func,
};
