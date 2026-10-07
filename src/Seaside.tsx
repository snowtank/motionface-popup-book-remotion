import React from 'react';

/** The cut-paper theatre printed on the upright page of the book. */
export const Seaside: React.FC<{time: number}> = ({time}) => {
  const sweep = Math.sin(time * 0.64 + 0.75);
  const beamEnd = 1050 + sweep * 1060;
  const beamWidth = 12 + Math.abs(sweep) * 78;
  const houses = [
    {x: 35, y: 275, w: 50, h: 68, roof: '#b93621', tip: 254},
    {x: 92, y: 289, w: 42, h: 54, roof: '#d5a528', tip: 265},
    {x: 140, y: 266, w: 58, h: 77, roof: '#258071', tip: 242},
    {x: 204, y: 283, w: 49, h: 60, roof: '#b93621', tip: 259},
    {x: 259, y: 291, w: 66, h: 52, roof: '#742268', tip: 267},
    {x: 331, y: 280, w: 48, h: 63, roof: '#d3a12e', tip: 253},
  ];
  const stars = Array.from({length: 92}, (_, i) => ({
    x: 21 + ((i * 137 + (i % 7) * 31) % 1160),
    y: 15 + ((i * 83 + (i % 11) * 17) % 222),
    r: i % 9 === 0 ? 1.6 : i % 3 === 0 ? 1.1 : 0.8,
    opacity: 0.26 + (i % 6) * 0.085,
  }));

  return (
    <svg width="100%" height="100%" viewBox="0 0 1200 510" xmlns="http://www.w3.org/2000/svg" style={{display: 'block', overflow: 'hidden'}}>
      <defs>
        <linearGradient id="seaside-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c3b37" />
          <stop offset="0.67" stopColor="#176454" />
          <stop offset="0.91" stopColor="#8b9060" />
          <stop offset="1" stopColor="#c3a36a" />
        </linearGradient>
        <linearGradient id="seaside-sea" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#0c4546" />
          <stop offset="1" stopColor="#0b393b" />
        </linearGradient>
        <linearGradient id="seaside-moon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e1ce96" />
          <stop offset="1" stopColor="#eddaa4" />
        </linearGradient>
        <linearGradient id="seaside-beam" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#ffeb95" stopOpacity="0.1" />
          <stop offset="0.48" stopColor="#f9dc84" stopOpacity="0.64" />
          <stop offset="1" stopColor="#fff1a7" stopOpacity="0.1" />
        </linearGradient>
        <filter id="seaside-shadow" x="-20%" y="-20%" width="145%" height="150%">
          <feDropShadow dx="3" dy="5" stdDeviation="2" floodColor="#122a25" floodOpacity="0.37" />
        </filter>
        <filter id="seaside-paper" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.67" numOctaves="2" stitchTiles="stitch" seed="13" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.14 0 0 0 0 0.12 0 0 0 0 0.08 0 0 0 0.19 0" />
        </filter>
        <clipPath id="seaside-tower-cut"><path d="M1025 111 L1070 111 L1080 282 L1013 282 Z" /></clipPath>
      </defs>

      <rect width="1200" height="330" fill="url(#seaside-sky)" />
      <path d="M0 0 H1200 V18 L0 10Z" fill="#032d2c" opacity="0.28" />
      {stars.map((star, i) => <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#e9dbaa" opacity={star.opacity} />)}
      <g filter="url(#seaside-shadow)">
        <circle cx="290" cy="137" r="99" fill="url(#seaside-moon)" />
        <path d="M230 65 A99 99 0 0 1 379 174 A99 99 0 0 0 230 65" fill="#fff2b9" opacity="0.14" />
        <circle cx="258" cy="119" r="19" fill="#c6b783" opacity="0.33" />
        <circle cx="305" cy="106" r="9" fill="#c7b683" opacity="0.3" />
        <circle cx="324" cy="170" r="13" fill="#c5b581" opacity="0.28" />
        <circle cx="256" cy="180" r="10" fill="#c7b782" opacity="0.26" />
      </g>

      <path d="M0 280 L101 247 L155 264 L220 246 L273 231 L377 278 L487 251 L590 292 L696 265 L797 305 L884 278 L956 305 L1049 273 L1200 301 V365 H0Z" fill="#547e73" />
      <path d="M0 302 L117 282 L184 314 L282 277 L399 320 L512 292 L611 328 L664 318 L685 343 L811 331 L919 315 L1030 329 L1200 302 V374 H0Z" fill="#2b6257" />
      <path d="M0 332 L100 307 L191 335 L303 305 L400 332 L492 313 L579 346 L676 333 L707 359 L829 341 L942 355 L1200 327 V389 H0Z" fill="#245649" opacity="0.56" />

      <rect y="343" width="1200" height="167" fill="url(#seaside-sea)" />
      <path d="M0 344 H1200" stroke="#133d3c" strokeWidth="3" opacity="0.6" />

      <g filter="url(#seaside-shadow)">
        {houses.map((house, i) => (
          <g key={house.x}>
            <rect x={house.x} y={house.y} width={house.w} height={house.h} fill={i % 2 === 0 ? '#e8d7a8' : '#efdfb3'} />
            <path d={`M${house.x - 5} ${house.y + 1} L${house.x + house.w / 2} ${house.tip} L${house.x + house.w + 4} ${house.y + 1}Z`} fill={house.roof} />
            <path d={`M${house.x + house.w - 5} ${house.y + 2} V342 H${house.x + house.w}`} fill="#a69a74" opacity="0.22" />
            {Array.from({length: i === 2 ? 4 : 3}, (_, row) => (
              <g key={row}>
                {[0, 1, ...(house.w > 55 ? [2] : [])].map((column) => <rect key={column} x={house.x + 10 + column * 15} y={house.y + 11 + row * 16} width="6.5" height="8" fill="#e9bb52" opacity="0.76" />)}
              </g>
            ))}
          </g>
        ))}
      </g>

      <g fill="none" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${285 - (i % 3) * 8} ${352 + i * 10} H${349 + (i % 2) * 7}`} stroke="#d8cb8f" strokeWidth={i % 2 === 0 ? 3 : 2.4} opacity={0.71 - i * 0.035} />
        ))}
        {Array.from({length: 24}, (_, i) => {
          const x = 110 + ((i * 163) % 800);
          const y = 360 + ((i * 29) % 112);
          const w = 30 + ((i * 17) % 71);
          return <path key={i} d={`M${x} ${y} Q${x + w * 0.48} ${y - 4} ${x + w} ${y - 1}`} stroke={i % 4 === 0 ? '#81a598' : '#538880'} opacity="0.37" strokeWidth={i % 5 === 0 ? 2.7 : 1.8} />;
        })}
      </g>

      <g filter="url(#seaside-shadow)">
        <path d="M882 345 L925 301 L976 284 L1021 283 L1080 292 L1153 279 L1200 277 V510 H882Z" fill="#322c20" />
        <path d="M889 335 L924 303 L976 283 L1023 282 L1084 291 L1152 279 L1200 275 V291 L1151 295 L1085 307 L1024 298 L978 299 L934 314 L897 348Z" fill="#607b29" />
        <path d="M934 304 L977 288 L1023 287 L1084 296 L1152 285 L1200 282" fill="none" stroke="#83923e" strokeWidth="3" opacity="0.65" />
        <path d="M902 359 L927 343 L921 410 L908 429Z" fill="#443827" opacity="0.32" />
        <path d="M1079 321 L1066 361 L1070 410 L1054 450" fill="none" stroke="#171e18" strokeWidth="2" opacity="0.22" />
      </g>

      <g filter="url(#seaside-shadow)">
        <path d="M1025 111 L1070 111 L1080 282 L1013 282 Z" fill="#eddfb2" />
        <g clipPath="url(#seaside-tower-cut)" fill="#bd3522">
          <rect x="1007" y="131" width="83" height="25" />
          <rect x="1007" y="182" width="83" height="25" />
          <rect x="1007" y="233" width="83" height="25" />
        </g>
        <path d="M1064 112 L1070 112 L1080 282 H1071Z" fill="#837044" opacity="0.24" />
        <rect x="1021" y="77" width="53" height="38" fill="#e9bc4c" />
        <rect x="1024" y="79" width="6" height="33" fill="#a78c3b" />
        <rect x="1065" y="80" width="6" height="33" fill="#a78c3b" />
        <path d="M1014 79 L1048 53 L1082 79Z" fill="#ae3120" />
        <path d="M1017 113 H1078 V119 H1017Z" fill="#28352b" />
        <circle cx="1048" cy="96" r="12" fill="#f8df91" opacity="0.78" />
      </g>
      <path d={`M1048 87 L${beamEnd} ${96 - beamWidth} L${beamEnd} ${96 + beamWidth} L1048 106Z`} fill="url(#seaside-beam)" opacity={0.38 + Math.abs(sweep) * 0.24} />
      <circle cx="1048" cy="96" r="9" fill="#fff0b1" opacity="0.38" />

      <path d="M0 457 Q44 413 88 451 Q130 478 172 451 Q218 414 265 448 Q308 475 355 444 Q401 415 446 450 Q484 473 530 448 Q576 417 622 450 Q668 479 716 450 Q758 422 804 451 Q851 476 895 449 Q941 426 986 457 Q1032 483 1078 450 Q1126 415 1172 453 L1200 467 V510 H0Z" fill="#2d8d79" />
      <path d="M0 457 Q44 413 88 451 M172 451 Q218 414 265 448 M355 444 Q401 415 446 450 M530 448 Q576 417 622 450 M716 450 Q758 422 804 451 M895 449 Q941 426 986 457 M1078 450 Q1126 415 1172 453" fill="none" stroke="#b6cc9a" strokeWidth="6" opacity="0.85" />
      <path d="M0 491 L80 485 L180 493 L280 488 L365 493 L470 487 L582 492 L680 487 L802 495 L910 487 L1010 492 L1100 485 L1200 489 V510 H0Z" fill="#cfad69" />
      <g fill="none" stroke="#61852d" strokeWidth="4" strokeLinecap="round">
        <path d="M43 508 L28 482 M43 508 L38 479 M43 508 L49 485 M66 510 L57 489 M66 510 L70 482 M1123 508 L1116 481 M1123 508 L1132 480 M1123 508 L1144 489 M1154 508 L1160 486" />
      </g>
      <rect width="1200" height="510" filter="url(#seaside-paper)" opacity="0.35" style={{mixBlendMode: 'multiply'}} />
    </svg>
  );
};
