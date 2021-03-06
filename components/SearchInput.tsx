import React, { SetStateAction } from "react";

interface SearchInputProps {
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SearchInput:React.FC<SearchInputProps> = ({ handleSearch, searchInput, setSearchInput }) => (
  <form id="form-search" className="flex flex-col items-center pt-5" onSubmit={handleSearch}>
    <input type="search" 
      value={searchInput} onChange={({ target: { value } }) => setSearchInput(value)}
      className="p-5 rounded-2xl text-slate-700 text-4xl font-bold w-full"
    />
    <button className="my-5 p-5 w-fit bg-white hover:bg-slate-700 text-slate-700 hover:text-white text-2xl font-semibold rounded-2xl">Search</button>
  </form>
)

export default SearchInput;