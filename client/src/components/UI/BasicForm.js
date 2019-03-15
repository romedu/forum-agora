import React from "react";

const BasicForm = ({value, updateInputHandler, submitFormHandler}) => {
   return (
      <form onSubmit={submitFormHandler}>
         <input type="text" value={value} onChange={updateInputHandler} />
         <button>
            Submit
         </button>
      </form>
   )
};

export default BasicForm;