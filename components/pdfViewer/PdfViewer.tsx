import { Container } from '@/styles/globalStyles';
import styled from 'styled-components';

interface PdfViewerProps {
  pdfURL: string;
}

const PdfViewer = ({ pdfURL }: PdfViewerProps) => {
  const PdfViewerContainer = styled(Container)`
    height: 90vh;
  `;

  return (
    <PdfViewerContainer>
      <object
        data='http://africau.edu/images/default/sample.pdf'
        //data={pdfURL}
        type='application/pdf'
        width='100%'
        height='100%'
      >
        <p>PDF file failed to load</p>
      </object>
    </PdfViewerContainer>
  );
};

export default PdfViewer;
