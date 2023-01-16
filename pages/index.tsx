import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import autoAnimate from "@formkit/auto-animate";
import AddOptionItem from "../components/AddOptionItem";

const IndexPage = () => {
  const sourceItem = useRef<null | number>(null);
  const destinationItem = useRef<null | number>(null);
  const [itemArray, setItemsArray] = useState<{name: string, id: stringp}[]>([]);
  const container = useRef(null);

  useEffect(() => {
    container.current && autoAnimate(container.current);
  }, [container]);

  const handleChange = () => {
    let newItemArray = [...itemArray];
    const draggedItemContent = newItemArray.splice(sourceItem.current, 1)[0];
    newItemArray.splice(destinationItem.current, 0, draggedItemContent);

    // since the array gets updated we need to update the item indexes accordingly
    sourceItem.current = destinationItem.current;
    destinationItem.current = null;

    setItemsArray(newItemArray);
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

  const preventDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex w-2/3 mx-auto justify-around items-center">
        <div className="w-[45%]">
          {itemArray.slice(0, 5).map((item, index) => (
            <div
              key={item.id}
              draggable
              className={`bg-blue-200 w-full p-2 m-4 cursor-move transition-all`}
              onDragStart={handleDragStart(index)}
              onDragOver={preventDragOver}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter(index)}
              onDrag={handleDrag}
            >
              {item.name}
            </div>
          ))}
          <div>
            {itemArray.length < 5 &&
              new Array(5 - (itemArray.length % 5))
                .fill(0)
                .map(() => <AddOptionItem setItemsArray={setItemsArray} />)}
          </div>
        </div>
        <div className="w-[45%]">
          {itemArray.slice(5).map((item, index) => (
            <div
              key={item.id}
              draggable
              className={`bg-blue-200 w-full p-2 m-4 cursor-move transition-all`}
              onDragStart={handleDragStart(index + 5)}
              onDragOver={preventDragOver}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter(index + 5)}
              onDrag={handleDrag}
            >
              {item.name}
            </div>
          ))}
          <div>
            {itemArray.length <= 5 && new Array(5)
              .fill(0)
              .map(() => <AddOptionItem setItemsArray={setItemsArray} />)
            }
          </div>
          <div>
            {itemArray.length > 5 && itemArray.length%10 !== 0 &&
              new Array(10 - (itemArray.length % 10))
                .fill(0)
                .map(() => <AddOptionItem setItemsArray={setItemsArray} />)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
