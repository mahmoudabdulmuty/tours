import { useCallback, useEffect, useState } from 'react';
import Error from './Error';
import Loading from './Loading';
import Tours from './Tours';

function App() {
	const [tours, setTours] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleDelete = (id) => {
		setTours((prevTours) => {
			return prevTours.filter((tour) => {
				return tour.id !== id;
			});
		});
	};

	const fetchTours = useCallback(async () => {
		setLoading(true);
		try {
			const res = await fetch('https://course-api.com/react-tours-project');
			if (!res.ok) throw new Error(res.statusText);
			const tours = await res.json();
			setTours(tours);
			setLoading(false);
			setError(false);
		} catch (error) {
			setLoading(false);
			setError("can't fetch tours");
			console.log(error.message);
		}
	}, []);

	useEffect(() => {
		fetchTours();
	}, [fetchTours]);

	return (
		<main>
			{loading && <Loading />}
			{error && <Error error={error} />}
			{tours.length > 0 && <Tours handleDelete={handleDelete} tours={tours} />}
			{!error && tours.length === 0 && (
				<>
					<div className="title">
						<h2>no tours left</h2>
						<button className="btn" onClick={fetchTours}>
							refresh
						</button>
					</div>
				</>
			)}
		</main>
	);
}

export default App;
