import { useNavigate } from 'react-router-dom';

export default function AddPGForm() {
    const navigate = useNavigate();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Process form data here if needed
        navigate('/list-your-pg');
    };
    return(
        <>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-4">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">List Your PG</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Form fields for listing a PG */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                PG Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter PG name"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        {/* Add more fields as needed */}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                        >
                            List PG
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}