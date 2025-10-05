document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('scrapeForm');
  const numPagesInput = document.getElementById('numPages');
  const resultBox = document.getElementById('resultBox');

  document.querySelectorAll('input[name="pagesMode"]').forEach(el => {
    el.addEventListener('change', (e) => {
      numPagesInput.disabled = e.target.value === 'max';
    })
  })

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    resultBox.innerHTML = '<em>Running scraper...</em>';
    const formData = new FormData(form);
    const payload = {
      region: formData.get('region'),
      pagesMode: formData.get('pagesMode'),
      numPages: formData.get('numPages') || '',
      keywords: document.getElementById('keywords').value || ''
    };
    try {
      const res = await fetch('/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json();
        resultBox.innerHTML = '<pre>' + (err.error || JSON.stringify(err)) + '</pre>';
        return;
      }
      const json = await res.json();
      resultBox.innerHTML = `<div>Saved file: <strong>${json.file}</strong></div><div style="margin-top:8px"><a href="/result.html?file=${encodeURIComponent(json.file)}" target="_blank">View result</a></div><pre>${json.content.slice(0,1000)}${json.content.length>1000? '\n\n...truncated...':''}</pre>`;
    } catch (e) {
      resultBox.innerHTML = '<pre>' + e.toString() + '</pre>';
    }
  });
});
