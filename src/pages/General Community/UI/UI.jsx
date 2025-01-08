
// Button Component
export const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    ghost: "text-gray-500 hover:bg-gray-100",
    danger: "text-red-500 hover:bg-red-50",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg transition-colors ${variants[variant]} ${className}`}
      {...props}>
      {children}
    </button>
  );
};

// Avatar Component
export const Avatar = ({ email, className = "" }) => (
  <div className={`rounded-full overflow-hidden ${className}`}>
    <img
      src={`https://api.dicebear.com/7.x/initials/svg?seed=${email}`}
      alt="Avatar"
      className="w-full h-full object-cover"
    />
  </div>
);

// Textarea Component
export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

// Card Component
export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
    {children}
  </div>
);


export const formatEmail = (email) => {
  if (!email) return "";
  // Extract the part before "@" in the email
  const username = email.split("@")[0];

  // Capitalize the first letter of the username
  const formattedEmail = username.charAt(0).toUpperCase() + username.slice(1);

  return formattedEmail;
};
