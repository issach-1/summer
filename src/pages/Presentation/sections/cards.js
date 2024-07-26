/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

import "./card.css"
function Cards() {
  return (
    <MKBox className="z-index" component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid className="pad" item xs={12} lg={4} sx={{ mx: "auto" }}>
            <div className="card">
              <div className="card-img"></div>
              <div className="card-text">- Life Changing Lessons !</div>
            </div>
          </Grid>
          <Grid className="pad" item xs={12} lg={4} sx={{ mx: "auto" }}>
            <div className="card-2">
              <div className="card-img"></div>
              <div className="card-text">- Fellowship !</div>
            </div>
          </Grid>
          <Grid className="pad" item xs={12} lg={4} sx={{ mx: "auto" }}>
            <div className="card-3">
              <div className="card-img"></div>
              <div className="card-text">- Character Building !</div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Cards;
