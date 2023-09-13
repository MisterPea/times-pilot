import { useState } from "react";
import TextInput from "./TextInput";

export default function InputWrap() {
  const [topLevel, setTopLevel] = useState('');


  return (
    <>
      {/* <div>{topLevel}</div> */}
      <TextInput type="password" label="My Input" parentSetState={setTopLevel} regexTest="password" />
    </>
  );
}