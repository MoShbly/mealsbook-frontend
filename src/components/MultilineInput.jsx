import TextInput from "./TextInput";

export default function({ label, value, onChange}) {

  function addItem() {
    onChange(values => [...values, {key: crypto.randomUUID(), value: ''}])
  }

  function removeItem(key) {
    onChange(values => values.filter(item => item.key !== key))
  }

  function changeItem(key, e) {
    onChange(values => values.map(item => {
      if (item.key !== key) return item;
      else return {key, value: e.target.value};
    }))
  }

  return (

    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <label>{label}: </label>
        <button type="button" className="cursor-pointer hover:text-purple-500" onClick={addItem}>+ Add</button>
      </div>
      {
        value.map(item =>
          <div key={item.key} className="flex flex-col" >
            <div className="flex gap-2">
              <input
                value={item.value}
                onChange={(e) => changeItem(item.key, e)}
                className="flex-1 outline-none border p-3 rounded-md border-purple-900"
                type="text"
              />
              <button type="button" className="cursor-pointer text-2xl hover:text-red-500" onClick={() => removeItem(item.key)}>✗</button>
            </div>
          </div>
        )
      }
    </div>
  );
}
