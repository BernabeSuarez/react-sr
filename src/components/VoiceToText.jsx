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
    <main className="m-auto px-1 sm:p-12 flex flex-col justify-center items-center w-screen">
      <h2 className="text-xl sm:text-3xl font-bold mb-8">
        Transcripciones de voz a texto
      </h2>
      <div className=" w-full sm:w-[600px] min-h-96 bg-white rounded-lg text-black p-4 mb-2">
        {transcript ? transcript : "Comenzar a grabar..."}
      </div>
      <div className="flex justify-between w-full sm:w-[600px] items-center mt-2 mb-6">
        <button
          onClick={setCopied}
          className="px-3 py-2 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          {isCopied ? "Texto Copiado" : "Copiar"}
        </button>
        <button
          onClick={resetTranscript}
          className="px-3 py-2 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Borrar texto
        </button>
      </div>
      <div className="flex justify-between w-full sm:w-[600px] items-center mb-2">
        <button
          className="bg-green-500 text-white hover:bg-green-800"
          onClick={startListening}
        >
          Grabar
        </button>
        <button
          className="bg-red-500 text-white hover:bg-red-800"
          onClick={stopListening}
        >
          Detener
        </button>
      </div>
    </main>
  );
};

export default VoiceToText;
