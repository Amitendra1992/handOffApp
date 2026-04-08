import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import HandOffContext from "../utils/HandOffContext";

const HandoffDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handoffs, updateHandoff, updateHandoffStatus, addComment } = useContext(HandOffContext);
    
    const handoff = handoffs.find(h => h.id === id);
    
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        customerName: '',
        issue: '',
        priority: '',
        assignedTo: ''
    });
    const [newComment, setNewComment] = useState('');

    if (!handoff) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <p className="text-red-500">Handoff not found!</p>
                <button 
                    onClick={() => navigate('/')}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    ← Back to list
                </button>
            </div>
        );
    }

    const priorityColors = {
        Low: 'bg-green-100 text-green-800',
        Medium: 'bg-yellow-100 text-yellow-800',
        High: 'bg-orange-100 text-orange-800',
        Urgent: 'bg-red-100 text-red-800'
    };

    const statusColors = {
        New: 'bg-blue-100 text-blue-800',
        'In Progress': 'bg-purple-100 text-purple-800',
        Resolved: 'bg-green-100 text-green-800'
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

    const handleEdit = () => {
        setEditData({
            customerName: handoff.customerName,
            issue: handoff.issue,
            priority: handoff.priority,
            assignedTo: handoff.assignedTo
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        updateHandoff(id, editData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            addComment(id, newComment);
            setNewComment('');
        }
    };

    const handleStatusChange = (e) => {
        updateHandoffStatus(id, e.target.value);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')}
                className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
            >
                ← Back to list
            </button>

            <div className="bg-white rounded-lg shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.customerName}
                                onChange={(e) => setEditData({...editData, customerName: e.target.value})}
                                className="text-3xl font-bold border-b-2 border-blue-500 outline-none"
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-800">{handoff.customerName}</h1>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded text-sm font-medium ${priorityColors[handoff.priority]}`}>
                            {handoff.priority}
                        </span>
                        {!isEditing && (
                            <button
                                onClick={handleEdit}
                                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status:</label>
                    <select
                        value={handoff.status}
                        onChange={handleStatusChange}
                        disabled={isEditing}
                        className={`px-3 py-2 rounded font-medium text-sm cursor-pointer ${statusColors[handoff.status]}`}
                    >
                        <option value="New">🔵 New</option>
                        <option value="In Progress">🟣 In Progress</option>
                        <option value="Resolved">🟢 Resolved</option>
                    </select>
                </div>

                {/* Issue Description */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Issue Description:</h3>
                    {isEditing ? (
                        <textarea
                            value={editData.issue}
                            onChange={(e) => setEditData({...editData, issue: e.target.value})}
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ) : (
                        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{handoff.issue}</p>
                    )}
                </div>

                {/* Priority and Assigned To */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Priority:</h3>
                        {isEditing ? (
                            <select
                                value={editData.priority}
                                onChange={(e) => setEditData({...editData, priority: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Urgent">Urgent</option>
                            </select>
                        ) : (
                            <p className="text-gray-700">{handoff.priority}</p>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned To:</h3>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editData.assignedTo}
                                onChange={(e) => setEditData({...editData, assignedTo: e.target.value})}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ) : (
                            <p className="text-gray-700">👤 {handoff.assignedTo}</p>
                        )}
                    </div>
                </div>

                {/* Edit Buttons */}
                {isEditing && (
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {/* Timestamps */}
                <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between text-sm text-gray-500">
                        <span>Created: {formatDate(handoff.createdAt)}</span>
                        <span>Last Updated: {formatDate(handoff.updatedAt)}</span>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Comments & Updates</h3>
                    
                    {/* Add Comment */}
                    <div className="mb-4">
                        <textarea
                            disabled = {!isEditing}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment or update..."
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddComment}
                            disabled = {!isEditing}
                            className={`mt-2 px-6 py-2 text-white rounded-lg font-medium ${isEditing ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 hover:bg-gray-600"}`}
                        >
                            Add Comment
                        </button>
                    </div>

                    {/* Display Comments */}
                    <div className="space-y-3">
                        {handoff.comments && handoff.comments.length > 0 ? ( //when no comment is added
                            handoff.comments.map(comment => (
                                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700 mb-2">{comment.text}</p>
                                    <p className="text-xs text-gray-500">{formatDate(comment.timestamp)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No comments yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HandoffDetail;