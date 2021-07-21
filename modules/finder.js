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

const tracker = require('./tracker');
const { Octokit } = require("@octokit/rest");
const octokit = new Octokit();

async function find(project, version) {
    let release;

    const data = JSON.parse(String(process.env.DATA));
    let owner;

    for (const user of data) {
        try {
            const repo = await octokit.repos.get({
                owner: user,
                repo: project,
            })

            if (repo) {
                owner = user;
            }
        } catch (e) {}
    }

    if (owner == null) {
        return null;
    }

    try {
        if (version) {

                release = await octokit.repos.getReleaseByTag({
                    owner: owner,
                    repo: project,
                    tag: version
                });

        } else {
            release = await octokit.repos.getLatestRelease({
                owner: owner,
                repo: project
            });
        }
    } catch (e) {
        return null;
    }

    if (!release) {
        return null;
    }

    if (release.data.assets.length === 0) {
        return null;
    }

    tracker.update(project,version);
    return release.data.assets[0];
}

module.exports = find;