import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export function LiveClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 47);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="live-clock" aria-label={`Local time ${formatTime(now)}`}>
      <span className="live-clock-label">Local time</span>
      <time dateTime={now.toISOString()}>{formatTime(now)}</time>
    </div>
  );
}
