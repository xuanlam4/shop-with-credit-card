import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <Typography variant="h5">ShoeShop</Typography>
          <Typography variant="subtitle1">
            Address: 1 Hai Ba Trung, Dist.1, HCMC
          </Typography>
        </div>
        <ul className="footer__contact">
          <Typography variant="subtitle1">Follow us:</Typography>
          <li>
            <FacebookIcon></FacebookIcon>
          </li>
          <li>
            <InstagramIcon></InstagramIcon>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
