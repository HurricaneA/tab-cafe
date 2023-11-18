import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { ItemsInterface } from "../../interfaces";
export const ListItemByType = ({
  items,
  handleChange,
}: {
  items: ItemsInterface[];
  handleChange: (itemId: number, e: React.ChangeEvent<any>) => void;
}) => {
  const [hideList, setHideList] = useState(false);

  return (
    <div>
      <div className="typeHeader">
        <h2 className="text-capitalize" style={{ paddingRight: "20px" }}>
          {items?.[0]?.type}
        </h2>

        {!hideList ? (
          <ArrowCircleUpIcon
            fontSize="large"
            onClick={() => setHideList(true)}
          />
        ) : (
          <ArrowCircleDownIcon
            fontSize="large"
            onClick={() => setHideList(false)}
          />
        )}
      </div>

      {!hideList && (
        <>
          {items?.map((item) => (
            <div className="row" key={item.id}>
              <div className="col-4">
                <p>
                  {item.name} - <b>{item.price}/=</b>
                </p>
              </div>
              <div className="col-8">
                <Form.Control
                  type="number"
                  min={0}
                  value={item.quantity.toString()}
                  id="inputquantity"
                  onChange={(e) => handleChange(item.id, e)}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
