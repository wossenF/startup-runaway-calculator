import create from 'zustand';

const useStore = create((set) => ({
  // State
  isLoading: false,