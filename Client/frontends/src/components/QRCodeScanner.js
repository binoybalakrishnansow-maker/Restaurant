import React, { Component } from 'react';
import { QrReader } from 'react-qr-reader';
import {
  Box, Typography, Card, CardContent, CardMedia, Grid, Paper
} from '@mui/material';

export default class QRMenuView extends Component {
  state = {
    scannedData: '',
    menuItems: []
  };

  handleScan = (result) => {
    if (result?.text) {
      this.setState({ scannedData: result.text });

      try {
        // Try parsing JSON
        const jsonData = JSON.parse(result.text);
        if (Array.isArray(jsonData)) {
          this.setState({ menuItems: jsonData });
          return;
        }
      } catch {
        // Fallback to CSV parsing
        const lines = result.text.split('\n');
        const headers = lines[0].split(',');
        const rows = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((acc, header, i) => {
            acc[header.trim()] = values[i]?.trim();
            return acc;
          }, {});
        });
        this.setState({ menuItems: rows });
      }
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  render() {
    const { menuItems } = this.state;

    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          📷 Scan Menu QR Code
        </Typography>

        {/* QR Scanner */}
        <Box sx={{ width: '100%', maxWidth: 300, mb: 3 }}>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) this.handleScan(result);
              if (error) this.handleError(error);
            }}
            style={{ width: '100%' }}
          />
        </Box>

        {/* Menu Items */}
        {menuItems.length > 0 && (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {menuItems.map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    {/* If QR contains image URL */}
                    {/* {item.image && (
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: 80, objectFit: 'cover' }}
                        image={item.image}
                        alt={item.name || item.item}
                      />
                    )} */}
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.Name || item.item}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹ {item.Price}
                      </Typography>
                      {/* {item.qty && (
                        <Typography variant="caption" display="block">
                          Qty: {item.qty}
                        </Typography>
                      )} */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Box>
    );
  }
}
