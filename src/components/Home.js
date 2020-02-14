import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { addToCart } from "../actions/cart";

import "./style.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 280
  },
  media: {
    height: 200
  }
});

const Home = props => {
  const handleClick = id => {
    props.addToCart(id);
  };

  const classes = useStyles();
  const { items } = props.shoes;
  let shoesList = items.map(item => {
    return (
      <Card className={classes.root} onClick={() => handleClick(item.id)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.img}
            title={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.desc}
            </Typography>
            <Typography variant="h6">Price: {item.price}$</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  });

  return (
    <div className="home">
      <div className="home__title">Our products</div>
      <div className="home__container">{shoesList}</div>
    </div>
  );
};

const mapsStateToProps = state => ({
  shoes: state.shoes
});

export default connect(mapsStateToProps, { addToCart })(Home);
