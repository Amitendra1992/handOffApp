import { useState, useContext } from 'react';
import HandoffContext from '../utils/HandOffContext';
import { useNavigate } from 'react-router';

const CreateHandoff = () => {
    const { addHandOff } = useContext(HandoffContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: '',
        issue: '',
        priority: 'Medium',
        assignedTo: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        
        const newHandoff = {
            id: Date.now().toString(),
            customerName: formData.customerName,
            issue: formData.issue,
            priority: formData.priority,
            status: 'New',
            assignedTo: formData.assignedTo,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        addHandOff(newHandoff);
        
        setFormData({
            customerName: '',
            issue: '',
            priority: 'Medium',
            assignedTo: ''
        });

        navigate('/');
    }
    
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }
    
    return (
        <div className="max-w-2xl mx-auto p-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Handoff</h2>
                <p className="text-gray-600 mb-6">Document customer issues for seamless shift transitions</p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Name */}
                    <div>
                        <label htmlFor="customerName" className="block text-sm font-semibold text-gray-700 mb-2">
                            Customer Name *
                        </label>
                        <input 
                            type="text" 
                            id="customerName"
                            name="customerName"
                            placeholder="Enter customer name" 
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Issue Description */}
                    <div>
                        <label htmlFor="issue" className="block text-sm font-semibold text-gray-700 mb-2">
                            Issue Description *
                        </label>
                        <textarea 
                            name="issue" 
                            id="issue"
                            rows="5"
                            placeholder="Describe the customer's issue in detail..."
                            value={formData.issue}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        />
                    </div>

                    {/* Priority and Assigned To - Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Priority */}
                        <div>
                            <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-2">
                                Priority Level *
                            </label>
                            <select 
                                name="priority" 
                                id="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                            >
                                <option value="Low">🟢 Low</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="High">🟠 High</option>
                                <option value="Urgent">🔴 Urgent</option>
                            </select>
                        </div>

                        {/* Assigned To */}
                        <div>
                            <label htmlFor="assignedTo" className="block text-sm font-semibold text-gray-700 mb-2">
                                Assign To *
                            </label>
                            <input 
                                type="text" 
                                name="assignedTo"
                                id="assignedTo"
                                placeholder="Team member name"
                                value={formData.assignedTo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Create Handoff
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateHandoff;