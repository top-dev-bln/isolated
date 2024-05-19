import docspdf from "../assets/Docs.pdf";

const PDFPage = () => {
  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Documentatie</h1>
      <div className="pdf-container">
        <embed src={docspdf} type="application/pdf" width="100%" height="800px" />
      </div>
    </div>
  );
};

export default PDFPage;
