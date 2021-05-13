const fs = require('fs');
const path = require('path');
const tracker = require('./tracker');

function find(project, version) {
    let file = path.join(__dirname, `../assets/${project}`)

    const jarPath = path.join(file, `/${project}-${version}.jar`);
    const exists = fs.existsSync(jarPath);

    if (!exists) {
        return null;
    }

    tracker.update(project,version);
    return jarPath;
}

module.exports = find;