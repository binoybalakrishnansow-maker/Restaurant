// src/components/QRCodeGenerator.js
import React, { Component } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
//import QRCode from 'qrcode.react';
import { QRCodeCanvas } from 'qrcode.react';


class QRCodeGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuUrl: '',
      showQR: false,
    };
  }

  handleChange = (event) => {
    this.setState({ menuUrl: event.target.value });
  };

  generateQR = () => {
    this.setState({ showQR: true });
  };

  render() {
    const { menuUrl, showQR } = this.state;

    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Generate QR Code for Menu
          </Typography>

          <TextField
            fullWidth
            label="Enter Menu URL"
            variant="outlined"
            value={menuUrl}
            onChange={this.handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={this.generateQR}
            disabled={!menuUrl}
          >
            Generate QR Code
          </Button>

          {showQR && (
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="subtitle1" gutterBottom>
                Scan this QR Code to view the menu:
              </Typography>
              <QRCodeCanvas value={menuUrl} size={256} />
            </Box>
          )}
        </Paper>
      </Container>
    );
  }
}

export default QRCodeGenerator;
