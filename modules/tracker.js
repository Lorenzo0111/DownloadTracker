const Project = require('../models/Project');

function update(project, version) {
    Project.findOneAndUpdate({project: project, version: version}, {$inc : {'downloads' : 1}}).exec().then((result) => {
        if (!result) {
            return new Project({project: project, version: version}).save();
        }
    });
}

module.exports = {
    update: update
};