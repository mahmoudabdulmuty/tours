import { useCallback, useEffect, useState } from 'react';
import Error from './Error';
import Loading from './Loading';
import RefreshBtn from './RefreshBtn';
import Tours from './Tours';

function App() {
	const [tours, setTours] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleDelete = (id) => {
		setTours((prevTours) => {
			return prevTours.filter((tour) => {
				return tour.id !== id;
			});
		});
	};

	const fetchTours = useCallback(async () => {
		try {
			const res = await fetch('https://course-api.com/react-tours-project');
			if (!res.ok) throw new Error(res.statusText);
			const tours = await res.json();
			setLoading(false);
			setTours(tours);
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
			{tours.length > 0 && <Tours handleDelete={handleDelete} tours={tours} />}
			{loading && <Loading />}
			{error && <Error error={error} />}
			{!error && !loading && tours.length === 0 && (
				<RefreshBtn fetchTours={fetchTours} />
			)}
		</main>
	);
}

export default App;
