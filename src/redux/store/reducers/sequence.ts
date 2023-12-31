import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axios';
import { ISequence } from '../../../components/@types/sequence';

interface SequenceState {
  sequenceName: string | null;
  sequenceId: number | null;
  sequences: ISequences[];
  sequence: ISequence[];
  alert: string | null;
  toggle: boolean;
  isOpen: boolean;
}

const initialState: SequenceState = {
  sequenceName: null,
  sequenceId: null,
  sequences: [],
  sequence: [],
  alert: null,
  toggle: false,
  isOpen: false,
};

export const createSequence = createAsyncThunk(
  'sequence reducer / Creating a new sequence',
  async (formData: FormData) => {
    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post(
        `/user/${localStorage.getItem('id')}/sequence`,
        objData
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const getAllSequences = createAsyncThunk(
  'Sequence reducer/Get all sequences', // nom de l'action
  async () => {
    try {
      const { data } = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/`
      );
      return data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const getOneSequence = createAsyncThunk(
  'Sequence reducer / Get one sequence', // nom de l'action
  async (sequenceId: string) => {
    try {
      const response = await axiosInstance.get(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const deleteSequence = createAsyncThunk(
  'Sequence reducer / Sequence was deleted', // nom de l'action
  async (sequenceId: number) => {
    try {
      const { data } = await axiosInstance.delete(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`
      );
      return data;
    } catch (error) {
      console.log('error :', error);
    }
  }
);

export const updateSequence = createAsyncThunk(
  'Sequence reducer / Sequence was updated',
  async (formData: FormData) => {
    try {
      const objData = Object.fromEntries(formData);
      const { sequenceId } = objData;
      const response = await axiosInstance.put(
        `/user/${localStorage.getItem('id')}/sequence/${sequenceId}`,
        objData
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
      // Vous pouvez également renvoyer une valeur de rejet ici si nécessaire
      throw error;
    }
  }
);

export const toggleUpdateSequenceMenu = createAction<boolean>(
  'Sequence reducer/Toggle modal state'
);

export const resetSequenceAlert = createAction(
  'Sequence reducer/Reset alert state'
);

export const openDeleteSequenceModal = createAction<boolean>(
  'Sequence reducer/Toggle suppresion modal'
);

const sequenceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getAllSequences.fulfilled, (state, action) => {
      state.sequences = action.payload;
    })
    .addCase(getOneSequence.fulfilled, (state, action) => {
      state.sequence = action.payload;
    })
    .addCase(createSequence.fulfilled, (state, action) => {
      action.payload.map((e: { id: number; name: string }) => {
        state.sequenceId = e.id;
        localStorage.setItem('sequence_name', e.name);
      });
      state.alert = 'Le scénario a été crée';
    })
    .addCase(deleteSequence.fulfilled, (state) => {
      state.alert = 'Le scénario a été supprimé';
    })
    .addCase(updateSequence.fulfilled, (state, action) => {
      state.alert = 'Le scénario a été mis à jour';
      action.payload.map((element: { name: string; id: number }) => {
        state.sequenceId = element.id;
        localStorage.setItem('sequence_name', element.name);
      });
    })
    .addCase(toggleUpdateSequenceMenu, (state) => {
      state.toggle = !state.toggle;
    })
    .addCase(resetSequenceAlert, (state) => {
      state.alert = null;
    })
    .addCase(openDeleteSequenceModal, (state) => {
      state.isOpen = !state.isOpen;
    });
});

export default sequenceReducer;
