import React from 'react';
import { colorPalette } from '../../components/common/colorPalette';

const CalendarExample: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {colorPalette.map((color) => {
        return (
          <div
            key={color.name}
            style={{
              backgroundColor: color.color,
              color: 'white',
              width: '200px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              fontSize: '16px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            {color.name}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarExample;