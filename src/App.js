
import { useState } from "react";

export default function ReportView() {
  const [alerts, setAlerts] = useState([]);
  const [report, setReport] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const lines = event.target.result.split("\n").filter(Boolean);
      const headers = lines[0].split(",");
      const data = lines.slice(1).map((line) => {
        const fields = line.split(",");
        return Object.fromEntries(headers.map((h, i) => [h.trim(), fields[i]?.trim()]));
      });
      setAlerts(data);
      generateReport(data);
    };
    reader.readAsText(file);
  };

  const generateReport = (data) => {
    const mttrList = [];
    let open = 0, resolved = 0, total = 0, falsePositives = 0;

    data.forEach(alert => {
      total++;
      const status = alert.status?.toLowerCase();
      if (status === "resolved") {
        resolved++;
        const opened = new Date(alert.opened);
        const closed = new Date(alert.closed);
        const duration = (closed - opened) / 3600000;
        if (!isNaN(duration)) mttrList.push(duration);
      } else {
        open++;
      }
      if (alert.classification?.toLowerCase() === "false positive") {
        falsePositives++;
      }
    });

    const avgMTTR = mttrList.length ? (mttrList.reduce((a, b) => a + b, 0) / mttrList.length).toFixed(2) : "N/A";
    const fpRate = ((falsePositives / total) * 100).toFixed(1);

    setReport({
      total,
      resolved,
      open,
      avgMTTR,
      falsePositives,
      fpRate,
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">SecOps Report Generator</h1>
      <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-4" />

      {report && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Stat label="Total Alerts" value={report.total} />
            <Stat label="Resolved Cases" value={report.resolved} />
            <Stat label="Open Cases" value={report.open} />
            <Stat label="Avg MTTR (hrs)" value={report.avgMTTR} />
            <Stat label="False Positives" value={report.falsePositives} />
            <Stat label="False Positive Rate" value={`${report.fpRate}%`} />
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
            <h2 className="text-lg font-semibold mb-1">Summary</h2>
            <p className="text-sm">
              Over the reporting period, the SOC handled {report.total} alerts. {report.resolved} were resolved,
              averaging a Mean Time to Resolution of {report.avgMTTR} hours. {report.fpRate}% were false positives.
              Focus areas include reducing open case volume and false positive sources.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-gray-100 p-4 rounded text-center shadow-sm">
      <div className="text-xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
