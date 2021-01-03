const SocialMedia = ({ socials, userName }) => {
  if (!Object.keys(socials).length) return null;
  var socialIcons = [];

  Object.entries(socials).forEach(([socialName, socialLink]) => {
    if (!socialLink) return;

    let socialIcon;
    switch (socialName) {
      case 'facebook':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/fb_zkz2ev.png';
        break;
      case 'instagram':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609451981/instagram_uk5pzd.png';
        break;
      case 'twitter':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/twitter_crwwns.png';
        break;
      case 'github':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609282516/gh_syxrpn.png';
        break;
      case 'linkedin':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609451981/linkedin_k6foep.png';
        break;
      default:
        break;
    }

    socialIcons.push(
      <div className="social-icon" key={socialName}>
        <a href={'http://' + socialLink} target="blank">
          <img src={socialIcon} alt={userName + `'s ` + socialName} />
        </a>
      </div>
    );
  });

  return <div className="social-icons">{socialIcons}</div>;
};

export default SocialMedia;
