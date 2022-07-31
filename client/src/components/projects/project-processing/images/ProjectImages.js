/** @format */

import { useQuery } from '@apollo/client';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import { GET_ORDER_IMAGES } from '../../../../api-calls/queries/misc';
import { formatDate } from '../../../../functions/formattingFunctions';

const ProjectImages = () => {
	const { id } = useParams();

	const { data, loading } = useQuery(GET_ORDER_IMAGES, {
		variables: { id: Number(id) },
		fetchPolicy: 'cache-and-network',
	});
	const images = data?.imageDetails?.nodes.map((item) => ({
		original: `${process.env.REACT_APP_API_ENDPOINT}/images/resized/${item.headerImageFile.id}`,
		thumbnail: `${process.env.REACT_APP_API_ENDPOINT}/images/thumbnails/${item.headerImageFile.id}`,

		originalHeight: 800,
		description: (
			<div style={{ textAlign: 'left' }}>
				<p>WORKSHEET: {item.worksheetReference}</p>
				<p>{item.longName}</p>
				{
					<p>
						{item.exifDate
							? formatDate(item.exifDate)
							: formatDate(item.dateTakenManual)}
					</p>
				}
			</div>
		),
	}));
	const handleImageClick = (event) =>
		window.open(
			event.target.currentSrc.replace('resized', 'original'),
			'_blank',
		);

	if (loading) return null;
	return (
		<div style={{ marginTop: '50px' }}>
			{images?.length > 0 ? (
				<ImageGallery
					items={images}
					thumbnailPosition='bottom'
					onClick={handleImageClick}
					lazyLoad={true}
					showThumbnails={true}
				/>
			) : (
				<div className='no-data-message'>
					NO IMAGES ARE AVAILABLE FOR THIS PROJECT
				</div>
			)}
		</div>
	);
};

export default ProjectImages;
