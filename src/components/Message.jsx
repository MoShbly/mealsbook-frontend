export default function({msg, type}) {

  const style = type === "error"
                ? "border-red-600 bg-red-100 text-red-900"
                : "border-green-600 bg-green-100 text-green-900";
  
  return (
    <p className={`border py-3 px-6 rounded-md ${style}`}>
      {msg}
    </p>
  );
}