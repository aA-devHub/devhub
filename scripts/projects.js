const Project = require('../models/Project');

const { fetchLanguages } = require('../frontend/src/util/github_api');
const uniqueElements = (arr) => [...new Set(arr)];

// Add tags from github languages
const tagProjects = async () => {
  const cursor = Project.find().cursor();
  for (
    let project = await cursor.next();
    project != null;
    project = await cursor.next()
  ) {
    if (project.githubLink) {
      try {
        let langs = await fetchLanguages(project.githubLink);
        if (langs.message) {
          // Not Found!!
          console.log(langs.message);
        } else {
          console.log('Tagging ', project.title, ' with ', langs);

          let techs = uniqueElements(
            project.technologies.concat(Object.keys(langs))
          );
          project.technologies = techs;
          project.save();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};

module.exports = {
  tagProjects,
};
