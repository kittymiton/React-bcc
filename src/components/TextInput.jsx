export const TextInput = ({ id, type, value, onChange }) => {

  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};
