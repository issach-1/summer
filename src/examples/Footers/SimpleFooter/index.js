

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import React from "react"

// @mui material components
import Container from "@mui/material/Container";

// Material Kit 2 React components
import MKBox from "components/MKBox";
// Material Kit 2 React base styles
import typography from "assets/theme/base/typography";

function SimpleFooter({ company, light }) {
  const { href, name } = company;
  const { size } = typography;

  return (
    <Container>
      <MKBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color={light ? "white" : "text"}
          fontSize={size.sm}
        >
          &copy; {new Date().getFullYear()}, A.R.M.Y summer camp registration form
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of SimpleFooter
SimpleFooter.defaultProps = {
  company: { href: "", name: "A.R.M.Y" },
  light: false,
};

// Typechecking props for the SimpleFooter
SimpleFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.shape),
  light: PropTypes.bool,
};

export default SimpleFooter;
