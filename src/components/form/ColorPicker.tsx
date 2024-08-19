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
  const [colors, setColors] = useState<string[]>(predefinedColors);
  const [customColor, setCustomColor] = useState<string>("#000000");

  const addCustomColor = () => {
    if (!colors.includes(customColor)) {
      setColors([...colors, customColor]);
      onInput(customColor);
    }
  };

  return (
    <div className="space-y-3">
      {label && <p className="font-bold text-white">{label}</p>}

      {/* Predefined Colors Section */}
      <div className="space-y-2">
        <p className="font-medium text-white">Choose a Profile Color:</p>
        <div className="flex gap-3 flex-wrap">
          {colors.map((color) => (
            <button
              type="button"
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded-full flex justify-center items-center border-2 transition-all duration-200",
                value === color ? "border-white" : "border-transparent",
                "hover:border-gray-400",
              )}
              style={{ backgroundColor: color }}
              onClick={() => onInput(color)}
              key={color}
            >
              {value === color && (
                <Icon icon={Icons.CHECKMARK} className="text-white" />
              )}
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
              type="button"
              tabIndex={0}
              className={classNames(
                "w-10 h-10 rounded-full flex justify-center items-center border-2 transition-all duration-200",
                customIconColor === color
                  ? "border-white"
                  : "border-transparent",
                "hover:border-gray-400",
              )}
              style={{ backgroundColor: color }}
              onClick={() => onIconColorChange?.(color)}
              key={color}
            >
              {customIconColor === color && (
                <Icon icon={Icons.CHECKMARK} className="text-white" />
              )}
            </button>
          ))}
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-10 h-10 rounded-full border-2 border-gray-400 cursor-pointer"
            />
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition-all duration-200"
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
