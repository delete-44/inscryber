import React from "react";
import PropTypes from "prop-types";

const Inscryber = (props) => {
  const { setInscrybed } = props;

  return (
    <>
      {" "}
      <input
        type="checkbox"
        name="costRadio"
        id="inscrybe-image"
        checked={props.inscrybed}
        onChange={(e) => setInscrybed(e.target.checked)}
      />
      <label htmlFor="inscrybe-image">Inscrybe Image</label>
    </>
  );
};

Inscryber.propTypes = {
  inscrybed: PropTypes.bool.isRequired,
  setInscrybed: PropTypes.func.isRequired,
};

export default Inscryber;
