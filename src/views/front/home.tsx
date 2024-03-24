const Home: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  const click = () => {
    console.log('start');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('end');
    }, 1000);
  };

  return (
    <RifyCard className="h-2000px" title="我是标题">
      <span className="flex gap-3 items-center">
        <RifyButton loading={loading} strong onClick={click} icon={IconPlus({})}>
          默认按钮
        </RifyButton>
        <RifyButton type="primary" strong loading={loading} onClick={click}>
          primary
        </RifyButton>
        <RifyButton type="success" strong onClick={click}>
          success
        </RifyButton>
        <RifyButton strong color="#ff69b4">
          warning
        </RifyButton>
        <RifyButton type="error" strong>
          danger
        </RifyButton>
        <RifyButton type="info" strong>
          info
        </RifyButton>
      </span>
    </RifyCard>
  );
};

export default Home;
