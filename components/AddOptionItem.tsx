import React, { useCallback, useState } from "react";
import AsyncSelect from "react-select/async";

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function wrapper(callback, inputValue) {
  fetch(
    `https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&inname=${inputValue}&site=stackoverflow`
  )
    .then((res) => res.json())
    .then((data) => {
      const newData = data.items.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      callback(newData);
    });
}

const AddOptionItem = ({
  setItemsArray,
}: {
  setItemsArray: React.Dispatch<React.SetStateAction<{
    name: string;
    id: string;
}[]>>
}) => {
  const [showInput, setShowInput] = useState(false);

  const handleChange = (newValue: {
    value: string,
    label: string,
  }) => {
    setItemsArray(prev => [...prev, {
      name: newValue.value,
      id: newValue.value
    }])
  }

  const handleClick = () => {
    setShowInput(true);
  };

  const loadOptions = useCallback(
    (inputValue: string, callback: (options: any[]) => void) => {
      const fetchFunc = debounce(wrapper, 300);
      fetchFunc(callback, inputValue);
    },
    []
  );

  return showInput ? (
    <div className="w-full m-4">
      <AsyncSelect onChange={handleChange} loadOptions={loadOptions} />
    </div>
  ) : (
    <div onClick={handleClick} className="bg-blue-200 w-full p-2 m-4">Add skill</div>
  );
};

export default AddOptionItem;
