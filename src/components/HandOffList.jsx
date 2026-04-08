import { useContext, useState } from "react";
import HandoffContext from "../utils/HandOffContext";
import HandOffCard from "./HandOffCard";

const HandOffList = () => {

    const [checkedInput, setCheckedInput] = useState({
        urgent: false,
        high: false,
        medium: false,
        low: false,
    });

    const [progInput, setProgInput] = useState({
        active: false,
        resolved: false,
    });

    const [searchedName, setSearchedName] = useState("");

    const {handoffs} = useContext(HandoffContext);

    function handleChange(e){
        const {name, checked} = e.target;
        setCheckedInput((prev)=>({...prev, [name]: checked}));
    }

    function handleProgChange(e){
        const {name, checked} = e.target;
        setProgInput((prev)=>({...prev, [name]: checked}))
    }

    // FILTER LOGIC
    const filteredHandoffs = handoffs.filter(handoff => {
        // 1. Search filter - check if customer name matches search term
        const matchesSearch = handoff.customerName.toLowerCase().includes(searchedName.toLowerCase());
        
        // 2. Priority filter
        // Check if ANY checkbox is selected
        const anyPrioritySelected = checkedInput.urgent || checkedInput.high || checkedInput.medium || checkedInput.low;
        
        // If no priority is selected, show all by default
        let matchesPriority = true;
        if (anyPrioritySelected) {
            // If priorities are selected, only show matching ones
            matchesPriority = 
                (checkedInput.urgent && handoff.priority === "Urgent") ||
                (checkedInput.high && handoff.priority === "High") ||
                (checkedInput.medium && handoff.priority === "Medium") ||
                (checkedInput.low && handoff.priority === "Low");
        }

        //3. Progress filter

        // Check if ANY checkbox is selected
        const anyProgressSelected = progInput.active || progInput.resolved;

        let matchesProgress = true;
        if(anyProgressSelected){
            matchesProgress = (progInput.active && handoff.status !== "Resolved") || 
                              (progInput.resolved && handoff.status === "Resolved")
        }
        
        // Return true only if BOTH search AND priority match
        return matchesSearch && matchesPriority && matchesProgress;
    });

    if(handoffs.length === 0){
        return <p className="text-gray-500">No handoffs yet. Create one above!</p>
    }
    return(
        <div className="max-w-7xl mx-auto p-10">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Handoffs ({filteredHandoffs.length})</h2>
                
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by customer name..."
                        value={searchedName}
                        onChange={(e) => setSearchedName(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
            </div>

            <div className="mb-6 p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Priority Level:</h3>
                <form className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="urgent" 
                            checked={checkedInput.urgent} 
                            onChange={handleChange}
                            className="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                        />
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm font-medium">
                            Urgent
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="high" 
                            checked={checkedInput.high} 
                            onChange={handleChange}
                            className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
                        />
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded text-sm font-medium">
                            High
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="medium" 
                            checked={checkedInput.medium} 
                            onChange={handleChange}
                            className="w-4 h-4 text-yellow-600 rounded focus:ring-2 focus:ring-yellow-500"
                        />
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                            Medium
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="low" 
                            checked={checkedInput.low} 
                            onChange={handleChange}
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                            Low
                        </span>
                    </label>
                </form>
            </div>

            <div className="mb-6 p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Active/Resolved</h3>
                <form className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="active" 
                            checked={progInput.active}
                            onChange={handleProgChange}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
                            Active
                        </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="resolved" 
                            checked={progInput.resolved}
                            onChange={handleProgChange}
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-medium">
                            Resolved
                        </span>
                    </label>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredHandoffs.map((handOff) => {
                return <HandOffCard key={handOff.id} handOff={handOff} />
                })}
            </div>
        </div>

    )
}

export default HandOffList;