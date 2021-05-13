/*
 *  This file is part of DownloadTracker, licensed under the MIT License.
 *
 *  Copyright (c) Lorenzo0111
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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