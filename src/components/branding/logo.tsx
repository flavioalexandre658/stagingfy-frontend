"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import classes from './logo.module.css'

export default function Logo({ width = 40, height = 80, customLogo = '', className = '', maxWidth = true, showIconOnly = false }) {
  const [logoSrc, setLogoSrc] = useState("/assets/images/icon/icon.svg");
  const router = useRouter();

  return (
    <div
      className={`${className} logoImg ${maxWidth ? classes.logoImg : ''} cursor-pointer`}
      style={{ display: 'flex', alignItems: 'center', gap: showIconOnly ? '0' : '10px' }}
      onClick={() => router.push('/')}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={customLogo ? customLogo : logoSrc}
          alt={`${process.env.NEXT_PUBLIC_NAME_PROJECT} Icon`}
          width={!showIconOnly ? width : width / 1.5}
          className='rounded-md'
          height={height}
          onMouseEnter={() => setLogoSrc("/assets/images/icon/icon.svg")}
          onMouseLeave={() => setLogoSrc("/assets/images/icon/icon.svg")}
        />
        {!showIconOnly && (
          <span
            className={className}
            style={{
              marginLeft: '5px',
              fontFamily: "'Inter', sans-serif",
              fontSize: `20px`,
              fontWeight: 'bold',
              color: 'inherit',
              textTransform: 'capitalize'
            }}
          >
            {process.env.NEXT_PUBLIC_NAME_PROJECT || 'Stagingfy'}
          </span>
        )}
      </div>
    </div>
  );
}