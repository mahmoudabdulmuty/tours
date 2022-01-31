import { useEffect, useState } from 'react';
import Loading from './Loading';
import Tours from './Tours';

const url = 'https://course-api.com/react-tours-project';
function App() {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		try {
			const getData = async () => {
				const res = await fetch('https://course-api.com/react-tours-project');
				const tours = await res.json();
				setData(tours);
			};
			getData();
			setIsLoading(false);
			setIsError(false);
		} catch (error) {
			setIsLoading(false);
			setIsError(error);
		}
	}, []);

	return (
		<main>
			{isLoading && <Loading />}
			{isError && { isError }}
			{data.length > 0 && <Tours tours={data} />}
		</main>
	);
}

export default App;
