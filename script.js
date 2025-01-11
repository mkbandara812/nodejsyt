function downloadVideo() {
  const url = document.getElementById('url').value;
  const startTime = document.getElementById('start').value;
  const endTime = document.getElementById('end').value;
  const status = document.getElementById('status');

  if (!url || startTime === '' || endTime === '' || startTime >= endTime) {
    status.innerText = 'Please enter valid input values.';
    return;
  }

  status.innerText = 'Processing download... Please wait.';

  fetch('http://localhost:3000/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, startTime, endTime }),
  })
    .then(response => {
      if (response.ok) return response.blob();
      else throw new Error('Failed to download video');
    })
    .then(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'trimmed_video.mp4';
      downloadLink.click();
      status.innerText = 'Download successful!';
    })
    .catch(error => {
      console.error('Error:', error);
      status.innerText = 'Error downloading video.';
    });
}
