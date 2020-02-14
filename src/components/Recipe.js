import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3)
  }
}));

const Recipe = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState("credit_card");
  const handleChange = event => {
    setValue(event.target.value);
  };

  return (
    <div className="recipe">
      <Typography component="h5" variant="h5">
        Your recipe:
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Payment methods</FormLabel>
          <RadioGroup
            aria-label="payment meds"
            name="payment"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="credit_card"
              control={<Radio />}
              label="Credit card (Recommended)"
            />
            <FormControlLabel value="COD" control={<Radio />} label="COD" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Shipping address</FormLabel>
          <Input></Input>
        </FormControl>
        <div>
          <Typography variant="h4">Total: {props.shoes.total}$</Typography>
          <Link to="/credit-card">
            <Button color="secondary" variant="contained">
              Checkout!
            </Button>
          </Link>
        </div>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => ({
  shoes: state.shoes
});

export default connect(mapStateToProps, null)(Recipe);
