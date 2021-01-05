// get array of project images, handle possible missing data
export const getImageArray = (project) => {
  const { hero, secondaries } = project.images;
  return hero && secondaries ? [hero].concat(secondaries) : hero || secondaries;
};

export const byDate = (a, b) =>
  Date.parse(b.createdAt) - Date.parse(a.createdAt);
export const byPopularity = (a, b) => b.numFavorites - a.numFavorites;
export const sortProjects = (projects, sorter) => {
  if (!projects || !Object.values(projects).length) return null;
  let res = Object.values(projects);
  res.sort((a, b) => sorter(a, b));
  return res;
};
