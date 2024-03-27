const Home: React.FC<{}> = () => {
  return (
    <RifyCard className="h-2000px" title="我是标题">
      <main className="flex flex-col gap-5">
        <div>
          <RifyAlert
            title="提示"
            type="warning"
            closable
            onClose={() => console.log('我被 onClose 了') }
            onAfterLeave={() => {
              console.log('我被 onAfterLeave 了');
            }}
          >
            信息填写错误
          </RifyAlert>
        </div>
      </main>
    </RifyCard>
  );
};

export default Home;
