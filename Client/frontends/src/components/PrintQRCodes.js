import React, { Component } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class PrintQRCodes extends Component {
  constructor(props) {
    super(props);
    this.qrRef = React.createRef();
  }

  generatePDF = () => {
    const input = this.qrRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('menu-table-qr-codes.pdf');
    });
  };

  renderQRCodes = () => {
    const tableCount = 20;
    const domain = 'http://localhost:3000';


    return Array.from({ length: tableCount }, (_, i) => {
      const tableNumber = i + 1;
      const url = `${domain}/menu/table/${tableNumber}`;
      return (
        <div key={tableNumber} style={{ margin: 20, textAlign: 'center' }}>
          <QRCodeCanvas value={url} size={100} />
          <p style={{ fontSize: '14px' }}>Table {tableNumber}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <h2>🖨️ Export Menu QR Codes for Tables</h2>
        <button onClick={this.generatePDF} style={{ marginBottom: '20px' }}>
          Download PDF
        </button>

        <div
          ref={this.qrRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            background: 'white',
            padding: '10px',
            maxWidth: '800px',
            margin: 'auto'
          }}
        >
          {this.renderQRCodes()}
        </div>
      </div>
    );
  }
}

export default PrintQRCodes;
