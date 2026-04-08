import {useContext} from "react";
import HandoffContext from "../utils/HandOffContext";
import { useNavigate } from "react-router";

const HandOffCard = ({handOff}) => {

    const {updateHandOffStatus} = useContext(HandoffContext);

    const navigate = useNavigate();

    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Urgent: 'bg-red-100 text-red-800'
    };

    const statusColors = {
        New: 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-purple-100 text-purple-800',
        Resolved: 'bg-green-100 text-green-800',
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    function handleStatusChange(e){
        updateHandOffStatus(handOff.id, e.target.value)
    }

    return (
        <div onClick={() => navigate(`/handOff/${handOff.id}`)}
             className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white h-full flex flex-col cursor-pointer">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{handOff.customerName}</h3>
                <span className={`text-sm px-3 py-1 rounded ${priorityColors[handOff.priority]}`}>{handOff.priority}</span>
            </div>
            <p className="text-gray-700 mb-3 flex-grow line-clamp-3">{handOff.issue}</p>

            <div className="mt-auto">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>👤 {handOff.assignedTo}</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm">Status:</span>
                    <select
                        value={handOff.status}
                        onChange={handleStatusChange}
                        className={`px-3 py-1 rounded font-medium text-sm cursor-pointer ${statusColors[handOff.status]}`}
                    >
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
            </div>
            </div>

            <div className="flex flex-col gap-1 text-xs text-gray-500 pt-3 border-t">
                <p className="font-medium p-2">Created: {formatDate(handOff.createdAt)}</p>
                <p className="font-medium p-2">Last Updated: {formatDate(handOff.updatedAt)}</p>
            </div>
        </div>
    );
};

export default HandOffCard;