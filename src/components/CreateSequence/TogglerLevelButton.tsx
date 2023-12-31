// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// Reducer actions
import { togglerCheckbox } from "../../redux/store/reducers/card";

function TogglerLevelButton() {
  const dispatch = useAppDispatch();
  const isChecked = useAppSelector((state) => state.card.isChecked);
  return (
    <div className="flex justify-center items-center gap-3 mt-3">
      <p className={`${!isChecked ? "font-bold text-[#1d4ed8]" : ""}`}>
        Novice
      </p>
      <input
        id="toggler"
        name="toggler"
        type="checkbox"
        className={`toggle toggle-lg ${
          !isChecked ? "bg-[#1d4ed8]" : "bg-[#be1622]"
        }  `}
        checked={isChecked}
        onChange={() => {
          dispatch(togglerCheckbox(isChecked));
        }}
      />
      <p className={`${isChecked ? "font-bold text-[#be1622]" : ""}`}>Expert</p>
    </div>
  );
}

export default TogglerLevelButton;
