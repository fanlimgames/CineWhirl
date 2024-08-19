import classNames from "classnames";
import { useState } from "react";

import { Icon, Icons } from "../Icon";

// Array of predefined colors
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

export function ColorPicker({
  label,
  value,
  onInput,
  customIconColor,
  onIconColorChange,
}: {
  label: string;
  value: string;
  onInput: (v: string) => void;
  customIconColor?: string;
  onIconColorChange?: (v: string) => void;
}) {
  const [colors, setColors] = useState(predefinedColors);
  const [customColor, setCustomColor] = useState("#000000");

  const addCustomColor = () => {
    if (!colors.includes(customColor)) {
      setColors([...colors, customColor]);
      onInput(customColor);
    }
  };

  return (
    <div className="space-y-4">
      {/* Optional label */}
      {label && <p className="font-semibold text-gray-300">{label}</p>}

      {/* Section for selecting a profile color */}
      <div className="space-y-2">
        <p className="font-medium text-gray-300">Choose a Profile Color:</p>
        <div className="flex gap-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded-full flex justify-center items-center border-2 cursor-pointer transition-colors duration-200",
                value === color ? "border-gray-300" : "border-transparent",
              )}
              style={{ backgroundColor: color }}
              onClick={() => onInput(color)}
            >
              {value === color && <Icon icon={Icons.CHECKMARK} />}
            </button>
          ))}
        </div>
      </div>

      {/* Section for selecting a custom icon color */}
      <div className="space-y-2 mt-6">
        <p className="font-medium text-gray-300">Custom Icon Color:</p>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
          />
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 rounded transition-colors duration-200"
            onClick={addCustomColor}
          >
            Add Custom Color
          </button>
        </div>

        <div className="flex gap-2 flex-wrap mt-4">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded-full flex justify-center items-center border-2 cursor-pointer transition-colors duration-200",
                customIconColor === color
                  ? "border-gray-300"
                  : "border-transparent",
              )}
              style={{ backgroundColor: color }}
              onClick={() => onIconColorChange?.(color)}
            >
              {customIconColor === color && <Icon icon={Icons.CHECKMARK} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
