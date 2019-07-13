import React from 'react';
import Icon from './Icon';

const IconLink = ({ name, href, children }) => (
  <a href={href} className="flex ml2"><Icon name={name} className={children && 'mr2'} />{children}</a>
);

const Header = () => (
  <header className="flex flex-row justify-between items-center">
    <h1 className="ma0 f2 fw2 normal ttl">Euan Marten</h1>
    <ul className="list pa0 ma0 f5 ttl flex flex-row">
      <li><IconLink href="https://www.instagram.com/e.seilide/" name="INSTAGRAM" /></li>
      <li><IconLink href="https://e-seilide.tumblr.com" name="TUMBLR" /></li>
      <li><IconLink href="http://twitter.com/e_seilide" name="TWITTER" /></li>
      <li><IconLink href="mailto:euansmarten@gmail.com" name="EMAIL"><span className="lh-title">euansmarten@gmail.com</span></IconLink></li>
    </ul>
  </header>
);

export default Header;
