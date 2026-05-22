export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#2b2b2b]">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
          $
        </div>
        <span className="text-xl font-semibold">stratavia</span>
      </div>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
        <span className="text-sm text-gray-300">
          mariano@gmail.com
        </span>
      </div>
    </div>
  );
}