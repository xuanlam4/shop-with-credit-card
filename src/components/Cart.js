import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Button from "@material-ui/core/Button";

import { removeFromCart, addQuantity, subQuantity } from "../actions/cart";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 300
  }
}));

const Cart = props => {
  const classes = useStyles();

  const { addedItems } = props.shoes;

  const handleAddQuantity = id => {
    props.addQuantity(id);
  };

  const handleSubQuantity = id => {
    props.subQuantity(id);
  };

  const handleRemove = id => {
    props.removeFromCart(id);
  };

  const onCheckout = () => {
    props.history.push("/checkout");
  };

  if (addedItems.length) {
    var addedShoes = addedItems.map(item => {
      item.selectedSize = props.size;

      return (
        <Card className={classes.root} variant="outlined">
          <CardMedia
            className={classes.cover}
            image={item.img}
            title={item.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {item.title}
              </Typography>
              <Typography variant="subtitle">{item.price}$</Typography>
              <br />
              <br />
              <Typography variant="subtitle1" color="textSecondary">
                <Button onClick={() => handleSubQuantity(item.id)}>
                  <RemoveCircleIcon color="secondary"></RemoveCircleIcon>
                </Button>
                Quantity: {item.quantity}
                <Button onClick={() => handleAddQuantity(item.id)}>
                  <AddCircleIcon color="secondary"></AddCircleIcon>
                </Button>
              </Typography>
              <Typography variant="subtitle2">Size: {props.size}</Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemove(item.id)}
              >
                REMOVE
              </Button>
            </CardContent>
          </div>
        </Card>
      );
    });
  } else {
    var addedShoes = <div className="cart__empty">Cart is empty.</div>;
  }

  return (
    <div className="cart">
      <div className="cart__title">Your cart</div>
      <div className="cart__container">
        <div className="cart__items">{addedShoes}</div>
        {addedShoes.length && (
          <div className="cart__summary">
            <Typography variant="h4">Total: {props.shoes.total}$</Typography>
            <br />
            <Button
              color="secondary"
              variant="contained"
              className={classes.button}
              onClick={onCheckout}
            >
              Checkout!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  shoes: state.shoes
});

export default connect(mapStateToProps, {
  removeFromCart,
  addQuantity,
  subQuantity
})(Cart);
