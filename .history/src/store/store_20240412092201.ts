import create from 'zustand';

const useStore = create((set) => ({
  // State
  isLoading: false,
  errorMessage: '',
  data: [],

  // Actions
  getData(url) {
    set({ isLoading: true });
    fetch(url)  
      .then((response) => response.json())
      .then((data) => {
        set({ data, isLoading: false });
      })
      .catch((error) => {
        set({ errorMessage: error.message, isLoading: false });
      });
  },