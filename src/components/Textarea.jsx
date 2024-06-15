export const Textarea = (props) => {
  const { id, type, value, onChange } = props;
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
};
