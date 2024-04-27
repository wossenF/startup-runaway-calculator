import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const handleDownloadClick = () => {
  const input = document.getElementById("pdf-content");

  if (input) {
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        // Set desired page format (e.g., 'a4', 'letter') or custom dimensions
        format: 'a4',
      });
      const imgWidth = pdf.internal.pageSize.getWidth(); // Get actual page width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Calculate margins for centering and spacing on both sides
      const marginX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2; // Center horizontally
      const marginY = 15; 
      const marginSides = 15; 

      pdf.addImage(imgData, "PNG", marginX + marginSides, marginY, imgWidth - 2 * marginSides, imgHeight);

      pdf.save("six-month-report.pdf");
    });
  }
};

export default handleDownloadClick;
