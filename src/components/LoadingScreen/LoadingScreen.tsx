import "./LoadingScreen.css";

function LoadingScreen() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      {/* icono animado */}
      <div className="loader mb-16"></div>
      <p className="text-white text-2xl">Loading</p>
    </div>
  );
}

export default LoadingScreen;
