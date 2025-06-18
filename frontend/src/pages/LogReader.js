
import React, { useState, useCallback } from 'react';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useTheme } from '@mui/material/styles';

const COLUMNS = [
  { key: 'id', name: 'ID', width: 90, resizable: true },
  { key: 'scheduled', name: 'Scheduled', width: 130, resizable: true },
  { key: 'actual', name: 'Actual', width: 130, resizable: true },
  { key: 'name', name: 'Name', width: 130, resizable: true },
  { key: 'length', name: 'Length', width: 130, resizable: true },
  { key: 'category', name: 'Category', width: 130, resizable: true },
  { key: 'from', name: 'From', width: 130, resizable: true },
  { key: 'description', name: 'Description', width: 300, resizable: true }
];

function LogReader() {
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getRowClassName = useCallback((row) => {
    const cat = row.category?.toUpperCase() || '';
    const frm = row.from?.toUpperCase() || '';

    if (cat === 'MACRO' && frm === 'CLOCKS') return 'row-macro-clocks';
    if (frm === 'TRAFFIC') return 'row-traffic';
    if (cat === 'AUDIO' && frm === 'CLOCKS') return 'row-audio-clocks';
    if (cat === 'MACRO') return 'row-macro';
    if (cat === 'COMMENT') return 'row-comment';
    if (cat === '' && frm === 'MUSIC') return 'row-music';
    if (cat === 'VTRACK') return 'row-vtrack';
    return 'row-default';
  }, []);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.xml')) {
      alert('Please choose a .xml file');
      return;
    }

    setLoading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const xmlText = e.target.result;
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const items = xmlDoc.getElementsByTagName('TProgramLogItem');

      const rows = Array.from(items).map((item, index) => ({
        id: index,
        scheduled: item.getElementsByTagName('Scheduled')[0]?.textContent || '',
        actual: item.getElementsByTagName('Actual')[0]?.textContent || '',
        name: item.getElementsByTagName('Name')[0]?.textContent || '',
        length: item.getElementsByTagName('Length')[0]?.textContent || '',
        category: item.getElementsByTagName('Category')[0]?.textContent || '',
        from: item.getElementsByTagName('From')[0]?.textContent || '',
        description: item.getElementsByTagName('Description')[0]?.textContent || '',
      }));

      setLogData(rows);
      setLoading(false);
    };

    reader.readAsText(file);
  }, []);

  return (
    <div style={{
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
      padding: 8,
    }}>
      <div>
        <input
          type="file"
          accept=".xml"
          onChange={handleFileUpload}
          style={{
            padding: '8px',
            border: `1px solid ${isDarkMode ? theme.palette.divider : '#ccc'}`,
            borderRadius: '4px',
            marginBottom: '4px',
            backgroundColor: isDarkMode ? theme.palette.background.paper : undefined,
            color: isDarkMode ? theme.palette.text.primary : undefined,
          }}
        />
      </div>

      {loading && <div>Loading...</div>}

      {logData.length === 0 && !loading ? (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          background: isDarkMode ? theme.palette.background.paper : '#f5f5f5',
          borderRadius: '4px',
          color: isDarkMode ? theme.palette.text.primary : undefined,
        }}>
          Please upload a .xml file to view its contents
        </div>
      ) : (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <DataGrid
            columns={COLUMNS}
            rows={logData}
            rowClass={getRowClassName}
            defaultColumnOptions={{ resizable: true, sortable: true }}
            className={isDarkMode ? "rdg-dark" : "rdg-light"}
            style={{ height: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default LogReader;