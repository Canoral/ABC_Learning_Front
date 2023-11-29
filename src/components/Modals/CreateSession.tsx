import React, { useRef, useState } from "react";
import { createSession } from "../../redux/store/reducers/session";
import { useAppDispatch } from "../../redux/hooks";
import { modalIsOpen } from "../../redux/store/reducers/card";
import { useParams } from "react-router-dom";

interface ICreateSession {
  isOpen: boolean;
  color: string;
}

function CreateSession({ isOpen, color }: ICreateSession) {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isPresentiel, setIsPresentiel] = useState(true);
  const [isGroupe, setIsGroupe] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    formData.append("is_face_to_face", isPresentiel.toString());
    formData.append("is_group_work", isGroupe.toString());
    formData.append("card_id", localStorage.getItem("card_id") as string);
    formData.append("tool_id", localStorage.getItem("tool_id") as string);
    formData.append("sequence_id", id?.toString() as string);
    dispatch(createSession(formData));
    dispatch(modalIsOpen(isOpen));
    localStorage.removeItem("card_id");
    localStorage.removeItem("tool_id");
    formRef.current?.reset();
  };

  return (
    <dialog id="create_modal" className="modal" open={isOpen}>
      <div className="modal-box w-full lg:max-w-5xl" style={{ backgroundColor: color }}>
        <form onSubmit={handleFormSubmit} ref={formRef}>
          <label htmlFor="name" className="flex flex-col mb-2 text-sm font-medium text-white">
            Nom de la session
            <input
              id="name"
              name="name"
              placeholder="Ecrivez le nom de la session"
              className="input input-bordered w-full max-w-xs mt-1 align-middle mb-4 text-black"
              autoComplete="off"
              required
            />
          </label>
          <label htmlFor="time" className="flex flex-col mb-2 text-sm font-medium text-white ">
            Durée en minutes
            <input
              type="number"
              id="time"
              name="time"
              defaultValue={0}
              min={0}
              max={100}
              placeholder="Minutes"
              className="input input-bordered w-full max-w-xs mb-4 text-black"
              autoComplete="off"
            />
          </label>
          <label className="flex flex-col mb-2 text-sm font-medium text-white">
            Présentiel / Distanciel
            <select
              id="presentiel"
              name="is_face_to_face"
              className="select select-bordered w-full max-w-xs mb-4 text-black"
              onChange={(e) => {
                if (e.target.value === "Présentiel") {
                  setIsPresentiel(true);
                } else {
                  setIsPresentiel(false);
                }
              }}
              autoComplete="off"
            >
              <option value="Présentiel">Présentiel</option>
              <option value="Distanciel">Distanciel</option>
            </select>
          </label>
          <label className="flex flex-col mb-2 text-sm font-medium text-white">
            Individuel / Groupe
            <select
              id="groupe"
              name="is_group_work"
              className="select select-bordered w-full max-w-xs mb-4 text-black"
              onChange={(e) => {
                if (e.target.value === "Groupe") {
                  setIsGroupe(true);
                } else {
                  setIsGroupe(false);
                }
              }}
              autoComplete="off"
            >
              <option value="Groupe">Groupe</option>
              <option value="Individuel">Individuel</option>
            </select>
          </label>
          <label htmlFor="comments" className="block mb-2 text-sm font-medium text-white">
            Remarques
            <textarea
              id="comments"
              name="comments"
              placeholder="Ecrivez vos commentaire"
              className="input input-bordered w-full h-24 mt-1 align-middle mb-4 text-black overflow-hidden"
              autoComplete="off"
            />
          </label>
          <label htmlFor="equipment" className="flex flex-col  text-sm font-medium text-white">
            Matériel
            <div className="flex flex-row items-end">
              <div className="flex-grow">
                <textarea
                  id="equipment"
                  name="equipment"
                  placeholder="Ecrivez vos matériels"
                  className="input input-bordered w-full mt-1 align-middle text-black overflow-hidden"
                  autoComplete="off"
                />
              </div>
              <button className="btn ml-2">Valider</button>
            </div>
          </label>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button
          onClick={() => {
            dispatch(modalIsOpen(isOpen));
          }}
        ></button>
      </form>
    </dialog>
  );
}

export default CreateSession;
