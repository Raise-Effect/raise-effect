import React from "react";
import { Link } from 'react-router';

let Footer = React.createClass({
  render: function() {
    return (
      <nav className="navbar footer navbar-inverse navbar-raise">
        <div className="container">
          <div>
              <div className="footer-header text-center">
                <Link to="/">Raise Effect</Link>  <br/><span className="sub-header text-center"><a href="http://www.hackoregon.org">A Hack Oregon Project</a></span>
              </div>
              <ul className="footer-nav nav-stacked text-center">
                  <li><Link to="/about">Study</Link></li>
                  <li><Link to="/discussion">Discussion</Link></li>
                  <li><Link to="/data">Data Deep Dive</Link></li>
                  <li><Link to="/team">Team</Link></li>
              </ul>
              <ul className="share-buttons text-center">
                <li>Share us on </li>
                <li><a href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.raiseeffect.org&t=" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&t=' + encodeURIComponent(document.URL)); return false;"><img src="/public/images/social/Facebook.png"/></a> | </li>
                <li><a href="https://twitter.com/intent/tweet?source=http%3A%2F%2Fwww.raiseeffect.org&text=:%20http%3A%2F%2Fwww.raiseeffect.org" target="_blank" title="Tweet" onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20'  + encodeURIComponent(document.URL)); return false;"><img src="/public/images/social/Twitter.png"/></a> | </li>
                <li><a href="https://plus.google.com/share?url=http%3A%2F%2Fwww.raiseeffect.org" target="_blank" title="Share on Google+" onclick="window.open('https://plus.google.com/share?url=' + encodeURIComponent(document.URL)); return false;"><img src="/public/images/social/Google+.png"/></a> | </li>
                <li><a href="http://www.reddit.com/submit?url=http%3A%2F%2Fwww.raiseeffect.org&title=" target="_blank" title="Submit to Reddit" onclick="window.open('http://www.reddit.com/submit?url=' + encodeURIComponent(document.URL) + '&title=' +  encodeURIComponent(document.title)); return false;"><img src="/public/images/social/Reddit.png"/></a></li>
              </ul>
          </div>
        </div>
      </nav>
    )
  }
});


export default Footer;
