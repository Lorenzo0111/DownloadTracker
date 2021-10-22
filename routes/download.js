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
const { https } = require('follow-redirects');
const finder = require('../modules/finder');

router.get('/', async (req, res) => {
    return res.status(400).json({
        error: true,
        message: "Specify a project"
    })
})

router.get('/:project', async (req, res) => {
    const project = req.params.project;

    if (!project) {
        return res.json({
            error: true
        })
    }

    const file = await finder(project,null);

    if (!file) {
        return res.status(404).json({
            error: true
        })
    }

    download(file, res);

});

router.get('/:project/:version', async (req, res) => {
    const project = req.params.project;
    const version = req.params.version;

    if (!project || !version) {
        return res.json({
            error: true
        })
    }

    const file = await finder(project,version);

    if (!file) {
        return res.status(404).json({
            error: true
        })
    }

    download(file, res);
});

function download(data, res) {
    const options = {
        'method': 'GET',
        'headers': {
            'Content-disposition': `attachment;"`,
            'Content-type': 'application/octet-stream'
        }
    };

    https.get(data.browser_download_url, options, (response) => {
        res.header('Content-Disposition', `filename="${data.name}`)
        response.pipe(res)
    })

}

module.exports = router;