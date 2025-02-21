import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
};

const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Check if paste with the same ID already exists
      const exists = state.pastes.some((item) => item._id === paste._id);
      if (exists) {
        toast.error("Paste already exists!");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id); // ✅ Corrected ID check

      if (index >= 0) {
        state.pastes[index] = paste; // ✅ Update the paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // ✅ Corrected localStorage key
        toast.success("Paste updated successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log("Removing paste with ID:", pasteId);

      const updatedPastes = state.pastes.filter((item) => item._id !== pasteId);
      if (updatedPastes.length < state.pastes.length) {
        state.pastes = updatedPastes;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully!");
      } else {
        toast.error("Paste not found!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset!");
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
