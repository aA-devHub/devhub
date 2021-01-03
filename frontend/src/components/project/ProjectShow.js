import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { fetchProject } from '../../actions/project_actions';
import Drawer from './drawers/Drawers';
import * as ImageWall from './ImageWall';
import * as TechChart from './TechChart';
import * as Feature from './Feature';
import FutureFeatures from './FutureFeatures';
import Description from './Description';

function Project({ project, fetchProject, users }) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState({});
  const [comments, setComments] = useState([]);
  const [features, setFeatures] = useState([]);
  const [futureFeatures, setFutureFeatures] = useState([]);
  const [overviewLayout, setOverviewLayout] = useState(1);
  const [languageChart, setLanguageChart] = useState(1);
  const [featuresLayout, setFeaturesLayout] = useState(1);
  const [githubLink, setGithubLink] = useState('');
  const [colors, setColors] = useState(0);
  const [technologies, setTechnologies] = useState([]);
  // const []
  useEffect(() => {
    fetchProject(id).then((data) => {
      const { project } = data;
      setComments(data.comments);
      setUser(users[project.user]);
      setTitle(project.title);
      setDescription(project.description);
      setImages(project.images);
      setFeatures(project.features);
      setFutureFeatures(project.futureFeatures);
      setOverviewLayout(project.ui.overviewLayout);
      setLanguageChart(project.ui.languageChart);
      setColors(project.ui.colors);
      setFeaturesLayout(project.ui.featuresLayout);
      setGithubLink(project.githubLink);
      setTechnologies(project.technologies);
    });
  }, []);
  const renderImageWall = (theme) => {
    switch (theme) {
      case 1:
        return ImageWall.Carousel(images);
      case 2:
        return ImageWall.Mason(images);
      case 3:
        return ImageWall.Three(images);
      default:
        return ImageWall.Carousel(images);
    }
  };
  const renderTechChart = (theme) => {
    switch (theme) {
      case 1:
        return TechChart.BarChart(technologies);
      case 2:
        return TechChart.PieChart(technologies);
      default:
        return TechChart.PieChart(technologies);
    }
  };
  const renderFeatures = (theme) => {
    switch (theme) {
      case 1:
        return Feature.Carousel(features);
      case 2:
        return Feature.Horiz(features);
      case 3:
        return Feature.Vertical(features);
      default:
        return Feature.Carousel(features);
    }
  };

  return (
    <div>
      <Drawer />
      {renderImageWall(overviewLayout)}
      <Description description={description} />
      {renderTechChart(languageChart)}
      {renderFeatures(featuresLayout)}
      <FutureFeatures features={futureFeatures} />
    </div>
  );
}
export default connect(
  (state, ownProps) => ({
    users: state.entities.users,
    currentUser: state.entities.users,
    project: state.entities.projects[ownProps.match.params.id],
  }),
  (dispatch) => ({
    fetchProject: (id) => dispatch(fetchProject(id)),
  })
)(Project);
