const Home: React.FC<{}> = () => {
  const handleClick = () => {
    SuiConfirm({
      defaultOpen: true,
      modal: false,
      children: (
        <SuiDialogContent closable={false} aria-describedby={undefined}>
          <SuiDialogHeader>
            <SuiDialogTitle>提示</SuiDialogTitle>
          </SuiDialogHeader>
          <span>当前快捷键已被绑定, 是否覆盖原有快捷键?</span>
          <SuiDialogFooter>
            <SuiDialogClose asChild>
              <SuiButton variant="secondary">取消</SuiButton>
            </SuiDialogClose>
            <SuiDialogClose asChild>
              <SuiButton
                onClick={() => {
                  console.log('aaaa');
                }}
              >
                确定
              </SuiButton>
            </SuiDialogClose>
          </SuiDialogFooter>
        </SuiDialogContent>
      ),
    });
  };

  return (
    <SuiCard>
      <SuiCardHeader>
        <SuiCardTitle className="pb-3 border-b">
          <header>首页</header>
        </SuiCardTitle>
      </SuiCardHeader>
      <SuiCardContent className="h-[1000px]">
        <SuiButton onClick={handleClick}>点击</SuiButton>
      </SuiCardContent>
    </SuiCard>
  );
};

export default Home;
