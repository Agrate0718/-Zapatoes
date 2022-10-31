export default function InquirySearch(search:any, setSearch:any) {
    return (
        <div>
            <input type="search" value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-700 bg-white border rounded-full shadow-sm overflow-visible focus:text-gray-700 focus:border-blue-600 focus:outline-none" placeholder="Search for anything" aria-label="Search" 
            />
        </div>
    );
}