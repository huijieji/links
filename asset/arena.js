// This allows us to process/render the descriptions, which are in Markdown!
// More about Markdown: https://en.wikipedia.org/wiki/Markdown
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)



// Okay, Are.na stuff!
let channelSlug = 'hip-hop-creativity' // The "slug" is just the end of the URL



// First, let's lay out some *functions*, starting with our basic metadata:
// let placeChannelInfo = (data) => {
// 	// Target some elements in your HTML:
// 	let channelTitle = document.querySelector('#channel-title')
// 	let channelDescription = document.querySelector('#channel-description')
// 	let channelCount = document.querySelector('#channel-count')
// 	let channelLink = document.querySelector('#channel-link')

// 	// Then set their content/attributes to our data:
// 	channelTitle.innerHTML = data.title
// 	channelDescription.innerHTML = window.markdownit().render(data.metadata.description) // Converts Markdown → HTML
// 	channelCount.innerHTML = data.length
// 	channelLink.href = `https://www.are.na/channel/${channelSlug}`
// }

// learn it from deepseek//
let classify = (block) => {
	switch (block.class) {
		case 'Link':
			renderBlock('Link', block.title, block.description, block.image.original.url, block.source.url)
			break
		case 'Image':
			renderBlock('Image', block.title, block.description, block.image.original.url)
			break
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
			break
		case 'Media':
			renderBlock(block.embed.type, block.title, block.description, block.image?.original.url, block.embed.html)
			break
	}
}

// 	// Images!
// 	else if (block.class == 'Image') {
// 		let imageItem = `
//     <div class="image-item">
//       <img src="${block.image.original.url}" alt="${block.title || 'Arena image'}">
//       <div class="hover-content">
//         <h3>${block.title || ''}</h3>
//         ${block.description_html || ''}
//       </div>
//     </div>
//   `;
// 		channelBlocks.insertAdjacentHTML('beforeend', imageItem);
// 	}

// 	// Text!
// 	else if (block.class == 'Text') {
// 		let textItem = `
//         <li>
//             <p><em>Text</em></p>
//             ${block.content_html}
//             ${block.description_html || ''}
//         </li>
//     `;
// 		channelBlocks.insertAdjacentHTML('beforeend', textItem);
// 	}

// 	// Uploaded (not linked) media…
// 	else if (block.class == 'Attachment') {
// 		let attachment = block.attachment.content_type // Save us some repetition

// 		// Uploaded videos!
// 		if (attachment.includes('video')) {
// 			// …still up to you, but we'll give you the `video` element:
// 			let videoItem =
// 				`
// 				<li>
// 					<p><em>Video</em></p>
// 					<video controls src="${block.attachment.url}"></video>
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', videoItem)
// 			// More on video, like the `autoplay` attribute:
// 			// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
// 		}

// 		// Uploaded PDFs!
// 		else if (attachment.includes('pdf')) {
// 			let pdfItem = `
//         <li>
//             <p><em>PDF</em></p>
//             <iframe src="${block.attachment.url}"></iframe>
//             <p><a href="${block.attachment.url}">查看PDF ↗</a></p>
//         </li>
//     `
// 			channelBlocks.insertAdjacentHTML('beforeend', pdfItem)
// 		}


// 		// Uploaded audio!
// 		else if (attachment.includes('audio')) {
// 			let audioItem = `
//         <li>
//             <p><em>Audio</em></p>
//             <audio controls src="${block.attachment.url}"></audio>
//         </li>
//     `
// 			channelBlocks.insertAdjacentHTML('beforeend', audioItem)
// 		}
// 	}

// 	// Linked media…
// 	else if (block.class == 'Media') {
// 		let embed = block.embed.type

// 		// Linked video!
// 		if (embed.includes('video')) {
// 			// …still up to you, but here's an example `iframe` element:
// 			let linkedVideoItem =
// 				`
// 				<li>
// 					<p><em>Linked Video</em></p>
// 					${block.embed.html}
// 				</li>
// 				`
// 			channelBlocks.insertAdjacentHTML('beforeend', linkedVideoItem)
// 			// More on iframe: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
// 		}

// 	}
// }



// It's always good to credit your work:
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

function showImg(url) {
	let div = document.createElement('div');
	div.style.position = 'fixed';
	div.style.top = '0';
	div.style.left = '0';
	div.style.width = '100%';
	div.style.height = '100%';
	div.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
	div.style.zIndex = '9999';
	div.onclick = () => {
		document.body.removeChild(div);
	}
	let img = document.createElement('img');
	img.src = url;
	img.style.maxWidth = '60%';
	img.style.maxHeight = '75%';
	img.style.position = 'fixed';
	img.style.top = '50%';
	img.style.left = '50%';
	img.style.transform = 'translate(-50%, -50%)';
	img.style.zIndex = '9999';
	img.style.border = '10px solid white';
	const closeButton = document.createElement('button');
	closeButton.className = 'close-button';
	closeButton.innerHTML = '×';
	closeButton.style.position = 'fixed';
	closeButton.style.top = '10px';
	closeButton.style.right = '10px';
	closeButton.style.zIndex = '9999999';
	closeButton.style.backgroundColor = 'white';
	closeButton.style.border = 'none';
	closeButton.style.padding = '5px 10px';
	closeButton.style.borderRadius = '50%';
	closeButton.style.cursor = 'pointer';
	closeButton.onclick = () => {
		document.body.removeChild(img);
	}
	img.onclick = () => {
		document.body.removeChild(img);
	}
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

function initCustomScrollbar() {
	const container = document.querySelector('.scroll-container');
	const thumb = document.querySelector('.scrollbar-thumb');
	const scrollbar = document.querySelector('.custom-scrollbar');
	let isDragging = false;
	let startX, scrollLeft, thumbLeft;

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

