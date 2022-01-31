function RefreshBtn({ fetchTours }) {
	return (
		<div className="title">
			<h2>no tours left</h2>
			<button className="btn" onClick={fetchTours}>
				refresh
			</button>
		</div>
	);
}

export default RefreshBtn;
