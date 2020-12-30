const SocialMedia = ({ socials }) => {
  if (!socials.length) return null;

  const socialIcons = socials.map((social) => {
    const socialType = Object.keys(social)[0];
    let socialIcon, socialLink;

    switch (socialType) {
      case 'facebook':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/fb_zkz2ev.png';
        socialLink = social.facebook;
        break;
      case 'twitter':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/twitter_crwwns.png';
        socialLink = social.twitter;
        break;
      case 'github':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/gh_syxrpn.png';
        socialLink = social.github;
        break;
    }

    return (
      <div className="social-icon" key={socialType}>
        <a href={socialLink} target="blank">
          <img src={socialIcon} />
        </a>
      </div>
    );
  });

  return <div className="social-icons">{socialIcons}</div>;
};

export default SocialMedia;
