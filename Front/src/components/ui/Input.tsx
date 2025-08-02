interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const Input: React.FC<InputProps> = ({ label, name, ...rest }) => (
  <div className="flex flex-col flex-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
      {label} *
    </label>
    <input
      id={name}
      name={name}
      className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
      {...rest}
    />
  </div>
);
