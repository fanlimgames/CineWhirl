import classNames from "classnames";
import { useState } from "react";

import { Icon, Icons } from "../Icon";

// Predefined colors array
const predefinedColors = [
  "#0A54FF",
  "#CF2E68",
  "#F9DD7F",
  "#7652DD",
  "#2ECFA8",
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A1",
  "#A133FF",
];
export const initialColor = predefinedColors[0];

export function ColorPicker(props: {
  label: string;
  value: string;
  onInput: (v: string) => void;
  customIconColor?: string;
  onIconColorChange?: (v: string) => void;
}) {
  const [colors, setColors] = useState<string[]>(predefinedColors);
  const [customColor, setCustomColor] = useState<string>("#000000");

  const addCustomColor = () => {
    setColors([...colors, customColor]);
    props.onInput(customColor);
  };

  return (
    <div className="space-y-3">
      {props.label ? (
        <p className="font-bold text-white">{props.label}</p>
      ) : null}

      {/* Predefined Colors Section */}
      <div className="space-y-2">
        <p className="font-medium text-white">Choose a Profile Color:</p>
        <div className="flex gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              type="button" // Explicit type attribute
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded flex justify-center items-center text-white pointer border-2 border-opacity-10 cursor-pointer",
                props.value === color ? "border-white" : "border-transparent",
              )}
              onClick={() => props.onInput(color)}
              style={{ backgroundColor: color }}
              key={color}
            >
              {props.value === color ? <Icon icon={Icons.CHECKMARK} /> : null}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Icon Color Section */}
      <div className="space-y-2 mt-4">
        <p className="font-medium text-white">Custom Icon Color:</p>
        <div className="flex gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              type="button" // Explicit type attribute
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded flex justify-center items-center text-white pointer border-2 border-opacity-10 cursor-pointer",
                props.customIconColor === color
                  ? "border-white"
                  : "border-transparent",
              )}
              onClick={() =>
                props.onIconColorChange && props.onIconColorChange(color)
              }
              style={{ backgroundColor: color }}
              key={color}
            >
              {props.customIconColor === color ? (
                <Icon icon={Icons.CHECKMARK} />
              ) : null}
            </button>
          ))}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded border-2 border-gray-300 cursor-pointer"
            />
            <button
              type="button" // Explicit type attribute
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={addCustomColor}
            >
              Add Custom Color
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
