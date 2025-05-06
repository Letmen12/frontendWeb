// src/pages/QrModelPage.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'react-qr-code';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Download } from '@mui/icons-material';

export default function QrModelPage() {
  // read location.state.url, default to ''
  const { state } = useLocation();
  const url = state?.url ?? '';

  const [color, setColor] = useState('#000000');
  const [format, setFormat] = useState('png');

  const downloadQR = () => {
    const svg = document.getElementById('qr-gen');
    const svgData = new XMLSerializer().serializeToString(svg);

    if (format === 'svg') {
      const a = document.createElement('a');
      a.href = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
      a.download = 'qrcode.svg';
      a.click();
    } else {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const a = document.createElement('a');
        a.download = 'qrcode.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        QR Загварлах
      </Typography>

      {url ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  Өнгө сонгох
                </Typography>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  style={{ width: 40, height: 40, border: 'none' }}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Формат</InputLabel>
                  <Select
                    value={format}
                    label="Формат"
                    onChange={(e) => setFormat(e.target.value)}
                  >
                    <MenuItem value="png">PNG</MenuItem>
                    <MenuItem value="svg">SVG</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <QRCode
                id="qr-gen"
                value={url}
                size={200}
                fgColor={color}
              />
              <Typography sx={{ mt: 2 }}>Preview</Typography>
              <Button
                startIcon={<Download />}
                variant="contained"
                sx={{ mt: 2 }}
                onClick={downloadQR}
              >
                Татах
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography color="error">URL олдсонгүй. Буцах товчоор буцна уу.</Typography>
      )}
    </Box>
  );
}
