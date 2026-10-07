import {useId} from 'react';

const cream = '#eee1b7';
const ink = '#302b21';
const clamp = (value: number) => Math.max(0, Math.min(1, value));

const LittleGirl = ({x = 0, y = 0, scale = 1}: {x?: number; y?: number; scale?: number}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-6 24v15h5l2-15M3 24v15h5l2-15" fill="#203e43" />
    <path d="M-7 38h7v5h-9zM4 38h7v5H3z" fill="#ad3728" />
    <path d="M-9 2Q-14 3-13 14l2 13h22l2-13Q14 3 8 2z" fill="#e6b52e" stroke="#887329" strokeWidth="1.5" />
    <path d="M-8-13Q-17-7-12 5h24Q17-9 6-14Z" fill="#232824" />
    <path d="M-8-8H8V4Q0 12-8 3Z" fill="#e8c69b" />
    <path d="M-10 7h20v4h-20" fill="#b83223" />
    <circle cx="-4" cy="-1" r=".9" fill="#342719" /><circle cx="4" cy="-1" r=".9" fill="#342719" />
  </g>
);

const Ship = ({line = false}: {line?: boolean}) => (
  <g fill={line ? 'none' : '#201e18'} stroke={line ? '#81795f' : '#201e18'} strokeWidth={line ? 1.2 : 1}>
    <path d="M129 120h82l-10 12h-61z" />
    <path d="M147 120v-9h48v9M157 111V96h8v15M175 111v-11h8v11M191 111v-8h7v8" />
    {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={145 - i * 9} cy={98 - i * 6} r={4 + i * 1.5} />)}
  </g>
);

const LineScene = ({index}: {index: number}) => (
  <g stroke="#89816c" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    {index < 3 && <>
      <path d="M0 126Q48 119 86 128T180 128T256 129M0 149Q56 137 113 153T256 156" />
      {Array.from({length: 16}, (_, n) => <path key={n} d={`M${8 + (n % 8) * 32} ${131 + Math.floor(n / 8) * 11}q7-3 14 0`} />)}
      <circle cx="211" cy="40" r="13" fill="#e8d798" />
    </>}
    {index === 0 && <>
      <path d="M0 145L256 175M22 137V29h5v108M20 29h9v-9h-9z" />
      <path d="M21 20h7v8h-7z" fill="#d4b246" />
      <Ship line />
    </>}
    {index === 1 && <>
      <path d="M6 126v-22h45v22M0 105l30-16 29 16M26 90V71m-9 5h18m-17 5h16M23 113h9v9h-9" />
      <path d="M167 100q10-34 39-52M174 100q9-29 33-44M205 47l7-20 12 3-6 22zM205 47l-7 5 3-12M219 50l3 7 4-15" />
      <LittleGirl x={77} y={121} scale={0.5} />
    </>}
    {index === 2 && <>
      {[20, 30, 39, 53, 29, 46, 34, 26].map((height, n) => <g key={n}>
        <rect x={123 + n * 16} y={121 - height} width="12" height={height} />
        {Array.from({length: Math.floor(height / 8)}, (_, row) => <path key={row} d={`M${126 + n * 16} ${126 - height + row * 7}h1m4 0h1`} />)}
      </g>)}
      <LittleGirl x={75} y={127} scale={0.45} />
    </>}
  </g>
);

const ColorScene = ({index, id}: {index: number; id: string}) => {
  if (index === 0) return <>
    <rect width="256" height="177" fill={`url(#${id}-sunset)`} />
    <circle cx="212" cy="40" r="13" fill="#f8df9c" />
    <path d="M0 113L256 127v50H0" fill="#26251e" />
    <path d="M0 118L256 140v37H0" fill="#211f1a" />
    <Ship />
    <path d="M22 137V29h5v108M20 29h9v-9h-9z" fill="#24251e" />
    {[0, 1, 2, 3, 4].map((n) => <path key={n} d={`M135 ${137 + n * 5}h${67 - n * 7}`} stroke="#ba8b43" strokeWidth="1" opacity=".65" />)}
    <path d="M0 146Q40 137 84 147T166 152" fill="none" stroke="#68604a" strokeWidth="1" />
  </>;
  if (index === 1) return <>
    <rect width="256" height="177" fill="#4fa6a2" />
    <rect width="256" height="177" fill={`url(#${id}-dots)`} opacity=".42" />
    <path d="M0 105Q82 110 154 104T256 106v71H0z" fill="#196291" />
    <path d="M0 148l256-7v36H0z" fill="#e8b82f" />
    {Array.from({length: 19}, (_, n) => <path key={n} d={`M${6 + (n % 7) * 36} ${117 + Math.floor(n / 7) * 10}q6-3 13 0`} fill="none" stroke="#183a4e" strokeWidth="1.7" />)}
    <path d="M6 137v-28h44v27z" fill="#eee2ba" stroke="#3b4c43" strokeWidth="1.2" />
    <path d="M0 110l29-15 29 15z" fill="#dfdab1" stroke="#3b4c43" strokeWidth="1.2" />
    <path d="M26 96V79m-9 5h18m-16 5h15" fill="none" stroke="#345346" strokeWidth="1.2" />
    <rect x="22" y="118" width="10" height="8" fill="#e4bc2a" stroke="#6d7042" />
    <path d="M164 108q11-34 41-54M172 108q10-30 36-49" fill="none" stroke="#eee1b7" strokeWidth="5" />
    <g transform="translate(211 46) rotate(24)">
      <path d="M-6 11V-10l6-9 6 9v21z" fill="#eee1b7" stroke="#384d45" strokeWidth="1.5" />
      <path d="M0-19q19 5 14 19Q9 11 1 9" fill="#b32e26" stroke="#384d45" strokeWidth="1.5" />
      <path d="M-6 5l-7 8 7-2M6 5l7 8-7-2" fill="#eee1b7" stroke="#384d45" strokeWidth="1.5" />
    </g>
    <LittleGirl x={77} y={129} scale={0.57} />
  </>;
  if (index === 2) return <>
    <rect width="256" height="177" fill="#507ead" />
    <path d="M0 104h256v73H0z" fill="#006995" />
    <path d="M0 145l256 7v25H0z" fill="#e5b12d" />
    <path d="M198 42h16v-6h10v6h7v16h-7v6h-17v-6h-9z" fill="#e8d8a1" />
    {[24, 35, 28, 48, 31, 39, 26, 22].map((height, n) => <g key={n}>
      <rect x={126 + n * 16} y={108 - height} width="12" height={height} fill={n % 2 ? '#e4be91' : '#eed9b1'} />
      {Array.from({length: Math.floor(height / 8)}, (_, row) => <path key={row} d={`M${128 + n * 16} ${112 - height + row * 7}h3m3 0h3`} stroke={n % 2 ? '#db805f' : '#cba071'} strokeWidth="2" />)}
    </g>)}
    {Array.from({length: 36}, (_, n) => <path key={n} d={`M${6 + (n % 12) * 22} ${114 + Math.floor(n / 12) * 11}h6m4 0h4`} stroke={n % 3 ? '#35a5ad' : '#a5c49d'} strokeWidth="2" />)}
    <g shapeRendering="crispEdges" transform="translate(72 129)">
      <path d="M-4-8h8v4h4v8H-8v-8h4z" fill="#252e27" /><path d="M-4-4h8v8h-8z" fill="#ead4a9" />
      <path d="M-7 5H7v16H-7zM-11 8h4v10h-4M7 8h4v10H7" fill="#ebc02c" />
      <path d="M-6 21h4v10h-4M2 21h4v10H2" fill="#253e47" /><path d="M-7 29h5v4h-5M2 29h5v4H2" fill="#d64e30" />
    </g>
  </>;
  return <>
    <rect width="256" height="177" fill="#160e25" />
    <path d="M0 111l256-6v72H0z" fill="#122d2c" />
    <path d="M0 164l256-7v20H0z" fill="#9b7140" />
    <circle cx="221" cy="37" r="13" fill="none" stroke="#bb346f" strokeWidth="2" />
    <circle cx="221" cy="37" r="18" fill="none" stroke="#6c254f" strokeWidth="1" />
    <path d="M15 35h31l8-4H22zm8-8h33m-21 15h11" fill="none" stroke="#b63477" strokeWidth="2" />
    <path d="M6 118h118m-69-7h51v6M9 121h112" fill="none" stroke="#47c5ad" strokeWidth="2" />
    {[150, 191, 232].map((x, n) => <g key={x} stroke="#3dc2ab" strokeWidth="1.8" fill="none">
      <path d={`M${x - 4} 136l4-${65 + n * 6} 4 ${65 + n * 6}zM${x - 8} 137h16`} />
      <path d={`M${x} ${71 - n * 6}l-18 10m18-10 6-23m-6 23 14 14`} />
      <ellipse cx={x} cy="141" rx="10" ry="2" />
    </g>)}
    {Array.from({length: 21}, (_, n) => <path key={n} d={`M${5 + (n % 7) * 37} ${132 + Math.floor(n / 7) * 10}q6-4 14-1`} fill="none" stroke={n % 3 ? '#1c847b' : '#3cb99b'} strokeWidth="1.5" />)}
    <g opacity=".9"><LittleGirl x={77} y={142} scale={0.47} /></g>
    <path d="M70 137h14v17H70z" fill="none" stroke="#d960ab" strokeWidth="1" />
  </>;
};

/** Four hand-cut accordion frames; both progress values are normalized to 0–1. */
export const FilmStrip = ({colorProgress, styleProgress}: {colorProgress: number; styleProgress: number}) => {
  const id = useId().replace(/:/g, '');
  return <svg viewBox="0 0 1160 330" width="100%" height="100%" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id={`${id}-sunset`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d88e43" /><stop offset="1" stopColor="#b95328" /></linearGradient>
      <linearGradient id={`${id}-fold`}><stop stopColor="#786644" stopOpacity=".18" /><stop offset=".08" stopColor="#fff7da" stopOpacity=".03" /><stop offset=".9" stopColor="#fff7da" stopOpacity="0" /><stop offset="1" stopColor="#716044" stopOpacity=".2" /></linearGradient>
      <pattern id={`${id}-dots`} width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#183c42" /></pattern>
      <pattern id={`${id}-paper`} width="29" height="23" patternUnits="userSpaceOnUse"><path d="M1 5h1m12 7h1m9-10h.7M7 19h.8m19 1h1" stroke="#7b6e4d" strokeOpacity=".14" strokeWidth=".7" /></pattern>
      <filter id={`${id}-shadow`} x="-10%" y="-20%" width="130%" height="150%"><feDropShadow dx="5" dy="7" stdDeviation="4" floodColor="#352a19" floodOpacity=".25" /></filter>
      {[0, 1, 2, 3].map((n) => <clipPath id={`${id}-scene-${n}`} key={n}><rect width="256" height="177" /></clipPath>)}
    </defs>
    <g filter={`url(#${id}-shadow)`}>
      {[1925, 1965, 1995, 2035].map((year, n) => {
        const color = clamp(colorProgress * 1.32 - n * .105);
        const style = clamp(styleProgress * 1.4 - n * .12);
        return <g key={year} transform={`matrix(1 ${n % 2 ? -.065 : .065} 0 1 ${5 + n * 287} ${n % 2 ? 49 : 30})`}>
          <path d="M0 0l287 1v270l-287-2z" fill={cream} />
          <path d="M0 0l287 1v270l-287-2z" fill={`url(#${id}-paper)`} />
          {Array.from({length: 12}, (_, hole) => <g key={hole}>
            <rect x={10 + hole * 23.5} y="9" width="11" height="7" rx="1.4" fill={hole % 3 === 0 ? '#274f47' : '#558377'} />
            <rect x={10 + hole * 23.5} y="252" width="11" height="7" rx="1.4" fill="#aaa28b" />
          </g>)}
          <text x="15" y="43" fill={ink} fontSize="22" fontFamily="BookSerif, Noto Serif SC, Songti SC, STSong, serif" fontWeight="700">镜头 {n + 1}</text>
          <text x="270" y="45" fill="#b4422f" fontSize="37" fontFamily="Georgia, serif" textAnchor="end">{year}</text>
          <g transform="translate(15 58)" clipPath={`url(#${id}-scene-${n})`}>
            <rect width="256" height="177" fill="#e6dab3" />
            <g opacity={1 - color}><LineScene index={n} /></g>
            <g opacity={color}><ColorScene index={n} id={id} /></g>
          </g>
          <rect x="15" y="58" width="256" height="177" fill="none" stroke="#756d54" strokeWidth="1.35" />
          <path d="M0 0l287 1v270l-287-2z" fill={`url(#${id}-fold)`} />
          <path d="M286 2v267" stroke="#b2a481" strokeWidth="1.6" opacity=".7" />
          <g opacity={style} transform={`translate(72 ${-23 + (1 - style) * 20})`}>
            <path d="M0 0l139 1-1 34H1z" fill="#214e7e" />
            <path d="M0 0l139 1v3H0z" fill="#32608b" />
            <text x="69" y="25" textAnchor="middle" fill="#eadcaf" fontSize="23" fontWeight="700" fontFamily="BookSerif, Noto Serif SC, Songti SC, STSong, serif">{['剪影', '网点', '像素', '霓虹'][n]}</text>
          </g>
        </g>;
      })}
    </g>
  </svg>;
};

export type PaperPropKind = 'train' | 'rocket' | 'computer' | 'drone' | 'girl' | 'gramophone';

/** Small freestanding pieces in the pop-up book. `time` is elapsed seconds. */
export const PaperProp = ({kind, time}: {kind: PaperPropKind; time: number}) => {
  const id = useId().replace(/:/g, '');
  const bob = Math.sin(time * 2.4) * 1.2;
  return <svg viewBox="0 0 160 180" preserveAspectRatio="none" width="100%" height="100%" overflow="visible" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id={`${id}-drop`} x="-50%" y="-30%" width="230%" height="180%"><feDropShadow dx="4" dy="5" stdDeviation="2" floodColor="#332c20" floodOpacity=".33" /></filter>
      <linearGradient id={`${id}-horn`}><stop stopColor="#5d195c" /><stop offset=".5" stopColor="#8c247f" /><stop offset="1" stopColor="#461544" /></linearGradient>
    </defs>
    <g filter={`url(#${id}-drop)`} stroke={cream} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round">
      {kind === 'train' && <g transform={`translate(0 ${bob * .2})`}>
        <path d="M15 120V85h13V63h19v29h55V68h37v54H15z" fill="#211f19" />
        <path d="M16 120h128v11H16z" fill="#b72e22" /><path d="M30 70h14v21H30z" fill="#b73624" strokeWidth="2" />
        <path d="M29 58q-13-3-10-14 3-10 13-10 4-16 17-11 9-10 21-2 15-4 18 8 2 12-11 15H50q-2 12-21 14z" fill="#d9d2b6" strokeWidth="3" />
        <path d="M23 104h88" stroke="#d8b147" strokeWidth="7" />
        <rect x="111" y="77" width="18" height="18" fill="#e5c96f" strokeWidth="2" />
        {[37, 65, 93, 121].map((x) => <circle key={x} cx={x} cy="140" r="14" fill="#22231d" strokeWidth="4" />)}
        <path d="M13 131h134" stroke="#c2b38f" strokeWidth="2" />
      </g>}
      {kind === 'rocket' && <g transform={`translate(0 ${bob})`}>
        <path d="M80 9l25 46v81l-25 32-25-32V55z" fill="#e7ddbe" />
        <path d="M80 9l25 46H55z" fill="#b92e23" strokeWidth="3" />
        <path d="M55 103l-20 42 20-7M105 103l20 42-20-7" fill="#b33429" strokeWidth="4" />
        <path d="M63 137h34l-17 31z" fill="#d69233" strokeWidth="3" />
        <circle cx="80" cy="75" r="13" fill="#1f4d80" strokeWidth="3" />
        <path d="M61 59v55" stroke="#f7edcc" strokeWidth="2" />
      </g>}
      {kind === 'computer' && <g>
        <rect x="24" y="30" width="111" height="105" rx="8" fill="#d8ceb0" />
        <path d="M32 39h95v82H32z" fill="#c4bea2" strokeWidth="2" />
        <rect x="39" y="46" width="81" height="67" rx="8" fill="#112d16" strokeWidth="3" />
        <g stroke="#5bc251" strokeWidth="4"><path d="M48 58h39M48 70h53M48 82h28" /><path d="M48 93h9" opacity={Math.sin(time * 6) > 0 ? 1 : .15} /></g>
        <path d="M62 135v10h37v-10" fill="#d0c5a7" strokeWidth="3" />
        <path d="M18 145h124l4 22H14z" fill="#d9cfb0" strokeWidth="4" />
        {Array.from({length: 10}, (_, n) => <path key={n} d={`M${25 + n * 10} 153h5`} stroke="#9a9279" strokeWidth="3" />)}
        <path d="M54 160h54" stroke="#aaa086" strokeWidth="3" />
      </g>}
      {kind === 'girl' && <g transform={`translate(0 ${bob * .25})`}>
        <path d="M55 127l-4 32h15l7-32M85 127l-1 32h15l2-32" fill="#213a3e" strokeWidth="4" />
        <path d="M51 158h17v13H48q-4-4 3-13M85 158h17v13H82q-3-5 3-13" fill="#b43325" strokeWidth="4" />
        <path d="M53 58Q37 58 38 82l3 50h69l7-50q0-24-17-24z" fill="#ddb12a" strokeWidth="4" />
        <path d="M50 20Q30 36 36 60l76 1q8-36-16-45Q68 0 50 20z" fill="#20241e" strokeWidth="4" />
        <path d="M49 32h50v26Q75 82 49 58z" fill="#e9cea6" strokeWidth="2" />
        <path d="M47 64h56v11H47z" fill="#b53524" strokeWidth="1" />
        <circle cx="61" cy="46" r="1.8" fill="#3b2d20" stroke="none" /><circle cx="87" cy="46" r="1.8" fill="#3b2d20" stroke="none" />
        <path d="M73 53h4" stroke="#b1694c" strokeWidth="1.6" />
        <circle cx="75" cy="88" r="1.4" fill="#7b712a" stroke="none" /><circle cx="75" cy="109" r="1.4" fill="#7b712a" stroke="none" />
        <path d="M49 83l-2 43m57-43-3 43" fill="none" stroke="#c69724" strokeWidth="2" />
      </g>}
      {kind === 'drone' && <g transform={`translate(0 ${bob})`}>
        <path d="M78 80v82l-6 5V80z" fill="#d2c8a8" strokeWidth="3" />
        <path d="M46 68h64l-8 23H56z" fill="#c9c9a8" strokeWidth="4" />
        <path d="M29 72l32 7m39 0 34-7" fill="none" strokeWidth="8" />
        <ellipse cx="27" cy="68" rx="24" ry="7" fill="#49bfae" strokeWidth="3" /><ellipse cx="133" cy="68" rx="24" ry="7" fill="#49bfae" strokeWidth="3" />
        <path d="M59 90l-7 10m49-10 8 10" stroke="#455c55" strokeWidth="3" />
        <circle cx="80" cy="83" r="4" fill="#bf3829" strokeWidth="1" />
        <path d="M8 66h39m68 0h37" stroke="#8ad1ba" strokeWidth="1.6" />
      </g>}
      {kind === 'gramophone' && <g>
        <path d="M31 145h75v22H31z" fill="#4b341b" strokeWidth="2" />
        <path d="M40 134h61l5 11H31z" fill="#7c572b" strokeWidth="2" />
        <path d="M57 142V95q0-15 20-16" fill="none" stroke="#aa8b3b" strokeWidth="9" />
        <path d="M63 94L38 39q38-13 70 10 36 30-1 53-17 10-44-8z" fill={`url(#${id}-horn)`} strokeWidth="3" />
        <path d="M38 39Q71 75 63 94" fill="none" stroke="#a63b96" strokeWidth="2" />
        <path d="M54 49q47-1 55 28-3 19-37 20" fill="none" stroke="#672064" strokeWidth="2" />
        <g fill="none" stroke="#d8bbcf" strokeWidth="2" opacity=".85">
          {Array.from({length: 16}, (_, n) => {const height = 5 + Math.abs(Math.sin(n * 1.73 + time * 4)) * 14; return <path key={n} d={`M${7 + n * 9} ${22 - height / 2}v${height}`} />;})}
        </g>
      </g>}
    </g>
  </svg>;
};
