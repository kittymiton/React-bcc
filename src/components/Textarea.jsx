export const Textarea = ({ id, type, value, onChange, rows }) => {
  return (
    <textarea
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
    />
  );
};
