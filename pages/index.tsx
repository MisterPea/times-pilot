import AutoSave from "@/components/AutoSave/AutoSave";
import MainButton from "@/components/MainButton/MainButton";
import TextButton from "@/components/TextButton/TextButton";
import MakeToast from "@/components/MakeToast/MakeToast";
import { useState } from "react";
import TextInput from "@/components/TextInput/TextInput";
import InputWrap from "@/components/TextInput/InputWrap";
import ToggleSelector from "@/components/ToggleSelector/ToggleSelector";
// import Toast from "@/components/MakeToast/Toast";

export default function Home() {
  const [showToast, setShowToast] = useState(false)
   
  console.log(showToast)
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MainButton link="#" label="Let's Go!" danger />
      <TextButton link="#" label="Cancel" />
      <AutoSave saving={false} error={false} />
      <button onClick={() => setShowToast((s) => !s)} style={{ width: 'fit-content', padding: '10px' }}>Call toast</button>
      <MakeToast data="Topics Added to Your Subscription." deploy={showToast} endDeploy={setShowToast}/>
      <br />
      {/* <TextInput label="Username"/> */}
      <InputWrap />
      <ToggleSelector label="Hello"/>
      
    </div>
  );
}