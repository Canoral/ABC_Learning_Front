import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axios";
import { ICards } from "../../../components/@types/cards";
import { ICard } from "../../../components/@types/card";

interface CardState {
  cards: ICards[] | null;
  card: ICard[] | null;
  card_id: number;
  isChecked: boolean;
  toolId: string | number;
  isOpen: boolean;
}

const initialState: CardState = {
  cards: null,
  card: null,
  isChecked: false,
  toolId: "",
  isOpen: false,
  card_id: 0,
};

export const getAllCards = createAsyncThunk(
  "cards/fetch all cards",
  async () => {
    const response = await axiosInstance.get("/storyBoard/cards");
    return response.data;
  }
);

export const getOneCard = createAsyncThunk(
  "card/fetch a specific card",
  async (cardId: string) => {
    const response = await axiosInstance.get(`storyBoard/cards/${cardId}`);
    response.data.map(
      (e: { get_activities: { card_id: string; color: string } }) => {
        localStorage.setItem("card_id", e.get_activities.card_id),
          localStorage.setItem("color", e.get_activities.color);
      }
    );
    return response.data;
  }
);

export const getOneTool = createAsyncThunk(
  "Card reducer / Get one tool", // nom de l'action
  async (toolId: number) => {
    const response = await axiosInstance.get(`/user/tool/${toolId}/`);
    localStorage.setItem("tool_id", response.data.id);
    return response.data;
  }
);

export const togglerCheckbox = createAction<boolean>(
  "card/Toggle checkbox bouton"
);

export const modalIsOpen = createAction<boolean>("Card reducer/Modal toggler");

const cardReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllCards.fulfilled, (state, action) => {
      state.cards = action.payload;
    })
    .addCase(getOneCard.fulfilled, (state, action) => {
      state.card = action.payload;
      action.payload.map(
        (e: { get_activities: { card_id: number } }) =>
          (state.card_id = e.get_activities.card_id)
      );
    })
    .addCase(getOneTool.fulfilled, (state, action) => {
      state.toolId = action.payload;
    })
    .addCase(togglerCheckbox, (state) => {
      state.isChecked = !state.isChecked;
    })
    .addCase(modalIsOpen, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default cardReducer;
