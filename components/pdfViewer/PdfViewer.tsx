interface PdfViewerProps {
  pdfURL: string;
}

const PdfViewer = ({ pdfURL }: PdfViewerProps) => {
  return (
    <div style={{ height: '90vh' }}>
      <object
        data='http://africau.edu/images/default/sample.pdf'
        //data={pdfURL}
        type='application/pdf'
        width='100%'
        height='100%'
      >
        <p>PDF file failed to load</p>
      </object>
    </div>
  );
};

export default PdfViewer;
