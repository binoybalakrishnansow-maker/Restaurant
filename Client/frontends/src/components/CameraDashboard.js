import React, { Component } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';
import {
  Box,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
} from '@mui/material';

class CameraDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrResult: '',
      menuItems: [],
      loading: false,
      error: '',
    };
    this.fileInputRef = React.createRef();
  }

  handleFileChange = async (event) => {
    debugger;
    const file = event.target.files[0];
    if (!file) return;

    this.setState({ loading: true, menuItems: [], error: '', qrResult: '' });

    const html5QrCode = new Html5Qrcode("qr-reader");

    try {
      const result = await html5QrCode.scanFile(file, true);
      this.setState({ qrResult: result });

      // Fetch menu using decoded QR content (assuming it's an ID or endpoint)
      const response = await axios.get(`http://localhost:5000/api/menu/${result}`);
      this.setState({ menuItems: response.data, loading: false });
    } catch (err) {
      console.error('QR decoding or menu fetch error:', err);
      this.setState({
        error: 'Failed to scan QR or fetch menu. Make sure it’s a valid QR code.',
        loading: false,
      });
    }
  };

  render() {
    const { qrResult, menuItems, loading, error } = this.state;

    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Scan QR from Image to View Menu
        </Typography>

        <input
          type="file"
          accept="image/*"
          onChange={this.handleFileChange}
          ref={this.fileInputRef}
        />

        {loading && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress />
            <Typography variant="body2">Scanning QR and loading menu...</Typography>
          </Box>
        )}

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {qrResult && !loading && (
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            QR Result: {qrResult}
          </Typography>
        )}

        {menuItems.length > 0 && (
          <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Menu
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}

        {/* Invisible container for html5-qrcode */}
        <div id="qr-reader" style={{ display: 'none' }} />
      </Box>
    );
  }
}

export default CameraDashboard;
