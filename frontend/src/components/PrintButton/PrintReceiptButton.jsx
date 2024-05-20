import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import html2pdf from "html2pdf.js";
const ExportHTMLToPDFButton = (props) => {
  const exportPDF = () => {
    const element = document.getElementById("receipt");

    html2pdf().from(element).save("document.pdf");
  };
  
  return (
    <Button onClick={exportPDF} color="primary" size="sm" className="px-6">
      Print Receipt
    </Button>
  );
};

export default ExportHTMLToPDFButton;
