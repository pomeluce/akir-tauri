const maximize: React.FC<{ className?: string }> = ({ className }) => {
  const ref = useRef<SVGPathElement>(null);

  const hoverHandle = () => {
    const originPath = 'M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12z';
    const hoverPath =
      'M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM12.82813,10h7.17188v7.17188zM10,12.82813l7.17188,7.17188h-7.17187z';
    if (ref.current) {
      ref.current.addEventListener('mouseenter', () => {
        ref.current?.setAttribute('d', hoverPath);
      });
      ref.current.addEventListener('mouseleave', () => {
        ref.current?.setAttribute('d', originPath);
      });
    }
  };

  useEffect(() => {
    hoverHandle();
    return () => {
      hoverHandle();
    };
  }, []);

  return (
    <svg className={className} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256">
      <g
        fill="#2ca833"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{ mixBlendMode: 'normal' }}
      >
        <g transform="scale(8.53333,8.53333)">
          <path ref={ref} d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12z" />
          {/* <path d="M15,3c-6.627,0 -12,5.373 -12,12c0,6.627 5.373,12 12,12c6.627,0 12,-5.373 12,-12c0,-6.627 -5.373,-12 -12,-12zM12.82813,10h7.17188v7.17188zM10,12.82813l7.17188,7.17188h-7.17187z" /> */}
        </g>
      </g>
    </svg>
  );
};

export default maximize;
