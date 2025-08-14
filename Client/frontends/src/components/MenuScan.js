import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuScan extends Component {
  render() {
    const items = [
      { name: 'Margherita Pizza', price: '$10' },
      { name: 'Paneer Tikka', price: '$8' },
      { name: 'Masala Dosa', price: '$6' },
      { name: 'Butter Chicken', price: '$12' }
    ];

    return (
      <><div className="menu-page">
            <h1>🍽️ Scan & View Menu</h1>
            <p>Welcome! Here's our delicious menu.</p>
            <ul className="menu-list">
                {items.map((item, idx) => (
                    <li key={idx} className="menu-item">
                        <span>{item.name}</span>
                        <span>{item.price}</span>
                    </li>
                ))}
            </ul>
        </div><Link to="/scan">
                <button style={{ marginTop: '20px' }}>📷 Scan QR</button>
            </Link></>
    );
  }
}

export default MenuScan;
