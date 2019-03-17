import React from "react";

const BasicForm = ({inputType, value, updateInputHandler, submitFormHandler}) => {
   return (
      <form onSubmit={submitFormHandler}>
         <input type={inputType || "text"} value={value} onChange={updateInputHandler} />
         <button>
            Submit
         </button>
      </form>
   )
};

export default BasicForm;