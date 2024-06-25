const popupContainer: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const { showAbout } = useClientMenu();

  useEffect(() => {
    showAbout(() => setVisible(true));
  }, []);

  return (
    <>
      <ArcoModal
        simple
        title="关于 Rapidify-React"
        visible={visible}
        footer={null}
        maskClosable={false}
        closable={true}
        alignCenter={false}
        style={{ top: 30 }}
        onCancel={() => setVisible(false)}
      >
        关于页面
      </ArcoModal>
    </>
  );
};

export default popupContainer;
