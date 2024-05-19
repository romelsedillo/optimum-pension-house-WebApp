import React from "react";
import { Button } from "@nextui-org/button";
import html2pdf from "html2pdf.js";

const ExportHTMLToPDFButton = () => {
  const exportPDF = () => {
    const element = document.getElementById("report");

    html2pdf().from(element).save("document.pdf");
  };

  return (
    <Button onClick={exportPDF} color="primary" size="sm" className="px-6">
      Export to PDF
    </Button>
  );
};

export default ExportHTMLToPDFButton;
