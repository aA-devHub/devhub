// import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import React from 'react';
import { connect } from 'react-redux';
// import * as COLORS from '../../colors';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import SocialMedia from './social_media';
import ProjectCarousel from './project_carousel';

function ShowProfile({ currentUser, user, history }) {
  const tempUser = {
    id: '5fe90d636ee7c9ca9f6f2d23',
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

  const jobs = tempUser.experience.reverse().map((job) => (
    <div className="job">
      <span className="job-dates">
        {job.start.slice(0, 4) + ' – ' + job.end.slice(0, 4)}
      </span>
      <span className="job-company">{job.company}</span>
      <span className="job-position">{job.position}</span>
    </div>
  ));

  const skills = tempUser.skills.map((skill) => (
    <div className="skill">
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
            onClick={() => history.push('/edit')}
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
      <ProjectCarousel />
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
    user: store.entities.users[ownProps.match.params.id],
    projects: store.entities.projects,
  };
};

export default connect(mapSTP)(ShowProfile);
