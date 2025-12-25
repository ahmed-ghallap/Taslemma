export default function Button(props) {
  const {
    icon,
    sronly,
    children,
    className,
    disabled = false,
    onClick,
  } = props;

  // const className = "bg-primary-300";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary-200 hover:bg-primary-400 active:bg-primary-300 disabled:bg-primary-100 flex items-center gap-3 rounded-lg px-2 py-1 text-lg transition duration-200 disabled:cursor-not-allowed disabled:*:opacity-50 ${className}`}
    >
      {icon}

      {sronly && <i className="sr-only">{sronly}</i>}

      {children}
    </button>
  );
}
