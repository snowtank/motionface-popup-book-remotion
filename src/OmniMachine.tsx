import React from 'react';

const paper = '#c1b99b';
export const PromptSheet: React.FC<{crossed?: boolean; title?: string}> = ({crossed = false, title = '一句话提示词'}) => (
  <svg viewBox="0 0 450 270" width="450" height="270" style={{overflow: 'visible'}}>
    <path d="M8 5 441 11 445 260 3 265Z" fill="#eddfb8" stroke="#33291a" strokeWidth="3"/>
    <text x="28" y="43" fontSize="26" fill="#77613e">{title}</text>
    <path d="M24 57H420M24 204H420" stroke="#a18d65"/>
    <text x="28" y="148" fontSize="37" fill="#312719" letterSpacing="4">海边，女孩，电影感</text>
    {crossed && <g transform="translate(225 132) rotate(-12)" fill="none" stroke="#b72e23" strokeWidth="10"><ellipse rx="61" ry="47"/><path d="m-43-31 86 62"/></g>}
  </svg>
);

export const OmniMachine: React.FC<{time: number; miniature?: boolean}> = ({time, miniature = false}) => {
  const feed = Math.max(0, Math.min(1, (time - .5) / .9));
  const output = Math.max(0, Math.min(1, (time - 1.7) / .65));
  const crank = Math.sin(time * 9) * (time < 2.2 ? 14 : 0);
  return <svg viewBox="0 0 1000 800" width="100%" height="100%" style={{overflow:'visible'}}>
    <defs>
      <linearGradient id="box-front" x2="1" y2=".4"><stop stopColor="#c7bea1"/><stop offset="1" stopColor="#9b947d"/></linearGradient>
      <linearGradient id="box-top" y2="1"><stop stopColor="#d0c7aa"/><stop offset="1" stopColor="#bab29a"/></linearGradient>
    </defs>
    <path d="m124 635 600 79 200-108-133-87Z" fill="#160c04" opacity=".4"/>
    <path d="m720 248 80-128-19 439-79 123Z" fill="#827e6c" stroke="#544e3c" strokeWidth="2"/>
    <path d="M100 202 248 70 800 120 720 248Z" fill="url(#box-top)" stroke="#777460" strokeWidth="2"/>
    <path d="m100 202 620 46-18 434-590-62Z" fill="url(#box-front)" stroke="#8b836e" strokeWidth="2"/>
    <path d="m238 146 450 37 13-12-449-38Z" fill="#201b0f"/>
    <text x="330" y="192" transform="rotate(5 330 192)" fontSize="24" letterSpacing="7" fill="#423c28" fontFamily="Georgia,serif">PROMPT IN</text>
    {!miniature && time > .5 && time < 1.85 && <g transform={`translate(350 ${157 - Math.sin(feed * Math.PI) * 180}) rotate(5) scale(.7 .45)`}><PromptSheet title="提示词"/></g>}
    <g transform="matrix(1 .09 -.035 1 0 0)" fill="#262315" fontFamily="Georgia,serif">
      <text x="181" y="422" fontSize="133" letterSpacing="12" fontWeight="700">OMNI</text>
      <text x="222" y="486" fontSize="28" letterSpacing="6">AI VIDEO MODEL</text>
      <rect x="193" y="550" width="414" height="39" rx="6" fill="#15140b"/>
    </g>
    {[[125,230],[687,274],[137,596],[669,647]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="8" fill="#7d775f"/>)}
    <ellipse cx="772" cy="283" rx="14" ry="51" fill={paper} stroke="#302d23" strokeWidth="3"/>
    <path d="m770 282 8-23" stroke="#b73122" strokeWidth="4"/>
    <g transform={`rotate(${crank} 796 414)`}>
      <path d="m787 433 42 4 4-92 34 4" fill="none" stroke="#c79c2d" strokeWidth="14" strokeLinejoin="round"/>
      <path d="m851 348 42 4" stroke="#a53217" strokeWidth="23"/>
    </g>
    {!miniature && time < .5 && <g transform="translate(600 587) rotate(6) scale(.9)"><PromptSheet/></g>}
    {output > 0 && <g transform={`translate(259 ${674 + output * 34}) rotate(4) scale(.58 .34)`} opacity={output}><PromptSheet crossed={time > 2.8} title="生成结果"/></g>}
    {miniature && <g transform="translate(230 685) scale(.6 .35)"><PromptSheet crossed title="生成结果"/></g>}
    {miniature && <g transform="translate(260 535) rotate(5)"><path d="m-15-5 300 2-4 83-295-4Z" fill="#e9dfc5" stroke="#6f6751"/><text x="135" y="48" textAnchor="middle" fill="#3d3424" fontSize="35">平均水平</text></g>}
  </svg>;
};
