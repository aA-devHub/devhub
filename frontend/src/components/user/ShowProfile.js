import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import SocialMedia from './social_media';
import ProjectCarousel from './project_carousel';
import { fetchUser } from '../../actions/user_actions';

function ShowProfile({ currentUser, fetchUser, profileUser, history, match }) {
  useEffect(() => {
    fetchUser(match.params.id);
  }, []);

  if (profileUser == undefined) return null;

  const tempUser = {
    id: '5fec146c17aa2e1917d69701',
    handle: 'dev',
    name: 'frodo',
    title: 'Legend',
    location: 'Narnia, Africa',
    yearsOfExperience: 10,
    createdAt: '2020-12-27T22:40:35.596Z',
    bio:
      'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth. I like turtles.',
    email: 'dev@dev.com',
    experience: [
      {
        start: '1999-04-20',
        end: '2000-12-18',
        company: 'Google',
        position: 'Lead Stripper',
      },
      {
        start: '2001-01-18',
        end: '2009-07-30',
        company: "Applebee's",
        position: 'Back parking lot drug dealer',
      },
      {
        start: '2009-08-12',
        end: '2020-05-16',
        company: "Dirty D's Senior Center",
        position: 'Back massager',
      },
    ],
    imageUrl:
      'https://m.economictimes.com/thumb/msid-75515225,width-1200,height-900,resizemode-4,imgsize-119370/untitled-3.jpg',
    projects: ['5fea318d886a134ada343430'],
    skills: [
      { skill: 'javascript', level: 2 },
      { skill: 'ruby', level: 10 },
      { skill: 'turtles', level: 7 },
    ],
    socials: [
      { facebook: 'http://www.facebook.com' },
      { twitter: 'http://www.twitter.com' },
      { github: 'http://www.github.com' },
    ],
  };

  const tempProjects = [
    {
      title: 'Meth Lab',
      _id: '1',
      images: {
        hero:
          'https://www.hobbydb.com/processed_uploads/subject_photo/subject_photo/image/12781/1461967414-16468-4084/Screen_20Shot_202016-04-29_20at_204.02.35_20PM_large.png',
        secondaries: [
          'https://github.com/kaycbas/rocket/raw/main/app/assets/images/readme/list.png',
        ],
      },
    },
    {
      title: 'Creatine Gym',
      _id: '2',
      images: {
        hero:
          'https://randomwordgenerator.com/img/picture-generator/54e0dd474d51b10ff3d8992cc12c30771037dbf852547940752979d4974f_640.jpg',
        secondaries: [
          'https://github.com/kaycbas/rocket/raw/main/app/assets/images/readme/list.png',
        ],
      },
    },
    {
      title: 'Instagram Thot',
      _id: '3',
      images: {
        hero:
          'https://randomwordgenerator.com/img/picture-generator/57e6d4424a5aab14f1dc8460962e33791c3ad6e04e507440742f7cd0974fc1_640.jpg',
        secondaries: [
          'https://github.com/kaycbas/rocket/raw/main/app/assets/images/readme/list.png',
        ],
      },
    },
    {
      title: 'wewekhdajkhsajkf',
      _id: '4',
      images: {
        hero:
          'https://randomwordgenerator.com/img/picture-generator/brushes-1683134_640.jpg',
        secondaries: [
          'https://github.com/kaycbas/rocket/raw/main/app/assets/images/readme/list.png',
        ],
      },
    },
    {
      title: 'Cookies',
      _id: '5',
      images: {
        hero:
          'https://randomwordgenerator.com/img/picture-generator/55e3dd404253a814f1dc8460962e33791c3ad6e04e50744076287ad39e49c6_640.jpg',
        secondaries: [
          'https://github.com/kaycbas/rocket/raw/main/app/assets/images/readme/list.png',
        ],
      },
    },
  ];

  const jobs = tempUser.experience.reverse().map((job, idx) => (
    <div className="job" key={idx}>
      <span className="job-dates">
        {job.start.slice(0, 4) + ' – ' + job.end.slice(0, 4)}
      </span>
      <span className="job-company">{job.company}</span>
      <span className="job-position">{job.position}</span>
    </div>
  ));

  const skills = tempUser.skills.map((skill, idx) => (
    <div className="skill" key={idx}>
      <span className="skill-name">{skill.skill}</span>
      <div className="skill-level-container">
        <div className="skill-level" style={{ width: skill.level * 10 }}></div>
      </div>
    </div>
  ));

  return (
    <React.Fragment>
      <div className="user-header">
        <div className="icon-overlay">
          <div className="back-icon pointer" onClick={() => history.goBack()}>
            <ArrowBackIosIcon />
          </div>
          <div
            className="edit-icon pointer"
            onClick={() => history.push('/users/edit')}
          >
            {currentUser && currentUser.id === tempUser.id ? <EditIcon /> : ''}
          </div>
        </div>
        <div className="user-image-container">
          <div className="user-image">
            <img src={tempUser.imageUrl} alt={tempUser.name + `'s Image`} />
          </div>
        </div>
        <div className="user-info">
          <h1 className="user-name">{tempUser.name}</h1>
          <h2 className="user-title">{tempUser.title}</h2>
          <p className="user-bio">{tempUser.bio}</p>
          <SocialMedia socials={tempUser.socials} userName={tempUser.name} />
        </div>
      </div>
      <ProjectCarousel projects={tempProjects} />
      <div className="user-details">
        <div className="work-info">
          <h3 className="info-title">Work</h3>
          {jobs}
        </div>
        <div className="skills">
          <h3 className="info-title">Skills</h3>
          {skills}
        </div>
        <div className="extra-info">
          <h3 className="info-title">Info</h3>
          <span>{tempUser.location}</span>
          <span>
            {tempUser.yearsOfExperience} year
            {tempUser.yearsOfExperience > 1 ? 's' : ''} of experience
          </span>
          <span>Member since {tempUser.createdAt.slice(0, 4)}</span>
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
  };
};

export default connect(mapSTP, mapDTP)(ShowProfile);
