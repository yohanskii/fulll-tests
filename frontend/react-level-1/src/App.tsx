import React, { useEffect, useState } from "react";
import Checkbox from "./components/Checkbox";

interface CheckboxeState {
  id: number;
  isActive: boolean;
  label: string;
}

const allCheckboxes: Array<CheckboxeState> = [
  { id: 0, isActive: false, label: "Item 1" },
  { id: 1, isActive: false, label: "Item 2" },
  { id: 2, isActive: false, label: "Item 3" },
  { id: 3, isActive: false, label: "Item 4" },
];
function App() {
  //state for select all checkbox
  const [isActive, setIsActive] = useState(false);

  //state all checkboxes
  const [checkboxes, setCheckboxes] =
    useState<Array<CheckboxeState>>(allCheckboxes);

  //onClick select all checkbox
  const handleSelectAll = () => {
    // if bool => !bool
    setIsActive(!isActive);
    //boucle sur toutes les checkboxes pour qu'elles soient comme !isActive
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox) => ({
        ...checkbox,
        ...{ isActive: !isActive },
      }))
    );
  };

  //onClick
  const handleChangeById = (id: number) => {
    setCheckboxes((checkboxes) =>
      checkboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, ...{ isActive: !checkbox.isActive } }
          : checkbox
      )
    );
  };

  useEffect(() => {
    // create booleanTab
    let booleanTab = checkboxes?.map((checkbox) => checkbox.isActive);

    if (isActive) {
      //si selectAll true
      if (booleanTab.includes(false)) {
        //si tab contient un false => selectAll ne peut être true
        setIsActive(!isActive);
      }
    } else {
      //si selectAll false
      if (!booleanTab.includes(false)) {
        //si tab ne contient aucun false => selectAll ne peut être false
        setIsActive(!isActive);
      }
    }
  }, [checkboxes, isActive]);

  return (
    <div>
      <Checkbox
        label="Select all"
        value={isActive}
        onChange={handleSelectAll}
      />
      {checkboxes?.map(({ id, label, isActive }) => (
        <Checkbox
          key={id}
          label={label}
          value={isActive}
          onChange={() => handleChangeById(id)}
        />
      ))}
    </div>
  );
}

export default App;
