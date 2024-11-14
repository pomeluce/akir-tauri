const moon: React.FC<{ className?: string }> = props => {
  return (
    <svg className={props.className} fill="#f6f6f6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.000000 96.000000">
      <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)" stroke="none">
        <path d="M406 869 c-62 -15 -153 -68 -197 -116 -22 -24 -55 -74 -72 -111 -29 -61 -32 -76 -32 -163 0 -90 2 -99 37 -171 45 -91 103 -147 196 -191 61 -29 76 -32 162 -32 86 0 101 3 161 31 37 18 85 49 108 70 48 43 96 118 88 138 -3 8 -24 17 -47 21 -61 10 -154 61 -195 107 -82 90 -112 215 -80 333 9 36 15 72 11 80 -6 17 -75 19 -140 4z" />
      </g>
    </svg>
  );
};

export default moon;
