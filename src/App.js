import { useEffect, useState } from 'react';
import Error from './Error';
import Loading from './Loading';
import Tours from './Tours';

function App() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const fetchTours = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				'https://jsonplaceholder.typicode.com/todossssss'
			);
			if (!res.ok) throw new Error(res.statusText);
			const tours = await res.json();
			setData(tours);
			setLoading(false);
			setError(false);
		} catch (error) {
			setLoading(false);
			setError("can't fetch data");
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	return (
		<main>
			{loading && <Loading />}
			{error && <Error error={error} />}
			{data.length > 0 && <Tours tours={data} />}
		</main>
	);
}

export default App;
