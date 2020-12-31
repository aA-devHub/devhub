export const calculateExperience = (jobsArray) => {
  if (!jobsArray.length) return 0;

  var years = 0;
  jobsArray.forEach((job) => {
    years += job.end.slice(0, 4) - job.start.slice(0, 4) || 1;
  });

  return `${years} year${years > 1 ? 's' : ''} of experience`;
};
