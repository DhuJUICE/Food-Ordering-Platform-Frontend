import React from 'react';
import FooterUI from '../ui/Footer';

const Footer = () => {
  return (
    <FooterUI
      leftText={`© ${new Date().getFullYear()} FastFoods. All Rights Reserved.`}
      rightText="Developed by - Rowslim Technologies"
    />
  );
};

export default Footer;