import React, { useEffect, useMemo, useRef, useState } from "react";
import debounce from "../utils/debounce";
import AddOptionItem from "./AddOptionItem";

async function changeWrapper(newItemArray) {
  const newArray = await fetch("/api/skills/create", {
    method: "POST",
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      skills: [...newItemArray.map((item) => item.name)],
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      data.map((item) => ({
        name: item,
        id: item,
      }))
    );
}

const ListWrapper = ({ setError }) => {
  const sourceItem = useRef<null | number>(null);
  const [loading, setLoading] = useState(false);
  const destinationItem = useRef<null | number>(null);
  const [itemArray, setItemsArray] = useState<{ name: string; id: string }[]>(
    []
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setLoading(true);
    if (!userId) {
      fetch("/api/user/create")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          localStorage.setItem("userId", data.uuid);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
        });
    } else {
      fetch("/api/skills", {
        method: "POST",
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          const newData = data.map((item) => ({
            name: item.name,
            id: item.uuid,
          }));
          setItemsArray(newData);
        });
    }
  }, []);

  const latest: number = useMemo(() => {
    return itemArray.length;
  }, [itemArray]);

  const handleChange = async () => {
    let newItemArray = [...itemArray];
    const draggedItemContent = newItemArray.splice(sourceItem.current, 1)[0];
    newItemArray.splice(destinationItem.current, 0, draggedItemContent);

    // since the array gets updated we need to update the item indexes accordingly
    sourceItem.current = destinationItem.current;
    destinationItem.current = null;

    setItemsArray(newItemArray);
    const debouncedSave = debounce(changeWrapper, 600);
    debouncedSave(newItemArray);
  };

  const handleDragStart = (index: number) => (event) => {
    console.log("this is", index);
    sourceItem.current = index;
    (event.target as HTMLDivElement).style.opacity = "0";
  };

  const handleDrag = (event) => {
    console.log("yhis");
    (event.target as HTMLDivElement).style.opacity = "0";
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end called here");
    (event.target as HTMLDivElement).style.opacity = "100";
    sourceItem.current = null;
    destinationItem.current = null;
  };

  const handleDragEnter = (index: number) => (event) => {
    console.log("called", index);
    if (sourceItem.current !== index) {
      console.log("this happens", index);
      destinationItem.current = index;
      handleChange();
    }
  };

  const handleRemoveItem = (index) => async () => {
    const newItemArray = [...itemArray];
    newItemArray.splice(index, 1);
    setItemsArray(newItemArray);
    setLoading(true);
    const newArray = await fetch("/api/skills/create", {
      method: "POST",
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        skills: [...newItemArray.map((item) => item.name)],
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        data.map((item) => ({
          name: item,
          id: item,
        }))
      );
    setLoading(false);
  };

  const preventDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };
  return (
    <div className="flex w-2/3 mx-auto justify-around items-center flex-wrap">
      {loading && (
        <div className="absolute right-5 bottom-5 animate-pulse">
          Loading...
        </div>
      )}
      <div className="w-[45%] min-w-[200px]">
        {itemArray.slice(0, 5).map((item, index) => (
          <div
            key={item.id}
            draggable
            className={`bg-[#007FFA] text-white w-full p-2 m-4 flex justify-between cursor-move transition-all`}
            onDragStart={handleDragStart(index)}
            onDragOver={preventDragOver}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter(index)}
            onDrag={handleDrag}
          >
            <span>{item.name}</span>
            <span
              onClick={handleRemoveItem(index)}
              className="font-bold cursor-pointer "
            >
              X
            </span>
          </div>
        ))}
        <div>
          {itemArray.length < 5 &&
            new Array(5 - (itemArray.length % 5))
              .fill(0)
              .map((_, index) => (
                <AddOptionItem
                  setLoading={setLoading}
                  setError={setError}
                  itemArray={itemArray}
                  enabled={index + itemArray.length === latest}
                  setItemsArray={setItemsArray}
                />
              ))}
        </div>
      </div>
      <div className=" min-w-[200px]  w-[45%]">
        {itemArray.slice(5).map((item, index) => (
          <div
            key={item.id}
            draggable
            className={`bg-[#007FFA] text-white w-full p-2 m-4 cursor-move transition-all flex justify-between`}
            onDragStart={handleDragStart(index + 5)}
            onDragOver={preventDragOver}
            onDragEnd={handleDragEnd}
            onDragEnter={handleDragEnter(index + 5)}
            onDrag={handleDrag}
          >
            <span>{item.name}</span>
            <span
              onClick={handleRemoveItem(index)}
              className="font-bold cursor-pointer "
            >
              X
            </span>
          </div>
        ))}
        <div>
          {itemArray.length <= 5 &&
            new Array(5)
              .fill(0)
              .map((_, index) => (
                <AddOptionItem
                  setLoading={setLoading}
                  setError={setError}
                  itemArray={itemArray}
                  enabled={index + itemArray.length === latest}
                  setItemsArray={setItemsArray}
                />
              ))}
        </div>
        <div>
          {itemArray.length > 5 &&
            itemArray.length % 10 !== 0 &&
            new Array(10 - (itemArray.length % 10))
              .fill(0)
              .map((_, index) => (
                <AddOptionItem
                  setLoading={setLoading}
                  itemArray={itemArray}
                  setError={setError}
                  enabled={index + itemArray.length === latest}
                  setItemsArray={setItemsArray}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default ListWrapper;
