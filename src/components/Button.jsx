export const Button = ({ type, tag, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
    >{tag}</button>
  );
};
