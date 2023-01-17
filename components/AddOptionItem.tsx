import React, { useCallback, useState } from "react";
import AsyncSelect from "react-select/async";
import debounce from "../utils/debounce";

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
  enabled,
  setItemsArray,
  itemArray,
  setError,
  setLoading,
}: {
  setItemsArray: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        id: string;
      }[]
    >
  >;
  enabled: boolean;
  itemArray: {
    name: string;
    id: string;
  }[];
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showInput, setShowInput] = useState(false);

  const handleChange = async (newValue: { value: string; label: string }) => {
    setLoading(true);
    setItemsArray([
      ...itemArray,
      {
        name: newValue.value,
        id: newValue.value,
      },
    ]);
    const newArray = await fetch("/api/skills/create", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        skills: [...itemArray.map((item) => item.name), newValue.value],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.length) {
          return data.map((item) => ({
            name: item,
            id: item,
          }));
        } else {
          return [];
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        setError(true);
      });
    setLoading(false);
    setItemsArray(newArray);
  };

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
    <div
      onClick={enabled ? handleClick : () => {}}
      className="bg-[#007FFA] w-full p-2 m-4 text-white"
    >
      Add skill
    </div>
  );
};

export default AddOptionItem;
