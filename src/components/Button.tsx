interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "outline";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-red-800 text-white hover:bg-gray-700",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        px-4 py-2
        rounded-md
        transition-colors
        ${variantClasses[variant]}
      `}
    >
      {label}
    </button>
  );
};

export { Button };
