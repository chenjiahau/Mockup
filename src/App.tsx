import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./App.css";

type Severity = "Information" | "Warning" | "Critical";

const logs: { time: string; severity: Severity; message: string }[] = [
  ["2026-08-23 13:38", "Information", "The device DGS-1250-52XP 7C:F0 had its configuration synced successfully."],
  ["2026-08-23 13:36", "Information", "The device DGS-1530-28SC A2:00 had its configuration synced successfully."],
  ["2026-08-23 13:36", "Information", "The device DGS-3630-52PC 7C:00 had its configuration synced successfully."],
  ["2026-08-23 13:35", "Information", "The device DXS-1210-10MP A6:60 had its configuration synced successfully."],
  ["2026-08-23 02:38", "Information", "The device DGS-1250-52XP 7C:F0 had its configuration synced successfully."],
  ["2026-08-23 02:36", "Information", "The device DGS-3630-52PC 7C:00 had its configuration synced successfully."],
  ["2026-08-23 02:36", "Information", "The device DGS-1530-28SC A2:00 had its configuration synced successfully."],
  ["2026-08-22 22:04", "Warning", "Port 16 on DGS-1250-52XP changed link status to down."],
  ["2026-08-22 21:48", "Information", "Wireless client 5C:CF:7F:91:1D:55 joined the network."],
  ["2026-08-22 18:22", "Critical", "Device DGS-3630-52PC heartbeat was temporarily unavailable."],
  ["2026-08-22 17:55", "Information", "The configuration backup for LLDP_FDB was created successfully."],
  ["2026-08-22 16:19", "Information", "The device DGS-1210-28MP B8:41 had its configuration synced successfully."],
  ["2026-08-22 14:02", "Warning", "High CPU utilization was detected on DGS-1530-28SC A2:00 for 5 minutes."],
  ["2026-08-22 11:47", "Information", "Topology discovery completed. 18 switches and 42 active links were identified."],
  ["2026-08-22 09:12", "Information", "Wireless access point DAP-X2850 9E:11 completed a scheduled channel optimization."],
  ["2026-08-21 23:53", "Information", "The device DGS-1250-52XP 7C:F0 firmware inventory was updated."],
  ["2026-08-21 22:31", "Warning", "Port 24 on DGS-1210-28MP B8:41 exceeded its configured traffic threshold."],
  ["2026-08-21 20:45", "Information", "Client 98:83:89:12:FA:6C received IP address 10.24.18.76 from the DHCP service."],
  ["2026-08-21 18:08", "Information", "The device DXS-1210-10MP A6:60 had its configuration synced successfully."],
  ["2026-08-21 16:36", "Critical", "A power supply alert was reported by device DGS-3630-52PC 7C:00."],
  ["2026-08-21 14:15", "Information", "A new administrator session was created from 10.24.4.18."],
  ["2026-08-21 12:03", "Information", "Wireless client 30:24:32:8A:14:59 roamed from AP-3F to AP-2C."],
  ["2026-08-21 08:44", "Warning", "The WAN uplink on DGS-1250-52XP 7C:F0 briefly changed link status to down."],
  ["2026-08-20 21:33", "Information", "Scheduled configuration backup completed for all 18 managed devices."],
  ["2026-08-20 18:27", "Information", "The device DGS-1530-28SC A2:00 had its configuration synced successfully."],
  ["2026-08-20 15:14", "Information", "Guest network bandwidth policy was applied to 32 connected clients."],
  ["2026-08-20 13:09", "Warning", "Access point DAP-X2850 9E:11 reported elevated retransmission rate on channel 44."],
  ["2026-08-20 10:22", "Information", "Network health assessment finished with a score of 92 out of 100."],
  ["2026-08-19 23:40", "Information", "The device DGS-3630-52PC 7C:00 had its configuration synced successfully."],
  ["2026-08-19 19:18", "Critical", "Loop protection was triggered on port 8 of DGS-1210-28MP B8:41."],
  ["2026-08-19 17:02", "Information", "The LLDP neighbor table was refreshed for all managed switches."],
  ["2026-08-19 12:56", "Information", "Wireless client 1A:72:5D:C8:04:77 joined the Staff-5G network."],
  ["2026-08-19 09:38", "Warning", "Device DXS-1210-10MP A6:60 is approaching its configured PoE power budget."],
  ["2026-08-18 22:10", "Information", "The device DGS-1250-52XP 7C:F0 had its configuration synced successfully."],
  ["2026-08-18 20:04", "Information", "Security policy update was successfully applied to the organization."],
  ["2026-08-18 16:49", "Information", "Client 3C:84:6A:73:45:10 disconnected from the network normally."],
  ["2026-08-18 13:25", "Warning", "The configured packet-loss threshold was exceeded on the Internet uplink."],
  ["2026-08-18 08:31", "Information", "Daily analytics aggregation completed successfully for LLDP_FDB."],
  ["2026-08-17 23:11", "Information", "The device DGS-1530-28SC A2:00 had its configuration synced successfully."],
  ["2026-08-17 17:36", "Information", "Wireless network SSID Staff-5G was enabled after scheduled maintenance."],
  ["2026-08-17 11:02", "Critical", "Device DGS-1250-52XP 7C:F0 could not reach its configured NTP server."],
].map(([time, severity, message]) => ({ time, severity: severity as Severity, message }));

const nav = ["▦", "⌁", "⌘", "▤", "▧", "♧", "▣", "▤", "⚙", "♧"];
const tabs = ["Overview", "Topology", "Devices", "Clients", "Wireless Insight", "Wired Insight", "AI Insight", "Logs"];
const periods = ["2026/08/17 - 2026/08/23 (W34)", "2026/08/10 - 2026/08/16 (W33)", "2026/08/03 - 2026/08/09 (W32)"];

function App() {
  const [activeTab, setActiveTab] = useState("Logs");
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("2026/08/17 - 2026/08/23 (W34)");
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const reportRef = useRef<HTMLElement>(null);
  const visibleLogs = logs.filter((log) => Object.values(log).join(" ").toLowerCase().includes(query.toLowerCase()));

  const downloadPdf = async () => {
    if (!reportRef.current) return;

    await document.fonts.ready;
    const report = reportRef.current;
    const canvas = await html2canvas(reportRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: report.scrollWidth,
      windowHeight: report.scrollHeight,
    });
    const margin = 32;
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width + margin * 2, canvas.height + margin * 2],
      hotfixes: ["px_scaling"],
    });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", margin, margin, canvas.width, canvas.height);
    pdf.save("LLDP_FDB-summary-report.pdf");
  };

  return <main className="app-shell">
    <aside className="rail" aria-label="Primary navigation"><button className="menu" aria-label="Open navigation">☰</button><div className="rail-items">{nav.map((item, index) => <button className={`rail-button ${index === 7 ? "selected" : ""}`} key={index} aria-label={`Navigation item ${index + 1}`}>{item}</button>)}</div><button className="bulb" aria-label="Help">☼</button></aside>
    <section className="workspace">
      <header className="topbar"><div className="brand"><span className="brand-mark">✣</span><span><strong>nuclias</strong><em>unity</em></span></div><button className="network-button">◉ <span>Network</span></button><button className="camera-button" aria-label="Camera">▰</button><div className="topbar-spacer" /><button className="icon-button" aria-label="Notifications">♧<i /></button><button className="profile" aria-label="Profile">♙</button></header>
      <div className="page"><div className="crumb-row"><label className="select-label"><span>ORG</span><select defaultValue="TEST"><option>TEST</option><option>DEMO</option></select></label><label className="select-label"><select defaultValue="LLDP_FDB"><option>LLDP_FDB</option><option>Headquarters</option></select></label><span className="back">‹</span><h1>Summary Report</h1></div>
        <section className="report-card" ref={reportRef}><div className="context">Analytic <b>›</b> LLDP_FDB</div><div className="range-row"><strong>Time Range</strong><div className="period-picker"><button type="button" className="period-select" onClick={() => setIsPeriodOpen((open) => !open)} aria-expanded={isPeriodOpen}>{period}<span>⌄</span></button>{isPeriodOpen && <div className="period-options">{periods.map((option) => <button type="button" key={option} onClick={() => { setPeriod(option); setIsPeriodOpen(false); }}>{option}</button>)}</div>}</div></div>
          <div className="tabs-row"><nav className="tabs" aria-label="Report sections">{tabs.map((tab) => <button className={activeTab === tab ? "active" : ""} onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>)}</nav><button className="export" onClick={downloadPdf}>↥ <span>Export</span></button></div>
          <div className="table-tools"><label className="search"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search time, severity, message" /><span>⌕</span></label><span>Showing {query ? visibleLogs.length : "624"}/{query ? visibleLogs.length : "624"} logs</span></div>
          <div className="log-table" role="table"><div className="table-head" role="row"><span>Time</span><span>Severity</span><span>Message</span></div>{visibleLogs.map((log, index) => <div className="table-row" role="row" key={`${log.time}-${index}`}><time>{log.time}</time><span className={`severity ${log.severity.toLowerCase()}`}>{log.severity}</span><p>{log.message}</p></div>)}{!visibleLogs.length && <div className="empty">No logs match your search.</div>}</div>
        </section>
      </div>
    </section><button className="assistant-bubble" aria-label="Support assistant">♙</button>
  </main>;
}

export default App;
