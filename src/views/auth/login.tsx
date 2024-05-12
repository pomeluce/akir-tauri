const login: React.FC<{}> = () => {
  return (
    <form className="flex-1 flex justify-center">
      <div className="grid grid-cols-2 rounded-md shadow-md overflow-hidden bg-backdrop1">
        <div className="flex flex-col justify-between box-border p-5">
          <div>
            <h2 className="text-center text-lg uppercase">rapidify-react</h2>
            <div className="mt-8">
              <input className="rify-input" type="text" />
              <input type="text" />
            </div>
            <RifyButton type="primary">登录</RifyButton>
          </div>
        </div>
        <div className=""></div>
      </div>
    </form>
  );
};

export default login;
