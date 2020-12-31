const SocialMedia = ({ socials, userName }) => {
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
      case 'instagram':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609451981/instagram_uk5pzd.png';
        socialLink = social.instagram;
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
      case 'linkedin':
        socialIcon =
          'https://res.cloudinary.com/willwang/image/upload/v1609451981/linkedin_k6foep.png';
        socialLink = social.linkedin;
        break;
      default:
        break;
    }

    return (
      <div className="social-icon" key={socialType}>
        <a href={socialLink} target="blank">
          <img src={socialIcon} alt={userName + `'s ` + socialType} />
        </a>
      </div>
    );
  });

  return <div className="social-icons">{socialIcons}</div>;
};

export default SocialMedia;
