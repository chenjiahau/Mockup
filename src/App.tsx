import { useCallback, useEffect, useMemo, useState } from "react";
import ELK from "elkjs/lib/elk.bundled.js";
import { Background, Controls, Handle, MarkerType, Position, ReactFlow, ReactFlowProvider, useReactFlow, type Edge, type Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import "./uplink.css";

type DeviceData = { name: string; mac: string; status?: string; role?: string; kind?: string; collapsible?: boolean; collapsed?: boolean; onToggle?: () => void };
const elk = new ELK();

const nodeData: Array<[string, number, number, DeviceData]> = [
  ["core", 175, 90, { name: "DMS-3130 Core", mac: "40:86:CB:13:F1:80" }], ["access", 175, 310, { name: "DGS-1250 Agg/Access", mac: "EC:AD:E0:85:E2:78" }], ["finance", 25, 430, { name: "DGS-1520 Finance", mac: "5C:78:96:21:10:41" }], ["lab", 325, 430, { name: "DGS-1210 Lab", mac: "A0:AB:1B:4E:92:10" }], ["pc1", 10, 520, { name: "Client PC 01", mac: "", kind: "client" }], ["pc2", 175, 520, { name: "Client PC 02", mac: "", kind: "client" }], ["ap", 355, 420, { name: "AP_Office_1", mac: "00:1A:E2:BB:CC:DD", kind: "ap" }], ["mobile", 530, 520, { name: "Mobile User PC", mac: "", kind: "client" }],
  ["spine1", 900, 90, { name: "DXS-Spine 01", mac: "C4:E9:0A:74:20:01", role: "Spine" }], ["spine2", 1190, 90, { name: "DXS-Spine 02", mac: "C4:E9:0A:74:20:02", role: "Spine" }], ["border", 785, 430, { name: "Border Leaf 01", mac: "C4:E9:0A:74:20:03", role: "Border Leaf" }], ["leaf1", 1065, 430, { name: "Leaf 01", mac: "C4:E9:0A:74:20:04", role: "Leaf" }], ["leaf2", 1340, 430, { name: "Leaf 02", mac: "C4:E9:0A:74:20:05", role: "Leaf" }],
];
const connections: Array<[string, string, "wired" | "traffic" | "wireless" | "fabric" | "crossArea"]> = [["core", "access", "wired"], ["access", "finance", "wired"], ["access", "lab", "wired"], ["access", "pc1", "wired"], ["finance", "pc2", "traffic"], ["lab", "ap", "wired"], ["ap", "mobile", "wireless"], ["core", "border", "crossArea"], ["access", "leaf1", "crossArea"], ["spine1", "border", "fabric"], ["spine1", "leaf1", "fabric"], ["spine1", "leaf2", "fabric"], ["spine2", "border", "fabric"], ["spine2", "leaf1", "fabric"], ["spine2", "leaf2", "fabric"]];

function DeviceNode({ data }: { data: DeviceData }) {
  return <div className={`rf-device ${data.role ? "fabric-device" : ""}`}><Handle type="target" position={Position.Top} /><span className="node-status" />{data.collapsible && <button className="collapse-toggle" onClick={(event) => { event.stopPropagation(); data.onToggle?.(); }}>{data.collapsed ? "+" : "−"}</button>}{data.role && <span className="node-role">{data.role}</span>}<button className={`node-icon ${data.kind || "switch"}`} aria-label={`Open ${data.name}`} onClick={(event) => { event.stopPropagation(); console.log(`Device image clicked: ${data.name}`); }}>{data.kind === "client" ? "▱" : data.kind === "ap" ? "AP" : <><i/><i/><i/><i/><i/><i/><i/><i/></>}</button><strong>{data.name}</strong>{data.mac && <small>({data.mac})</small>}<Handle type="source" position={Position.Bottom} /></div>;
}
const nodeTypes = { device: DeviceNode };
function Topology() {
  const { fitView } = useReactFlow();
  const [query, setQuery] = useState("");
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [layoutPositions, setLayoutPositions] = useState<Record<string, { x: number; y: number }>>({});
  useEffect(() => {
    const toGraph = (id: string, ids: string[]) => ({ id, layoutOptions: { "elk.algorithm": "layered", "elk.direction": "DOWN", "elk.spacing.nodeNode": "75", "elk.layered.spacing.nodeNodeBetweenLayers": id === "enterprise-layout" ? "80" : "110" }, children: nodeData.filter(([nodeId]) => ids.includes(nodeId)).map(([nodeId]) => ({ id: nodeId, width: 155, height: id === "enterprise-layout" ? 100 : 80 })), edges: connections.filter(([source, target]) => ids.includes(source) && ids.includes(target)).map(([source, target], index) => ({ id: `${id}-${index}`, sources: [source], targets: [target] })) });
    void Promise.all([elk.layout(toGraph("enterprise-layout", ["core", "access", "finance", "lab", "pc1", "pc2", "ap", "mobile"])), elk.layout(toGraph("fabric-layout", ["spine1", "spine2", "border", "leaf1", "leaf2"]))]).then(([enterprise, fabric]) => {
      const next: Record<string, { x: number; y: number }> = {};
      enterprise.children?.forEach((node) => { next[node.id] = { x: node.x ?? 0, y: node.y ?? 0 }; });
      const fabricOffsetX = Math.max(0, (790 - (fabric.width ?? 790)) / 2);
      const fabricOffsetY = Math.max(0, (525 - (fabric.height ?? 525)) / 2);
      fabric.children?.forEach((node) => { next[node.id] = { x: (node.x ?? 0) + fabricOffsetX, y: (node.y ?? 0) + fabricOffsetY }; });
      setLayoutPositions(next);
    });
  }, []);
  const nodes = useMemo<Node<DeviceData>[]>(() => [{ id: "enterprise", type: "group", position: { x: 0, y: 0 }, data: { label: "" }, draggable: false, selectable: false, style: { width: 650, height: 610, background: "transparent", border: "none" } }, { id: "fabric", type: "group", position: { x: 700, y: 45 }, data: { label: "" }, draggable: false, selectable: false, style: { width: 790, height: 525, background: "#edf0f5", border: "none", borderRadius: 16 } }, ...nodeData.map(([id, x, y, data]) => ({ id, type: "device", position: layoutPositions[id] ?? { x: data.role ? x - 700 : x, y: data.role ? y - 45 : y }, data: ["core", "access", "finance", "lab"].includes(id) ? { ...data, collapsible: true, collapsed: collapsedNodes[id] ?? false, onToggle: () => setCollapsedNodes((value) => ({ ...value, [id]: !value[id] })) } : data, draggable: false, parentId: data.role ? "fabric" : "enterprise", extent: "parent" as const, hidden: ((collapsedNodes.core && ["access", "finance", "lab", "pc1", "pc2", "ap", "mobile"].includes(id)) || (collapsedNodes.access && ["finance", "lab", "pc1", "pc2", "ap", "mobile"].includes(id)) || (collapsedNodes.finance && id === "pc2") || (collapsedNodes.lab && ["ap", "mobile"].includes(id))) || (Boolean(query) && !`${data.name} ${data.mac}`.toLowerCase().includes(query.toLowerCase())) }))], [query, layoutPositions, collapsedNodes]);
  const edges = useMemo<Edge[]>(() => connections.map(([source, target, kind]) => ({ id: `${source}-${target}`, source, target, type: "default", animated: false, label: kind === "crossArea" ? source === "core" ? "DMS-3130 Core ↔ Border Leaf 01" : "DGS-1250 ↔ Leaf 01" : undefined, labelStyle: kind === "crossArea" ? { fill: "#244a7f", fontSize: 12, fontWeight: 700 } : undefined, labelBgStyle: kind === "crossArea" ? { fill: "#ffffff", fillOpacity: 1, stroke: "#78a5df", strokeWidth: 1 } : undefined, labelBgPadding: kind === "crossArea" ? [9, 5] : undefined, labelBgBorderRadius: 5, style: { stroke: kind === "fabric" ? "#42b84f" : kind === "crossArea" ? "#4389ce" : kind === "traffic" ? "#243b85" : "#7180aa", strokeWidth: 5, strokeDasharray: kind === "wireless" ? "5 8" : undefined }, markerEnd: { type: MarkerType.ArrowClosed, width: 0, height: 0 } })), []);
  const onFit = useCallback(() => fitView({ padding: .16, duration: 250 }), [fitView]);
  return <section className="flow-card"><div className="flow-toolbar"><div><b>Online <em>10</em></b><b>Offline <em className="pink">0</em></b></div><label>Search by Model/MAC/IP <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" /></label></div><div className="flow-stage"><h2 className="enterprise-heading">Enterprise Networking</h2><h2 className="fabric-heading">Data Center Fabric (Spine–Leaf)</h2><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} nodesDraggable={false} nodesConnectable={false} elementsSelectable panOnDrag zoomOnScroll fitView fitViewOptions={{ padding: .16 }}><Background gap={24} color="transparent"/><Controls showInteractive={false} onFitView={onFit}/></ReactFlow></div><footer className="flow-legend">● Online　<span>● Offline</span>　— Wired line　━━ High traffic　┄┄ Wireless　<span className="green">━━ DC Fabric line</span>　↔ Uplink Tag</footer></section>;
}
function App() { return <main className="app-shell"><header className="topbar"><b>Sites / Taipei HQ / Topology</b><span>Enterprise + Data Center Fabric</span></header><ReactFlowProvider><Topology /></ReactFlowProvider></main>; }
export default App;
