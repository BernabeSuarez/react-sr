import VoiceToText from "./components/VoiceToText";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <main className=" base_app flex justify-center items-center p-8 w-screen h-screen">
      <VoiceToText />
      <Analytics />
    </main>
  );
}

export default App;
