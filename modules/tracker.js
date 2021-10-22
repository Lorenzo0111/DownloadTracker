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
const {Database} = require('sqlite3').verbose();
const db = new Database("database.db");

db.run("CREATE TABLE IF NOT EXISTS `downloads` (`project` TEXT NOT NULL, `version` TEXT NOT NULL, `downloads` INT NOT NULL DEFAULT '0', PRIMARY KEY (`project`));");

function update(project, version) {
    try {
        db.run("INSERT OR IGNORE INTO `downloads` (`project`,`version`,`downloads`) VALUES (?,?,0);", project, version);
        db.run("UPDATE `downloads` SET `downloads` = `downloads` + 1 WHERE `project` = ? AND `version` = ?;", project, version);
    } catch (e) {
        console.log("An error has occurred: " + e )
    }
}

module.exports = {
    update: update,
};