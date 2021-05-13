const router = require('express').Router();
const path = require('path');
const scan = require('../modules/scanner');

router.get('/all', (req, res) => {
    scan(path.join(__dirname, `../assets`), (err,dir) => {
        if (err) {
            return res.json({
                error: true
            });
        }

        const filter = dir.filter((item) => {
            return path.extname(item) !== '.json';
        })

        res.json(filter)
    });
})

router.get('/:project', (req, res) => {
    const project = req.params.project;

    const projects = ["RocketJoin", "RocketPlaceholders"];

    if (!projects.includes(project)) {
        return res.status(400).json({
            error: true,
            message: "Project not found"
        })
    }

    scan(path.join(__dirname, `../assets/${project}`), (err,dir) => {
        if (err) {
            return res.json({
                error: true
            });
        }

        const filter = dir.filter((item) => {
            return path.extname(item) !== '.json';
        })

        res.json(filter)
    });
})

module.exports = router;