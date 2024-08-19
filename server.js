const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/run-nmap', (req, res) => {
    const { target, options } = req.body;
    
    // Construct the Nmap command
    const nmapCommand = `nmap ${options} ${target}`;

    // Execute the Nmap command
    exec(nmapCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        // Send the command output back to the frontend
        res.json({ output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Nmap server running at http://localhost:${port}`);
});
