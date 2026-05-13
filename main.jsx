import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, BrainCircuit, CheckCircle2, Crosshair, Eye, Home, MapPinned, Megaphone, RadioTower, Radar, ShieldCheck, SlidersHorizontal, Target, Zap, XOctagon } from "lucide-react";
import { missionConfig } from "./config/mission";
import satelliteBase from "./assets/rajasthan-satellite-base.jpeg";
import "./styles.css";

const actionIcons = { STRIKE: Zap, "CALL OUT": Megaphone, "RETURN HOME": Home, ABORT: XOctagon };

function App() {
  const [confidence, setConfidence] = useState(missionConfig.confidenceScore);
  const [phase, setPhase] = useState(6);
  const [selectedTarget, setSelectedTarget] = useState("TGT-17");
  const [showTrails, setShowTrails] = useState(true);
  const [showTargets, setShowTargets] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [interlock, setInterlock] = useState(true);
  const activeTarget = missionConfig.movingTargets.find(t => t.id === selectedTarget) || missionConfig.movingTargets[0];
  const ready = interlock && confidence >= missionConfig.confidenceThreshold;
  const currentPhase = missionConfig.missionPhases[Math.max(0, phase - 1)];
  const fusion = useMemo(() => missionConfig.fusionInputs.map((f,i)=>({...f,value:Math.max(0,Math.min(100,f.value+Math.round((confidence-missionConfig.confidenceScore)/(i+2))))})), [confidence]);

  return <main className="shell">
    <header className="top-command">
      <div className="title-block"><p>EDUCATIONAL COMMAND INTERFACE / SATELLITE BASELINE</p><h1>{missionConfig.missionName}</h1><span>{missionConfig.missionSubtitle}</span></div>
      <div className="top-metrics"><Metric label="Mission State" value={ready ? "INTERLOCK READY" : "REVIEW"} /><Metric label="Fusion Confidence" value={`${confidence}%`} large /></div>
    </header>

    <section className="essentials-strip">{missionConfig.essentials.map(item => <StatusPill key={item.label} item={item} disabled={!interlock && item.label !== "HUMAN REVIEW"} />)}</section>

    <section className="layout">
      <aside className="panel left">
        <PanelTitle icon={MapPinned} text="Mission Parameters" />
        <div className="field-stack">
          <Field label="Theatre" value={missionConfig.theatre}/><Field label="Command Node" value={missionConfig.commandNode}/><Field label="Grid Reference" value={missionConfig.gridReference}/><Field label="Decision Policy" value={missionConfig.decisionPolicy}/>
        </div>
        <PanelTitle icon={SlidersHorizontal} text="Live Controls" small />
        <div className="controls">
          <label>Confidence<input type="range" min="40" max="100" value={confidence} onChange={e=>setConfidence(Number(e.target.value))}/></label>
          <label>Mission Phase<select value={phase} onChange={e=>setPhase(Number(e.target.value))}>{missionConfig.missionPhases.map((p,i)=><option key={p} value={i+1}>Phase {i+1}</option>)}</select></label>
          <label>Select Target<select value={selectedTarget} onChange={e=>setSelectedTarget(e.target.value)}>{missionConfig.movingTargets.map(t=><option key={t.id} value={t.id}>{t.id} — {t.label}</option>)}</select></label>
          <label>Animation Speed<input type="range" min="0.5" max="2" step="0.1" value={speed} onChange={e=>setSpeed(Number(e.target.value))}/></label>
          <div className="toggle-row"><button className={showTargets ? "active" : ""} onClick={()=>setShowTargets(!showTargets)}>Targets</button><button className={showTrails ? "active" : ""} onClick={()=>setShowTrails(!showTrails)}>Trails</button><button className={interlock ? "active" : ""} onClick={()=>setInterlock(!interlock)}>Interlock</button></div>
        </div>
        <PanelTitle icon={AlertTriangle} text="Safety Boundary" small />
        <div className="rules">{missionConfig.safetyRules.map(r=><span key={r}>{r}</span>)}</div>
      </aside>

      <section className="panel center">
        <div className="display-header"><div><p>CENTRE SCREEN / SATELLITE BASELINE + ISR OVERLAY</p><h2>{currentPhase}</h2></div><div className={`live-chip ${ready ? "ready" : ""}`}><Activity size={14}/>{ready ? "INTERLOCKED" : "SIM ACTIVE"}</div></div>
        <MissionDisplay image={satelliteBase} phase={phase} ready={ready} confidence={confidence} selectedTarget={selectedTarget} showTargets={showTargets} showTrails={showTrails} speed={speed}/>
        <ActionRail ready={ready}/>
        <div className="bottom-cards"><TargetSummary target={activeTarget} confidence={confidence} ready={ready}/><FusionSummary fusion={fusion}/></div>
      </section>

      <aside className="panel right">
        <PanelTitle icon={BrainCircuit} text="AI / ROE Analysis" />
        <div className="analysis-card"><div className="scoreline"><span>{confidence}%</span><small>fusion confidence</small></div><h3>{activeTarget.id}</h3><p>{activeTarget.className}</p><div className={`risk risk-${activeTarget.risk.toLowerCase()}`}>{activeTarget.risk} RISK / {activeTarget.status}</div></div>
        <PanelTitle icon={Activity} text="Mission Timeline" small />
        <div className="timeline">{missionConfig.missionPhases.map((p,i)=><div className={`time-item ${i+1<=phase?"done":""}`} key={p}><CheckCircle2 size={13}/><span>{String(i+1).padStart(2,"0")}</span><p>{p}</p></div>)}</div>
        <PanelTitle icon={Radar} text="Target Table" small />
        <div className="target-table">{missionConfig.movingTargets.map(t=><button className={t.id===selectedTarget?"selected":""} onClick={()=>setSelectedTarget(t.id)} key={t.id}><b>{t.id}</b><span>{t.confidence}%</span><small>{t.status}</small></button>)}</div>
      </aside>
    </section>
  </main>;
}

function Metric({label,value,large}){return <div className="metric"><small>{label}</small><b className={large?"large":""}>{value}</b></div>}
function StatusPill({item,disabled}){return <div className={`status-pill ${item.state} ${disabled?"disabled":""}`}><span>{item.label}</span><b>{disabled?"HOLD":item.status}</b></div>}
function PanelTitle({icon:Icon,text,small}){return <div className={`panel-title ${small?"small":""}`}><Icon size={15}/><span>{text}</span></div>}
function Field({label,value}){return <div className="field"><span>{label}</span><b>{value}</b></div>}

function MissionDisplay({image,phase,ready,confidence,selectedTarget,showTargets,showTrails,speed}) {
  const active = missionConfig.movingTargets.find(t=>t.id===selectedTarget)||missionConfig.movingTargets[0];
  const end = active.path[active.path.length-1];
  return <div className="mission-display">
    <img className="satellite-img" src={image} alt="Satellite baseline map"/><div className="map-darken"/><div className="scan-sweep"/><div className="sensor-noise"/>
    <svg className="network" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M22 28 C36 18, 58 15, 77 24"/><path d="M22 28 C36 48, 44 66, 53 84"/><path d="M77 24 C70 50, 63 72, 53 84"/><path d="M36 71 C44 62, 52 54, 61 50"/><path className="active" d="M39 32 C47 38, 54 44, 61 50"/><path className={ready&&phase>=7?"response active-red":"response"} d="M36 71 C44 62, 52 54, 61 50"/></svg>
    {missionConfig.assets.map(a=><Asset asset={a} key={a.id}/>)}
    {showTrails && missionConfig.movingTargets.map(t=><TrackTrail target={t} key={`trail-${t.id}`}/>)}
    {showTargets && missionConfig.movingTargets.map(t=><MovingTarget key={t.id} target={t} selected={t.id===selectedTarget} speed={speed}/>)}
    {ready && phase>=7 && <motion.div className="response-pulse" initial={{left:"36%",top:"71%",opacity:.3,scale:.5}} animate={{left:`${end.x}%`,top:`${end.y}%`,opacity:[.25,1,.12],scale:[.6,1.5,2.4]}} transition={{duration:2.4/speed,repeat:Infinity,repeatDelay:1.1/speed}}><Zap size={17}/></motion.div>}
    <div className="selected-card"><Crosshair size={17}/><div><b>{active.id}</b><span>{active.className}</span></div><strong>{confidence}%</strong></div>
    <div className="hud"><p>SAT_BASELINE // ISR_OVERLAY // AI_FILTER_ON // ROE_SIM_CHECK</p><p>SELECTED: {active.id} // PHASE {phase} // EDUCATIONAL_SIM_ONLY</p></div>
  </div>
}

function ActionRail({ready}){return <div className="action-rail">{missionConfig.actionPanel.map(a=>{const Icon=actionIcons[a.label]||Target;return <button className={`${a.state} ${ready?"enabled":"disabled"}`} key={a.label}><Icon size={16}/><span>{a.label}</span><b>{ready?a.status:"INTERLOCK HOLD"}</b></button>})}</div>}
function TrackTrail({target}){const d=target.path.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");return <svg className={`trail trail-${target.risk.toLowerCase()}`} viewBox="0 0 100 100" preserveAspectRatio="none"><path d={d}/>{target.path.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r=".55"/>)}</svg>}
function MovingTarget({target,selected,speed}){return <motion.div className={`moving-target risk-${target.risk.toLowerCase()} ${selected?"selected":""}`} initial={{left:`${target.path[0].x}%`,top:`${target.path[0].y}%`,opacity:0}} animate={{left:target.path.map(p=>`${p.x}%`),top:target.path.map(p=>`${p.y}%`),opacity:1}} transition={{duration:target.duration/speed,repeat:Infinity,repeatType:"reverse",ease:"linear"}}><Target size={selected?25:19}/><b>{target.id}</b><span>{target.confidence}%</span>{selected&&<small>{target.className}</small>}</motion.div>}
function Asset({asset}){const Icon=asset.name.includes("ISR")?Eye:asset.name.includes("Loitering")?Radar:asset.name.includes("Kamikaze")?Zap:ShieldCheck;return <div className={`asset ${asset.id==="BDE-HQ"?"hq":""}`} style={{left:`${asset.x}%`,top:`${asset.y}%`}}><Icon size={17}/><b>{asset.id}</b><span>{asset.status}</span></div>}
function TargetSummary({target,confidence,ready}){return <div className="mini-card"><div className="mini-title"><Target size={14}/>Selected Target</div><h3>{target.id}</h3><p>{target.className}</p><div className="tags"><span>{target.status}</span><span>{target.risk} RISK</span><span>{confidence}% FUSION</span><span>{ready?"INTERLOCK READY":"REVIEW HOLD"}</span></div></div>}
function FusionSummary({fusion}){return <div className="mini-card"><div className="mini-title"><RadioTower size={14}/>Fusion Inputs</div><div className="bars">{fusion.map(f=><div key={f.label}><span>{f.label}</span><i><em style={{width:`${f.value}%`}}/></i><b>{f.value}%</b></div>)}</div></div>}

createRoot(document.getElementById("root")).render(<App/>);
