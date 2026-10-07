import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, continueRender, delayRender, Easing, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Seaside} from './Seaside';
import {FilmStrip, PaperProp} from './StoryPieces';
import {OmniMachine} from './OmniMachine';

const serif = 'BookSerif, "Songti SC", "Noto Serif CJK SC", serif';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const ease = Easing.bezier(.22, .8, .25, 1);
const progress = (t:number, start:number, duration = .65) => interpolate(t, [start, start+duration], [0, 1], {...clamp, easing: ease});
const paper = '#e9ddbd';
const colors = ['#35836a','#d49b30','#ba382a','#264e84','#713258'];
const labels = ['世界观·故事','时间跨度','时代背景','画面风格','节奏·声音'];
const LabelIcon: React.FC<{index:number}> = ({index}) => <svg width="35" height="42" viewBox="0 0 40 46" fill="none" stroke="currentColor" strokeWidth="2.1">
  {index===0&&<><ellipse cx="20" cy="23" rx="16" ry="19"/><ellipse cx="20" cy="23" rx="7" ry="19"/><path d="M5 16h30M4 25h32M7 34h26"/></>}
  {index===1&&<><path d="M6 4h28L9 42h22L6 4Zm0 38L34 4"/><path d="m15 32 5-8 5 8"/></>}
  {index===2&&<><rect x="3" y="7" width="34" height="33" rx="3"/><path d="M3 17h34M12 22v3m8-3v3m8-3v3m-16 6v3m8-3v3m8-3v3"/></>}
  {index===3&&<><path d="m5 7 5-3 25 31-8 5L5 7Z"/><path d="m27 40 10 4-2-9M9 9l23 28"/></>}
  {index===4&&<><path d="M16 32V8l19-4v25M16 15l19-4"/><ellipse cx="10" cy="34" rx="6" ry="4" fill="currentColor"/><ellipse cx="29" cy="31" rx="6" ry="4" fill="currentColor"/></>}
</svg>;

// Seconds are synchronized with the narration; the animation itself is frame driven.
const captions: [number, number, string][] = [
  [0, 3.5, '我通常不会给Omni模型直接写提示词'],
  [3.9, 6.3, '而是反复和 Gemini 对话'],
  [6.4, 8.9, '产生一套视频生成提示词'],
  [9.0, 11.3, '例如我会从不同的角度进行约束'],
  [11.6, 14.0, '例如世界观和故事背景层面'],
  [14.2, 15.9, '这条片子的时间跨度'],
  [16.2, 19.0, '每个镜头都有哪些特殊的时代背景'],
  [19.2, 20.7, '不同的镜头分别应用'],
  [20.8, 22.1, '什么样的画面风格'],
  [22.4, 24.1, '同时剪辑节奏和声音'],
  [24.2, 25.8, '设计也会一同定义'],
  [26.2, 28.4, '跨模态的约束往往能让AI'],
  [28.5, 30.6, '产出不同于平均水平的内容'],
  [30.8, 32.8, '在内容不再稀缺的今天'],
  [33.0, 35.4, '足够多的约束意味着独特性'],
  [35.7, 38.2, '也能让一条视频脱颖而出'],
];

const PaperLabel: React.FC<{index:number; checked?:boolean}> = ({index, checked = false}) => <div style={{width:245,height:103,position:'relative',color:colors[index],fontSize:34,fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',gap:12,background:paper,boxShadow:'8px 12px 10px #0005',borderTop:`6px solid ${colors[index]}`}}>
  <LabelIcon index={index}/><span>{labels[index]}</span>
  {checked && <span style={{position:'absolute',right:1,top:-17,fontSize:58,color:'#bc3423',textShadow:'2px 2px #f1e5ca'}}>✓</span>}
</div>;

const Conversation: React.FC<{time:number}> = ({time}) => {
  const stack = progress(time, 6.9, .6);
  const cover = progress(time, 7.8, .5);
  const bubbles = [
    {x:220,y:560,s:4.5,c:'#319276',text:'◎'},
    {x:190,y:430,s:5.1,c:'#b33d28',text:'▦'},
    {x:180,y:300,s:5.8,c:'#763562',text:'♫'},
    {x:1710,y:430,s:5,c:'#c79c32',text:'✦'},
    {x:1700,y:310,s:5.7,c:'#275680',text:'✎'},
  ];
  return <AbsoluteFill>
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{filter:'drop-shadow(12px 18px 8px #0008)'}}>
      <g stroke="#133d43" strokeWidth="10">
        <path d="M590 390 1330 390 1480 750 440 750Z" fill="#113b43"/>
        <path d="M595 392 1325 392 1395 555 525 555Z" fill={paper} strokeWidth="4"/>
        <path d="M525 565 1395 565 1470 742 450 742Z" fill={paper} strokeWidth="4"/>
      </g>
      {colors.map((c,i)=><path key={c} d={`M${595-i*26} ${392+i*48} ${1325+i*26} ${392+i*48} 1470 742 450 742Z`} fill={c} opacity={stack} stroke="#eadcbc" strokeWidth="3"/>)}
      <g opacity={cover}>
        <path d="M590 390 1330 390 1480 750 440 750Z" fill="#123941" stroke="#09262c" strokeWidth="8"/>
        <path d="M615 420 1305 420 1430 716 490 716Z" fill="none" stroke="#c89c42" strokeWidth="3"/>
        <path d="M624 430 1296 430 1415 706 505 706Z" fill="none" stroke="#c89c42" strokeWidth="2"/>
        <text x="960" y="601" textAnchor="middle" fill="#dcb354" fontSize="65" fontWeight="700">视频生成提示词</text>
        {colors.map((c,i)=><ellipse key={c} cx={884+i*38} cy="640" rx="7" ry="4" fill={c}/>)}
      </g>
    </svg>
    <div style={{position:'absolute',left:120,top:685,width:225,height:135,transform:'rotate(-8deg)'}}><div style={{...cardStyle,borderBottom:'7px solid #d9ae30',fontSize:64}}>我</div></div>
    <div style={{position:'absolute',right:100,top:680,width:250,height:145,transform:'rotate(9deg)'}}><div style={{...cardStyle,borderBottom:'7px solid #5c4b9d',fontFamily:'Georgia,serif',fontSize:48}}><span style={{color:'#6452ab'}}>✦</span>Gemini</div></div>
    {bubbles.map((b,i)=> <div key={i} style={{position:'absolute',left:b.x-55,top:b.y-65,opacity:progress(time,b.s,.25)*(1-progress(time,6.5,.3)),transform:`translateY(${(1-progress(time,b.s,.4))*70}px) rotate(${i%2?8:-8}deg) scale(${progress(time,b.s,.4)})`,width:110,height:83,background:b.c,border:'3px solid #decf9e',borderRadius:'50%',color:paper,fontSize:52,textAlign:'center',boxShadow:'12px 16px 9px #0008'}}>{b.text}<span style={{position:'absolute',bottom:-18,left:35,width:25,height:30,background:b.c,clipPath:'polygon(0 0,100% 0,10% 100%)'}}/></div>)}
  </AbsoluteFill>;
};

const cardStyle: React.CSSProperties = {height:'100%',background:paper,display:'flex',alignItems:'center',justifyContent:'center',color:'#30271d',boxShadow:'13px 18px 12px #0006'};

const Scatter: React.FC<{time:number}> = ({time}) => <AbsoluteFill style={{pointerEvents:'none'}}>
  {Array.from({length:34},(_,i)=>{
    const p=progress(time,30.8+(i%8)*.065,1.3);
    const x=((i*439+40)%2060)-80;
    const y=470+(i*157)%530;
    const rotation=(i*137)%160-80;
    return <div key={i} style={{position:'absolute',left:480+(x-480)*p,top:450+(y-450)*p-(Math.sin(p*Math.PI)*260),width:190+(i%3)*24,height:130,background:'#c6c0a8',border:'1px solid #847b63',opacity:p*.87,transform:`rotate(${rotation*p}deg) scale(${.4+.6*p})`,boxShadow:'10px 15px 8px #0006',padding:16}}>
      <div style={{height:16,background:'#989782',width:'66%',marginBottom:8}}/>
      {Array.from({length:6},(_,j)=><div key={j} style={{height:4,marginBottom:8,background:'#aaa893',width:`${68+(i+j)%4*9}%`}}/>)}
    </div>;
  })}
</AbsoluteFill>;

const Book: React.FC<{time:number}> = ({time}) => {
  const opening = progress(time,9,.95);
  const landscape = progress(time,11.75,.65);
  const strip = progress(time,14.2,1.1);
  const collapse = progress(time,30.8,.75)*(1-progress(time,33.4,1));
  const bookRise = 1-collapse;
  const lift=(start:number) => progress(time,start,.6)*bookRise;
  const objects = [
    {kind:'train' as const,x:270,y:553,w:185,h:190,at:16.2},
    {kind:'rocket' as const,x:582,y:544,w:170,h:190,at:16.7},
    {kind:'computer' as const,x:845,y:558,w:185,h:190,at:17.2},
    {kind:'drone' as const,x:1110,y:575,w:180,h:170,at:17.7},
    {kind:'girl' as const,x:1310,y:492,w:160,h:260,at:12.6},
    {kind:'gramophone' as const,x:65,y:550,w:200,h:205,at:22.4},
  ];
  return <div style={{width:1460,height:870,position:'relative',filter:'drop-shadow(16px 20px 10px #0007)'}}>
    <svg width="1460" height="870" style={{position:'absolute',inset:0,overflow:'visible'}}>
      <path d="M124 507 1324 507 1460 780 0 780Z" fill="#0c353c" stroke="#09272d" strokeWidth="8"/>
      <path d="M130 516 1317 516 1442 767 18 767Z" fill={paper}/>
      <path d="M130 516 1317 516 1340 557 108 557Z" fill="#d2c7a9" opacity=".5"/>
      <path d="M40 756H1423M46 746H1417M55 736H1410" stroke="#a99e81" opacity=".35"/>
      <path d="M14 780H1451" stroke="#061b20" strokeWidth="10"/>
      <path d="M129 513H1320" stroke="#b8a783" strokeWidth="6"/>
      <path d="M1310 518 1670 510 1880 385 1315 440Z" opacity=".3" fill="#130c05"/>
    </svg>
    <div style={{position:'absolute',left:130,top:0,width:1200,height:515,transformOrigin:'center bottom',transform:`perspective(1800px) rotateX(${(1-opening)*88 + collapse*86}deg)`,border:'10px solid #12383d',background:paper,boxShadow:'10px 10px 4px #16120777',overflow:'visible'}}>
      <div style={{position:'absolute',inset:0,opacity:landscape}}><Seaside time={time}/></div>
      <div style={{position:'absolute',inset:0,backgroundImage:`url(${staticFile('textures/grain.svg')})`,opacity:.15,pointerEvents:'none'}}/>
    </div>
    <div style={{position:'absolute',left:180,top:405,width:1110,height:317,transformOrigin:'center bottom',opacity:strip,transform:`perspective(1100px) rotateX(${(1-strip*bookRise)*-88}deg)`}}><FilmStrip colorProgress={progress(time,19.2,1.4)} styleProgress={progress(time,20.8,1.3)}/></div>
    {objects.map(o=><React.Fragment key={o.kind}>
      <div style={{position:'absolute',left:o.x+o.w*.3,top:o.y+o.h-46,width:o.w*1.5,height:55,background:'#241b0d',opacity:lift(o.at)*.27,clipPath:'polygon(0 80%,60% 0,100% 2%,34% 100%)',filter:'blur(2px)'}}/>
      <div style={{position:'absolute',left:o.x,top:o.y,width:o.w,height:o.h,transformOrigin:'center bottom',opacity:lift(o.at),transform:`perspective(1000px) rotateX(${(1-lift(o.at))*-88}deg) translateY(${(1-lift(o.at))*20}px)`}}><PaperProp kind={o.kind} time={time}/></div>
    </React.Fragment>)}
    {time>24.2 && <svg width="1460" height="870" style={{position:'absolute',inset:0,overflow:'visible'}}><g opacity={lift(24.2)} transform={`translate(675 ${345+(1-lift(24.2))*130})`}><path d="M0 0V125" stroke="#201c10" strokeWidth="6"/><path d="m4 0 85 24-85 23Z" fill="#b92e20" stroke="#edddbb" strokeWidth="5"/></g></svg>}
    {labels.map((_,i)=>{
      const p=progress(time,9.7+i*.25,.6);
      return <div key={i} style={{position:'absolute',left:-70+i*330,top:773+(i%2?10:0),transform:`translateY(${(1-p)*55}px) rotate(${[-10,4,0,-4,-10][i]}deg) scale(${.78+.22*p})`,opacity:p}}><PaperLabel index={i} checked={time>35.3+i*.15}/></div>;
    })}
  </div>;
};

export const PopUpBook: React.FC = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const time=frame/fps;
  const [fontHandle] = useState(()=>delayRender('Load bundled Chinese serif font'));
  useEffect(()=>{
    const font=new FontFace('BookSerif',`url(${staticFile('fonts/NotoSerifCJKsc-Bold.otf')})`,{weight:'700'});
    font.load().then(loaded=>{document.fonts.add(loaded);continueRender(fontHandle);}).catch(()=>continueRender(fontHandle));
  },[fontHandle]);
  const comparison=progress(time,26.2,1.8)*(1-progress(time,30.8,.45));
  const bookScale=interpolate(time,[9,10.8,17,20,24.2,26.2,28.2,30.8,31.8,33.4,35.5,38.2],[.82,.92,1.04,1.01,.96,.96,.63,.63,.73,.73,.94,.94],clamp);
  const bookX=interpolate(time,[9,26.2,28.2,30.8,35.5],[230,230,790,790,230],clamp);
  const bookY=interpolate(time,[9,10.8,17,20,26.2,28.2,30.8,35.5],[90,35,-45,5,40,170,170,35],clamp);
  const caption=captions.find(([start,end])=>time>=start&&time<end);
  return <AbsoluteFill style={{fontFamily:serif,color:'#201c14',overflow:'hidden',background:'#4f3013'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 60% 53%, #82521e66 5%, #2b170b66 75%, #120c06 120%), repeating-linear-gradient(2deg, #2b17051a 0px, #93622b1a 2px, transparent 3px, transparent 11px), repeating-linear-gradient(-1deg, transparent 0, #a0713620 2px, transparent 4px, transparent 67px), linear-gradient(110deg,#3c220b,#785020 58%,#4f2e10)'}}/>
    <AbsoluteFill style={{backgroundImage:`url(${staticFile('textures/wood.svg')})`,backgroundSize:'1100px 750px',opacity:.3,mixBlendMode:'multiply'}}/>
    {time<3.6 && <AbsoluteFill style={{opacity:1-progress(time,3.4,.2)}}>
      <div style={{position:'absolute',left:535,top:110,width:990,height:792,transform:`scale(${1+time*.012})`,transformOrigin:'center'}}><OmniMachine time={time}/></div>
    </AbsoluteFill>}
    {time>=3.6&&time<9&&<Conversation time={time}/>}
    {time>=9&&<>
      <Scatter time={time}/>
      <div style={{position:'absolute',left:bookX,top:bookY,transform:`scale(${bookScale}) rotate(${interpolate(time,[9,10.7,26.2,28.2,30.8,35.5],[-3,0,0,2,2,0],clamp)}deg)`,transformOrigin:'top left'}}><Book time={time}/></div>
      <div style={{position:'absolute',left:100,top:300,width:550,height:440,opacity:comparison,transform:`translateX(${(1-comparison)*-100}px)`}}><OmniMachine time={time} miniature/></div>
      {time>28.5&&time<30.8&&<div style={{position:'absolute',left:690,top:595,fontSize:120,color:'#b33321',textShadow:'3px 3px #e9d9ac',transform:'rotate(-5deg)'}}>≠</div>}
    </>}
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 47%, transparent 32%, #07060370 100%)',pointerEvents:'none'}}/>
    <AbsoluteFill style={{backgroundImage:`url(${staticFile('textures/grain.svg')})`,opacity:.08,mixBlendMode:'multiply',pointerEvents:'none'}}/>
    <AbsoluteFill style={{background:'#090804',opacity:progress(time,37.1,1.05)*.38,pointerEvents:'none'}}/>
    {caption&&<div style={{position:'absolute',bottom:50,left:0,right:0,display:'flex',justifyContent:'center'}}><div style={{background:'#f3efdf',fontSize:46,fontWeight:700,lineHeight:1.45,padding:'10px 38px 13px',clipPath:'polygon(.6% 6%,12% 0,31% 4%,47% 1%,61% 5%,80% 0,99% 7%,100% 57%,99% 95%,78% 100%,60% 96%,43% 100%,23% 96%,1% 100%,0 53%)',transform:`rotate(${Math.sin(caption[0])*0.35}deg)`,whiteSpace:'nowrap'}}>{caption[2]}</div></div>}
    <Audio src={staticFile('audio/paper-score.m4a')}/>
  </AbsoluteFill>;
};
