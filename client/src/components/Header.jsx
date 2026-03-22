import React from 'react'

const Header = () => {
  return (
    <header className="w-full bg-white text-black border-b border-gray-200">
      <div className="flex items-center justify-between px-3 py-3">
        
        {/* Title */}
        <h1 className="text-xl font-bold">Notes</h1>

        {/* User Section */}
        <div className="flex items-center gap-2">
          
          {/* Avatar */}
          <button className="w-8 h-8 rounded-full bg-gray-400 text-white text-sm font-semibold flex items-center justify-center">
            RA
          </button>

          {/* User Info */}
          <div className="hidden sm:flex flex-col text-right">
            <h3 className="text-xs font-medium">Test User</h3>
            <button className="text-xs text-gray-500 hover:text-black">
              Logout
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header