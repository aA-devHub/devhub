// get array of project images, handle possible missing data
export const getImageArray = (project) => {
  const { hero, secondaries } = project.images;
  return hero && secondaries ? [hero].concat(secondaries) : hero || secondaries;
};

export const sortByPopularity = (projects) => {
  let res = Object.values(projects);
  res.sort((a, b) => a.favorites.length < b.favorites.length);
  return res;
};
