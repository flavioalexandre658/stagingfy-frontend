"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Logo({ width = 60, height = 80, customLogo = '', className = '' }) {
  const [logoSrc, setLogoSrc] = useState("/assets/images/icon/icon.svg");
  const router = useRouter();

  return (
    <div
      className={`w-full max-w-[14rem] max-h-[80px] my-2 ${className} cursor-pointer`}
      onClick={() => router.push('/')}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src={customLogo ? customLogo : logoSrc}
          alt={`${process.env.NEXT_PUBLIC_NAME_PROJECT}`}
          width={width}
          height={height}
          //onMouseEnter={() => setLogoSrc("/assets/images/logo/ChatAgentes-rifa-online-gratis-hover.svg")} // Altere para o SVG do hover
          onMouseLeave={() => setLogoSrc("/assets/images/icon/icon.svg")} // Retorna ao original
        />
      </div>
    </div>
  );
}
