import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { addToCart } from "../actions/cart";
import { selectItem } from "../actions/shoe";

import "./style.css";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 280
  },
  media: {
    height: 200
  },
  formControl: {
    minWidth: 140
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const sortTypes = {
  up: {
    fn: (a, b) => a.price - b.price
  },
  down: {
    fn: (a, b) => b.price - a.price
  },
  default: {
    fn: (a, b) => a
  }
};

const Home = props => {
  const [sort, setSort] = React.useState("default");

  const handleClickItem = id => {
    props.selectItem(id);
  };

  const handleSortChange = e => {
    setSort(e.target.value);
  };

  const filteredItems = props.shoes.items.filter(item => {
    return (
      item.title.toLowerCase().indexOf(props.searchValue.toLowerCase()) !== -1
    );
  });

  const classes = useStyles();
  let shoesList = filteredItems.sort(sortTypes[sort].fn).map(item => {
    return (
      <Link to="/detail">
        <Card className={classes.root} onClick={() => handleClickItem(item.id)}>
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
      </Link>
    );
  });

  return (
    <div className="home">
      <div className="home__title">Our products</div>
      <div className="home__filters">
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Sort by:
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={sort}
            onChange={handleSortChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="default" default>
              Default
            </MenuItem>
            <MenuItem value="up">Price (Low to High)</MenuItem>
            <MenuItem value="down">Price (High to Low)</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="home__container">{shoesList}</div>
    </div>
  );
};

const mapsStateToProps = state => ({
  shoes: state.shoes
});

export default connect(mapsStateToProps, { addToCart, selectItem })(Home);
