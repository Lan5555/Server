const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const writePath = path.join(__dirname, 'database.json');
     

    // ✅ Handle API request first
    if (req.method === 'POST' && req.url === '/api/submit') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            let parsed;
            try {
                parsed = JSON.parse(body);
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Invalid JSON');
                return;
            }

            fs.readFile(writePath,'utf8',(err,fileData) => {
                let dataArray = [];
                if(!err){
                    try{
                        dataArray = JSON.parse(fileData);
                        if(!Array.isArray(dataArray)){
                            dataArray = [];
                        }
                    }catch(e){
                        dataArray = [];
                    }
                }
                dataArray.push(parsed);
            
            fs.writeFile(writePath, JSON.stringify(dataArray, null, 2), (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Unable to write to database');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify({message:'Successfully written to database'}));
                }
            });
        });

        });


        return; // ✅ IMPORTANT: stop further execution
    } else if (req.method === 'GET' && req.url === '/api/get-users') {
    fs.readFile(writePath, 'utf8', (err, fileData) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'No database exists' }));
            return;
        }

        try {
            const data = JSON.parse(fileData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data)); // ✅ send actual array
        } catch (e) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to parse database file' }));
        }
    });
    return;
}else if(req.method === 'GET' && req.url === '/api/get-hidden-item'){
    let left = generateRandomCode(100);
    let right = generateRandomCode(200);
    let secret = `${left}txn-sntp${right}`;
    //path to write
    let currentPath = path.join(__dirname,'winners.json');
    let winners = [];
    if((left % 2 == 0) && (right % 2 == 0)){
        winners.push({
            'code':secret
        });
        fs.writeFile(currentPath, JSON.stringify(winners, null,2), (err) => {
            if(err){
                res.writeHead(400,{'content-type':'text/plain'});
                res.end('Unable to write file');
            }else{
                console.log('File written successfully')
            }
        });
    }
    res.writeHead(200,{'content-type':'text/html'});
    res.end(`You <strong style="color:${(left % 2 == 0) && (right % 2 == 0) ? 'green': 'red'}">"${secret}"</strong> to claim your price. keep trying until both numbers at the side are even and color is green`);
    return;
}else if(req.method === 'POST' && req.url === '/api/claim-reward'){
    let currentPath = path.join(__dirname,'winners.json');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end',() => {
        let parsed;
        fs.readFile(currentPath,(err,fileData) => {
         parsed = JSON.parse(fileData);
        if(err){
            res.writeHead(404,{'content-type':'text/plain'});
            res.end('Unable to read file or file not found');
        }

        if(parsed[0]['code'] === body){
            res.writeHead(200,{'content-type':'text/html'});
            res.end(`<p style='color:green; font-size:24pt;'>Congrats you win send a screenshot</p>`);
        }
        
       });
    });
    
    
    return;
}


    // ✅ Serve static files
    const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    const fileExt = path.extname(filePath);

    const contentTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.txt': 'text/plain'
    };

    const contentType = contentTypes[fileExt] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});


function generateRandomCode(code){
    if(typeof code !== 'number' || isNaN(code)) return 0;
    return Math.floor(Math.random() * (code + 1) + 1);
    
}

server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:3000');
});
