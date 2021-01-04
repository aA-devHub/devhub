import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import SocialMedia from './social_media';
import ProjectCarousel from './project_carousel';
import { fetchUser } from '../../actions/user_actions';
import { sendMessage } from '../../actions/message_actions';
import * as userHelpers from './user_helpers';
import MessageBox from '../project/MessageModal';
function ShowProfile({
  currentUser,
  fetchUser,
  profileUser,
  projects,
  history,
  match,
  sendMessage,
}) {
  useEffect(() => {
    fetchUser(match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profileUser === undefined) return null;

  const renderSocials = () => {
    if (profileUser.socials) {
      return (
        <SocialMedia
          socials={profileUser.socials}
          userName={profileUser.name}
        />
      );
    } else {
      return;
    }
  };

  const renderProjects = () => {
    if (projects.length) {
      return <ProjectCarousel projects={projects} />;
    }
  };

  const renderNoProjects = () => {
    if (!projects.length) {
      return (
        <div className="no-projects">
          <img
            alt={profileUser.name + ' hasn`t uploaded any projects yet.'}
            src="https://res.cloudinary.com/willwang/image/upload/v1609438837/Group_11_fpxjjr.png"
          />
        </div>
      );
    }
  };

  const renderJobs = () => {
    if (!profileUser.experience.length) return;

    const jobs = profileUser.experience.reverse().map((job, idx) => (
      <div className="job" key={idx}>
        <span className="job-dates">
          {job.start.slice(0, 4) + ' – ' + job.end.slice(0, 4)}
        </span>
        <span className="job-company">{job.company}</span>
        <span className="job-position">{job.position}</span>
      </div>
    ));

    return (
      <div className="work-info">
        <h3 className="info-title">Work</h3>
        {jobs}
      </div>
    );
  };

  const renderSkills = () => {
    if (!Object.values(profileUser.skills).length) return;

    var skills = [];

    Object.entries(profileUser.skills).forEach(([skill, value], idx) => {
      skills.push(
        <div className="skill" key={idx}>
          <span className="skill-name">{skill}</span>
          <div className="skill-level-container">
            <div className="skill-level" style={{ width: value * 10 }}></div>
          </div>
        </div>
      );
    });

    return (
      <div className="skills">
        <h3 className="info-title">Skills</h3>
        {skills}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="user-header">
        <div className="icon-overlay">
          <div className="back-icon pointer" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </div>
        </div>
        <div className="user-image-container">
          <div className="user-image">
            <img
              src={profileUser.imageUrl}
              alt={profileUser.name + `'s Image`}
            />
          </div>
        </div>
        <div className="user-info">
          <h1 className="user-name">{profileUser.name}</h1>
          <h2 className="user-title">{profileUser.title}</h2>

          {currentUser._id === profileUser._id ? (
            <div></div>
          ) : (
            <MessageBox
              style={{ marginTop: 50, marginBottom: 30 }}
              receiverId={profileUser._id}
              avatar={profileUser.imageUrl}
              userName={profileUser.name}
              sendMessage={sendMessage}
            />
          )}
          <p className="user-bio">{profileUser.bio}</p>
          {renderSocials()}
        </div>
      </div>
      {renderProjects()}
      <div className="user-details">
        {renderNoProjects()}
        {renderJobs()}
        {renderSkills()}
        <div className="extra-info">
          <h3 className="info-title">Info</h3>
          <span>{profileUser.location}</span>
          <span>{userHelpers.calculateExperience(profileUser.experience)}</span>
          <span>Member since {profileUser.createdAt.slice(0, 4)}</span>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapSTP = (store, ownProps) => {
  return {
    currentUser: store.session.user,
    profileUser: store.entities.users[ownProps.match.params.id],
    projects: Object.values(store.entities.projects),
  };
};

const mapDTP = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    sendMessage: (message) => dispatch(sendMessage(message)),
  };
};

export default connect(mapSTP, mapDTP)(ShowProfile);
