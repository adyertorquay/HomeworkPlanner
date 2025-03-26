// icsExport.js (client-side fetcher for API route)

export function generateICS(tasks, callback) {
  fetch("/api/generate-ics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tasks }),
  })
    .then((res) => res.blob())
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      callback(url);
    })
    .catch((err) => {
      console.error("ICS generation failed:", err);
    });
}
