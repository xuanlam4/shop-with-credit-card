import React from "react";
import { connect } from "react-redux";

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

import validateShipping from "../validation/validateShipping";
import { clearCart } from "../actions/cart";

const useStyles = makeStyles(theme => ({
  form: {
    "& > *": {
      margin: theme.spacing(1),
      maxWidth: "100%"
    }
  },
  root: {
    display: "flex",
    padding: "0 20px",
    marginBottom: 10
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 200
  },
  summary: {
    "& > *": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 10
    }
  }
}));

const theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 900,
      fontStyle: "italic",
      textTransform: "uppercase"
    }
  }
});

const Checkout = props => {
  const classes = useStyles();

  const [inputs, setInputs] = React.useState({
    shippingMethod: "regular",
    paymentMethod: "credit-card"
  });
  const [errors, setErrors] = React.useState({});

  const onChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = e => {
    const validation = validateShipping(inputs);
    if (validation.isValid) {
      if (inputs.paymentMethod === "credit-card") {
        props.history.push("/credit-card");
      } else {
        props.clearCart();
        props.history.push("/thank-you");
      }
    } else {
      setErrors(validation.errors);
    }
  };

  const { addedItems, total } = props.shoes;

  return (
    <ThemeProvider theme={theme}>
      <div className="checkout__container">
        <div className="checkout__form">
          <form className={classes.form}>
            <Typography variant="h5">Shipping/Payment</Typography>
            <TextField
              // error
              required
              fullWidth
              id="standard-full-width-required"
              label="Name"
              name="name"
              value={inputs.name}
              onChange={onChange}
              helperText={errors.name}
            />
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Address"
              name="address"
              value={inputs.address}
              onChange={onChange}
              helperText={errors.address}
            />
            <TextField
              required
              fullWidth
              id="standard-required"
              label="City"
              name="city"
              value={inputs.city}
              onChange={onChange}
              helperText={errors.city}
            />
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Country"
              name="country"
              value={inputs.country}
              onChange={onChange}
              placeholder="Vietnam"
              helperText={errors.country}
            />
            <TextField
              fullWidth
              id="standard"
              label="Postcode"
              name="postcode"
              value={inputs.postcode}
              onChange={onChange}
            />
            <TextField
              required
              fullWidth
              id="standard-required"
              label="Phone Number"
              name="phonenumber"
              value={inputs.phonenumber}
              onChange={onChange}
              helperText={errors.phonenumber}
            />
            <FormLabel component="legend">Shipping method</FormLabel>
            <RadioGroup
              aria-label="Shipping method"
              name="shippingMethod"
              value={inputs.shippingMethod}
              onChange={onChange}
            >
              <FormControlLabel
                value="regular"
                control={<Radio />}
                label="Regular"
              />
              <FormControlLabel
                value="express"
                control={<Radio />}
                label="Express (+5$)"
              />
            </RadioGroup>
            <FormLabel component="legend">Payment method</FormLabel>
            <RadioGroup
              aria-label="Payment method"
              name="paymentMethod"
              value={inputs.paymentMethod}
              onChange={onChange}
            >
              <FormControlLabel
                value="credit-card"
                control={<Radio />}
                label="Credit card (Recommended)"
              />
              <FormControlLabel value="cod" control={<Radio />} label="COD" />
            </RadioGroup>
          </form>
        </div>
        <div className="checkout__info">
          <div className="checkout__cart">
            <Typography variant="h5">Your cart</Typography>
            <br />
            {addedItems.map(item => (
              <Card className={classes.root} variant="outlined">
                <CardMedia
                  className={classes.cover}
                  image={item.img}
                  title={item.title}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle">{item.price}$</Typography>
                    <Typography variant="subtitle2">
                      Size: {item.selectedSize}
                    </Typography>
                    <Typography variant="subtitle2">
                      Qty: {item.quantity}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          <div className="checkout__summary">
            <Typography variant="h5">Summary</Typography>
            <br />
            <Card>
              <CardContent className={classes.summary}>
                <div>
                  <Typography variant="h6">Sub-total</Typography>
                  <Typography variant="h6">{total}</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Shipping</Typography>
                  <Typography variant="subtitle2">
                    {inputs.shippingMethod === "express" ? 5 : 0}$
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">
                    {inputs.shippingMethod === "express" ? total + 5 : total}$
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
          <Button
            color="secondary"
            variant="contained"
            onClick={onSubmit}
            fullWidth
          >
            NEXT
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = state => ({
  shoes: state.shoes
});

export default connect(mapStateToProps, { clearCart })(Checkout);
