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