import React from 'react'

const Dropdown = ({setFilter}) => {
  return (
      <div className="px-4 md:px-10 py-4 md:py-7">
          <div className="flex items-center justify-between">
              <p tabindex="0" className="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Tasks</p>
              <div className="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                  <p>Filter By:</p>
                  <select onChange={(e) => setFilter(e.target.value)} aria-label="select" className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                      <option className="text-sm text-indigo-800" value={'all'}  >All</option>
                      <option className="text-sm text-indigo-800" value={'low'} >Low Priority</option>
                      <option className="text-sm text-indigo-800" value={'normal'} >Normal Priority</option>
                      <option className="text-sm text-indigo-800" value={'high'} >High Priority</option>
                      <option className="text-sm text-indigo-800" value={'done'}  >Complted </option>
                      <option className="text-sm text-indigo-800" value={'pending'}  >Pending</option>
                  </select>
              </div>
          </div>
      </div>
  )
}

export default Dropdown