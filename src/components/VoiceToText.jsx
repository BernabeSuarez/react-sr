import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

const VoiceToText = () => {
  const [textToCopy, setTextToCopy] = useState(null);
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "es-ES" });

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setTextToCopy(transcript);
  };
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  return (
    <main className="m-auto px-4 flex flex-col justify-center items-center ">
      <h2 className="text-3xl font-bold mb-8">
        Transcripcion voz a texto online
      </h2>
      <div className="w-full  min-h-96 bg-white rounded-lg text-black p-4">
        {transcript}
      </div>
      <div className="flex justify-between w-full items-center mb-2">
        <button onClick={setCopied}>
          {isCopied ? "Texto Copiado" : "Copiar"}
        </button>
        <button onClick={resetTranscript} className="bg-red-600 text-white">
          Borrar texto
        </button>
      </div>
      <div className="flex justify-between w-full items-center">
        <button className="bg-green-500 text-white" onClick={startListening}>
          Grabar
        </button>
        <button className="bg-red-500 text-white" onClick={stopListening}>
          Detener
        </button>
      </div>
    </main>
  );
};

export default VoiceToText;
