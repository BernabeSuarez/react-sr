import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Copy,
  Trash2,
  Volume2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const VoiceToText = () => {
  const [textToCopy, setTextToCopy] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  });

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true, language: "es-ES" });
    setIsRecording(true);
    setPulseAnimation(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
    setPulseAnimation(false);
    setTextToCopy(transcript);
  };

  const handleCopy = () => {
    if (transcript) {
      setCopied();
    }
  };

  const handleClear = () => {
    resetTranscript();
    setTextToCopy(null);
  };

  // Efecto para mostrar notificación de copiado
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        // Reset después de la animación
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Navegador no compatible
          </h3>
          <p className="text-white/70">
            Tu navegador no soporta reconocimiento de voz. Prueba con Chrome o
            Edge.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Volume2 className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Voz a Texto
          </h1>
        </div>
        <p className="text-white/70 text-lg sm:text-xl max-w-2xl">
          Convierte tu voz en texto de forma instantánea con tecnología de IA
        </p>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl">
        {/* Status Indicator */}
        <div className="flex items-center justify-center mb-6">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
              isRecording
                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-slate-500/20 text-slate-400 border border-slate-500/30"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                isRecording ? "bg-red-400" : "bg-slate-400"
              } ${pulseAnimation ? "animate-pulse" : ""}`}
            />
            <span className="text-sm font-medium">
              {isRecording ? "Grabando..." : "Listo para grabar"}
            </span>
          </div>
        </div>

        {/* Transcript Area */}
        <div className="relative mb-6">
          <div className="min-h-[200px] sm:min-h-[300px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8 overflow-y-auto">
            {transcript ? (
              <div className="text-white text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                {transcript}
              </div>
            ) : (
              <div className="text-white/50 text-base sm:text-lg text-center flex flex-col items-center justify-center h-full">
                <Mic className="w-12 h-12 mb-4 opacity-50" />
                <p>Presiona &quot;Iniciar Grabación&quot; para comenzar...</p>
                <p className="text-sm mt-2 opacity-70">
                  Tu voz se transcribirá automáticamente aquí
                </p>
              </div>
            )}
          </div>

          {/* Word Count */}
          {transcript && (
            <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-white/70 text-sm">
                {transcript.split(" ").filter((word) => word.length > 0).length}{" "}
                palabras
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Record/Stop Button */}
          <div className="flex-1">
            {!isRecording ? (
              <button
                onClick={startListening}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Iniciar Grabación
              </button>
            ) : (
              <button
                onClick={stopListening}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <MicOff className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Detener Grabación
              </button>
            )}
          </div>

          {/* Utility Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleCopy}
              disabled={!transcript}
              className={`flex-1 sm:flex-none px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                transcript
                  ? isCopied
                    ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30"
                  : "bg-gray-500/20 text-gray-500 border border-gray-500/30 cursor-not-allowed"
              }`}
            >
              {isCopied ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>

            <button
              onClick={handleClear}
              disabled={!transcript}
              className={`flex-1 sm:flex-none px-6 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 ${
                transcript
                  ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                  : "bg-gray-500/20 text-gray-500 border border-gray-500/30 cursor-not-allowed"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Limpiar
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Habla claramente y despacio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Asegúrate de tener un micrófono</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full" />
              <span>Funciona mejor en lugares silenciosos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copy Success Notification */}
      {isCopied && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-slide-in-from-top z-50">
          <CheckCircle2 className="w-5 h-5" />
          <span>Texto copiado al portapapeles</span>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-white/40 text-sm">
        <p>Desarrollado con ❤️ usando React y Web Speech API</p>
      </div>
    </main>
  );
};

export default VoiceToText;
