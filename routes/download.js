const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const finder = require('../modules/finder');

router.get('/:project', async (req, res) => {
    const project = req.params.project;

    if (!project) {
        return res.json({
            error: true
        })
    }

    switch (project) {
        case "RocketJoin":
        case "RocketPlaceholders":
            const directory = path.join(__dirname, `../assets/${project}`)
            const info = fs.readFileSync(path.join(directory, `/info.json`));

            const version = JSON.parse(info)['latest'];

            const file = finder(project,version);

            if (!file) {
                return res.status(404).json({
                    error: true
                })
            }

            res.download(file);
            break;
        default:
            return res.json({
                error: true
            })
    }

});

router.get('/:project/:version', (req, res) => {
    const project = req.params.project;
    const version = req.params.version;

    if (!project || !version) {
        return res.json({
            error: true
        })
    }

    switch (project) {
        case "RocketJoin":
        case "RocketPlaceholders":
            const file = finder(project,version);

            if (!file) {
                return res.status(404).json({
                    error: true
                })
            }

            res.download(file);
            break;
        default:
            res.json({
                error: true
            })
            break;
    }

});

module.exports = router;