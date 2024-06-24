const App: React.FC<{}> = () => {
  return (
    <ArcoConfigProvider>
      <main className="w-screen h-screen flex justify-center items-center">tauri-app 主界面</main>
    </ArcoConfigProvider>
  );
};

export default App;
