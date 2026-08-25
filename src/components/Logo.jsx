const Logo = ({ dark = false, className = "" }) => {
  const ink = dark ? "#faf6ef" : "#16140f";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="19" stroke="#9c7a46" strokeWidth="1.2" />
        <path
          d="M13 27V13h9.5M13 20h7.5M27 13v14"
          stroke={ink}
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      </svg>
      <span
        className="font-display italic leading-none"
        style={{ color: ink, fontSize: "1.3rem", fontWeight: 500 }}
      >
        Fashion<span style={{ color: "#9c7a46" }}>Store</span>
      </span>
    </span>
  );
};

export default Logo;
