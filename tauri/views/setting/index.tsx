const settingStyle: React.FC<{}> = () => {
  return (
    <main className="w-page mx-auto my-10 flex">
      <ArcoTree
        className="w-40"
        autoExpandParent={false}
        defaultSelectedKeys={['setting.general']}
        icons={{
          switcherIcon: IconRiArrowDownSLine({}),
          dragIcon: IconRiArrowRightSLine({}),
        }}
        onSelect={(value, info) => {
          console.log(value, info);
        }}
        onExpand={(keys, info) => {
          console.log(keys, info);
        }}
      >
        <ArcoTree.Node title="通用" key="setting.general" />
        <ArcoTree.Node title="样式" key="setting.styles" />
      </ArcoTree>
      <ArcoDivider className="h-full border-rim3" type="vertical" />
      <main className="px-10">主内容区域</main>
    </main>
  );
};

export default settingStyle;
