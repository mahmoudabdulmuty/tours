import { useState } from 'react';

const Tour = ({ id, name, info, image, price, handleDelete }) => {
	const [readMore, setReadMore] = useState(true);
	return (
		<article className="single-tour">
			<img src={image} alt={name} />
			<footer>
				<div className="tour-info">
					<h4>{name}</h4>
					<h4 className="tour-price">${price}</h4>
				</div>
				<p>
					{readMore ? `${info.slice(0, 200)}...` : `${info}`}
					<button
						className=""
						onClick={() => setReadMore((prevState) => !prevState)}
					>
						{readMore ? 'Read More' : 'show less'}
					</button>
				</p>
				<button onClick={() => handleDelete(id)} className="delete-btn">
					not Interested
				</button>
			</footer>
		</article>
	);
};

export default Tour;
