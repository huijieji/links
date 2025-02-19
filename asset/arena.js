// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
let channelSlug = 'hip-hop-creativity' // The "slug" is just the end of the URL


// Learn it from deepseek This code provides a structured way to classify and render different types of content blocks
// renderBlock(type, title, description, imageURL, contentURL) is responsible for actually displaying/rendering each block.
let classify = (block) => {
	switch (block.class) {
		// If the block is a Link, render it with title, description, image, and source URL
		case 'Link':
			renderBlock('Link', block.title, block.description, block.image.original.url, block.source.url)
			break
			 // If the block is an Image, render it with title, description, and image URL
		case 'Image':
			renderBlock('Image', block.title, block.description, block.image.original.url)
			break
			 // If the block is an Text, render it with title, description, and image URL
		case 'Text':
			renderBlock('Text', block.title, block.description, block.image.original.url)
			break
			
		case 'Attachment':
			switch (block.attachment.content_type) {
				case 'application/pdf':
					renderBlock('PDF', block.title, block.description, block.image?.original.url, block.attachment.url)
					break
				case 'video/quicktime':
					renderBlock('Video', block.title, block.description, block.image?.original.url, block.attachment.url)
					break
				case 'audio/mpeg':

					renderBlock('Audio', block.title, block.description, block.image?.original.url, block.attachment.url)
					break
				default:
					console.log(block)
			}
			 // If the block is a Media type, render it based on its embedded content
			break
		case 'Media':
			renderBlock(block.embed.type, block.title, block.description, block.image?.original.url, block.embed.html)
			break
	}
	
}


// It's always good to credit your work://
let renderUser = (user, container) => { // You can have multiple arguments for a function!
	let userAddress =
		`
		<address>
			<img src="${user.avatar_image.display}">
			<h3>${user.first_name}</h3>
			<p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
		</address>
		`
	container.insertAdjacentHTML('beforeend', userAddress)
}

// Function about blocks//
const blockItems = [];
const renderBlock = (type, title, description, imageUrl, fileUrl) => {
	const channelBlocks = document.querySelector('.channel-blocks');
	const isLarge = channelBlocks.children.length % 5 === 0;

	const blockItem = document.createElement('div');
	blockItem.className = `image-item ${isLarge ? 'large' : ''}`;
	blockItem.innerHTML = `
	<img src="${imageUrl}" alt="${title}">
	<div class="hover-content">
	<h3>${title}</h3>
	<p>${description}</p>
	</div>
	`;

	
// Function about blocks-Audio//
	if (type === 'Audio') {
		blockItem.querySelector('img').src = 'asset/audio/3aaf8108d1303561c35ef707abdf28f.jpg';
		// blockItem.querySelector('img').src = 'asset/audio/image 3.png';
	}

	blockItem.addEventListener('mouseenter', () => {
		blockItems.forEach(item => {
			if (item !== blockItem) {
				item.style.opacity = '0.5';
			}
		});
	});

	blockItem.addEventListener('mouseleave', () => {
		blockItems.forEach(item => {
			item.style.opacity = '1';
		});
	});


	switch (type) {
		case 'Link':
			blockItem.addEventListener('click', () => {
				linkTo(fileUrl);
			});
			break
		case 'Video':
			blockItem.addEventListener('click', () => {
				showVideo(fileUrl);
			});
			break
		case 'Audio':
			blockItem.addEventListener('click', () => {
				showAudio(title, fileUrl);
			});
			break
		case 'PDF':
			blockItem.addEventListener('click', () => {
				showPDF(fileUrl);
			});
			break
		case 'Image':
			blockItem.addEventListener('click', () => {
				showImg(imageUrl);
			});
			break
	}

	channelBlocks.appendChild(blockItem);
	blockItems.push(blockItem);
}

const createBackdrop = () => {
	const backdrop = document.createElement('div');
	backdrop.className = 'modal-backdrop';
	document.body.appendChild(backdrop);
	setTimeout(() => backdrop.classList.add('active'), 10);
	return backdrop;
};


const linkTo = (url) => {
	window.open(url, '_blank');
}

const showVideo = (url) => {
	const backdrop = createBackdrop();
	const body = document.querySelector('body');
	const videoContainer = document.createElement('div');
	videoContainer.className = 'video-container';

	const video = document.createElement('video');
	video.controls = true;
	video.src = url;

	const closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.innerHTML = '×';
	closeButton.onclick = () => {
		body.removeChild(videoContainer);
	};

	closeButton.onclick = () => {
		backdrop.classList.remove('active');
		setTimeout(() => {
			body.removeChild(videoContainer);
			body.removeChild(backdrop);
		}, 300);
	};

	videoContainer.appendChild(video);
	videoContainer.appendChild(closeButton);
	body.appendChild(videoContainer);
	video.play();
}

const showAudio = (title, url) => {
	const backdrop = createBackdrop();
	const body = document.querySelector('body');
	const audioContainer = document.createElement('div');
	audioContainer.className = 'audio-container';

	const playerContent = document.createElement('div');
	playerContent.className = 'player-content';

	const closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.innerHTML = '×';
	closeButton.onclick = () => {
		body.removeChild(audioContainer);
	};

	const audioTitle = document.createElement('h3');
	audioTitle.className = 'audio-title';
	audioTitle.innerHTML = title;

	const audio = document.createElement('audio');
	audio.src = url;
	audio.controls = true;

	const controls = document.createElement('div');
	controls.className = 'custom-controls';

	const playButton = document.createElement('button');
	playButton.className = 'play-button';
	playButton.innerHTML = '▶';

	const timeInfo = document.createElement('div');
	timeInfo.className = 'time-info';
	timeInfo.innerHTML = '<span class="current-time">0:00</span> / <span class="total-time">0:00</span>';

	const progressContainer = document.createElement('div');
	progressContainer.className = 'progress-container';

	const progressBar = document.createElement('div');
	progressBar.className = 'progress-bar';

	progressContainer.appendChild(progressBar);
	controls.appendChild(playButton);
	controls.appendChild(progressContainer);
	controls.appendChild(timeInfo);

	playerContent.appendChild(audioTitle);
	playerContent.appendChild(controls);

	audioContainer.appendChild(closeButton);
	audioContainer.appendChild(playerContent);
	audioContainer.appendChild(audio);

	body.appendChild(audioContainer);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	};

	audio.addEventListener('loadedmetadata', () => {
		timeInfo.querySelector('.total-time').textContent = formatTime(audio.duration);
	});

	audio.addEventListener('timeupdate', () => {
		const progress = (audio.currentTime / audio.duration) * 100;
		progressBar.style.width = `${progress}%`;
		timeInfo.querySelector('.current-time').textContent = formatTime(audio.currentTime);
	});

	closeButton.onclick = () => {
		backdrop.classList.remove('active');
		setTimeout(() => {
			body.removeChild(audioContainer);
			body.removeChild(backdrop);
		}, 300);
	};

	playButton.onclick = () => {
		if (audio.paused) {
			audio.play();
			playButton.innerHTML = '||';
		} else {
			audio.pause();
			playButton.innerHTML = '▶';
		}
	};

	progressContainer.addEventListener('click', (e) => {
		const clickPosition = (e.offsetX / progressContainer.offsetWidth);
		audio.currentTime = clickPosition * audio.duration;
	});
};

// Function about blocks-PDF//
const showPDF = (url) => {
	const backdrop = createBackdrop();
	const body = document.querySelector('body');
	const pdfContainer = document.createElement('div');
	pdfContainer.className = 'pdf-container';

	const iframe = document.createElement('iframe');
	iframe.src = url;

	pdfContainer.appendChild(iframe);
	body.appendChild(pdfContainer);

	const closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.innerHTML = '×';
	closeButton.onclick = () => {
		body.removeChild(pdfContainer);
	};

	closeButton.onclick = () => {
		backdrop.classList.remove('active');
		setTimeout(() => {
			body.removeChild(pdfContainer);
			body.removeChild(backdrop);
		}, 300);
	};

	pdfContainer.appendChild(closeButton);
}

// Function about blocks-Image//
function showImg(url) {
	let div = document.createElement('div');
	div.className = 'img-overlay';

	let img = document.createElement('img');
	img.src = url;

	let closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.innerHTML = '×';

	closeButton.onclick = () => document.body.removeChild(div);
	div.onclick = () => document.body.removeChild(div);

	div.appendChild(img);
	div.appendChild(closeButton);
	document.body.appendChild(div);
}

fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
	.then((response) => response.json()) // Return it as JSON data
	.then((data) => { // Do stuff with the data
		console.log(data) // Always good to check your response!
		// placeChannelInfo(data) // Pass the data to the first function
		data.contents.reverse().forEach((block) => {
			classify(block)
		})
		// let channelUsers = document.querySelector('#channel-users') // Show them together
		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
		// renderUser(data.user, channelUsers)
	})

// Scroll bar//
function initCustomScrollbar() {
	const container = document.querySelector('.scroll-container');
	const thumb = document.querySelector('.scrollbar-thumb');
	const scrollbar = document.querySelector('.custom-scrollbar');
	let isDragging = false;
	let startX, scrollLeft, thumbLeft;
	
// Thumb Position//
	function updateThumbPosition() {
		const scrollRatio = container.scrollLeft / (container.scrollWidth - container.clientWidth);
		const maxOffset = scrollbar.clientWidth - thumb.clientWidth;
		const newPosition = scrollRatio * maxOffset;
		thumb.style.transform = `translateX(${newPosition}px)`;
	}

	container.addEventListener('scroll', updateThumbPosition);

	thumb.addEventListener('mousedown', (e) => {
		isDragging = true;
		startX = e.clientX;
		thumbLeft = thumb.getBoundingClientRect().left - scrollbar.getBoundingClientRect().left;
		scrollLeft = container.scrollLeft;
		thumb.style.transition = 'none';
	});

	document.addEventListener('mousemove', (e) => {
		if (!isDragging) return;
		e.preventDefault();

		const deltaX = e.clientX - startX;
		const scrollbarWidth = scrollbar.clientWidth;
		const thumbWidth = thumb.clientWidth;
		const maxScroll = container.scrollWidth - container.clientWidth;
		const maxThumbTravel = scrollbarWidth - thumbWidth;

		const newThumbPosition = Math.max(0, Math.min(maxThumbTravel, thumbLeft + deltaX));
		const scrollRatio = newThumbPosition / maxThumbTravel;

		container.scrollLeft = scrollRatio * maxScroll;
		thumb.style.transform = `translateX(${newThumbPosition}px)`;
	});

	document.addEventListener('mouseup', () => {
		if (isDragging) {
			isDragging = false;
			thumb.style.transition = 'background 0.3s';
		}
	});

	scrollbar.addEventListener('click', (e) => {
		if (e.target === thumb) return;
		const clickRatio = (e.pageX - scrollbar.getBoundingClientRect().left) / scrollbar.clientWidth;
		container.scrollLeft = clickRatio * (container.scrollWidth - container.clientWidth);
	});
}
