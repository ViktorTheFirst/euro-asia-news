import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as MuiLink } from '@mui/material';
import { Facebook, Instagram, X, LinkedIn, YouTube } from '@mui/icons-material';

import LongNewsLogo from '../../public/assets/svgs/long-news-logo.png';
import footerStyles from '../../styles/footerStyles.module.css';

const Footer = () => {
  return (
    <footer className={footerStyles.footerContainer}>
      <div className={footerStyles.leftSide}>
        <div className={footerStyles.linksColumn}>
          <MuiLink
            component={Link}
            href='/'
            className={footerStyles.footerLink}
          >
            Home
          </MuiLink>
          <MuiLink
            component={Link}
            href='/'
            className={footerStyles.footerLink}
          >
            Advertisement board
          </MuiLink>
          <MuiLink
            component={Link}
            href='/'
            className={footerStyles.footerLink}
          >
            Hire Profesional
          </MuiLink>
        </div>
        <div className={footerStyles.mediaColumn}>
          <p className={footerStyles.footerLink}>Follow us:</p>
          <div className={footerStyles.socialGrid}>
            <Facebook color='secondary' />
            <Instagram color='secondary' />
            <X color='secondary' />
            <LinkedIn color='secondary' />
            <YouTube color='secondary' />
          </div>
        </div>
      </div>

      <div className={footerStyles.middle}>
        <MuiLink component={Link} href='/'>
          <Image
            className={footerStyles.footerLogo}
            src={LongNewsLogo}
            alt='long news logo'
            width={250}
            height={100}
          />
        </MuiLink>
        <p className={footerStyles.copyright}>
          Copyright © euro-asia-news 2024
        </p>
      </div>

      <div className={footerStyles.rightSide}>
        <MuiLink component={Link} href='/' className={footerStyles.footerLink}>
          Terms and conditions
        </MuiLink>
        <MuiLink component={Link} href='/' className={footerStyles.footerLink}>
          About Euro-asia-news
        </MuiLink>
        <MuiLink component={Link} href='/' className={footerStyles.footerLink}>
          Advertise with us
        </MuiLink>
        <MuiLink component={Link} href='/' className={footerStyles.footerLink}>
          Contact
        </MuiLink>
      </div>
    </footer>
  );
};

export default Footer;
