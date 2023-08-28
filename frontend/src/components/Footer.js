import React from "react";

function Footer({ loggedIn }) {
  return (
    <footer className={loggedIn ? "footer" : "footer_disabled"}>
      <p className="footer__copyright">© 2023 AT</p>
    </footer>
  );
}

export default Footer;
