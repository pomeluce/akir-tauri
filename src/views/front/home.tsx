const Home: React.FC<{}> = () => {
  const [loading, setLoading] = useState(false);

  const click = () => {
    console.log('start');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('end');
    }, 3000);
  };

  return (
    <RifyCard className="h-2000px" title="我是标题">
      <span className="flex gap-3 items-center">
        <RifyButton loading={loading} strong ghost onClick={click} icon={IconPlus({})}>
          默认按钮
        </RifyButton>
        <RifyButton type="primary" strong ghost loading={loading} onClick={click}>
          primary
        </RifyButton>
        <RifyButton type="success" strong ghost onClick={click}>
          success
        </RifyButton>
        <RifyButton strong ghost color="#ff69b4">
          warning
        </RifyButton>
        <RifyButton type="error" strong ghost>
          danger
        </RifyButton>
        <RifyButton type="info" strong ghost>
          info
        </RifyButton>
      </span>
    </RifyCard>
  );
};

export default Home;
