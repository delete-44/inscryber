import React from "react";

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
      <label htmlFor="inscrybe-image" className="align-super">
        Inscrybe Image
      </label>
    </>
  );
};

export default Inscryber;
