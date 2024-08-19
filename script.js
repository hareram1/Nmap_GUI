document.getElementById('run-scan').addEventListener('click', function () {
    const target = document.getElementById('target').value;
    const options = document.getElementById('options').value;
    const resultsContainer = document.getElementById('results');
    const spinner = document.getElementById('spinner');

    // Clear previous results and show the spinner
    resultsContainer.textContent = '';
    spinner.classList.remove('hidden');

    // Run the Nmap command
    fetch('http://localhost:3000/run-nmap', {  // Adjust the URL to your server's endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target, options })
    })
    .then(response => response.json())  // Assuming the server responds with JSON
    .then(data => {
        // Hide the spinner and display the results
        spinner.classList.add('hidden');
        resultsContainer.textContent = data.output || 'No output from scan.';
    })
    .catch(error => {
        // Hide the spinner and show an error message
        spinner.classList.add('hidden');
        resultsContainer.textContent = `Error: ${error.message}`;
    });
});
