// // This allows us to process/render the descriptions, which are in Markdown!
// // More about Markdown: https://en.wikipedia.org/wiki/Markdown
// let markdownIt = document.createElement('script')
// markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
// document.head.appendChild(markdownIt)



// // Okay, Are.na stuff!
// let channelSlug = 'hip-hop-creativity' // The "slug" is just the end of the URL


// // Learn it from deepseek This code provides a structured way to classify and render different types of content blocks
// // renderBlock(type, title, description, imageURL, contentURL) is responsible for actually displaying/rendering each block.
// let classify = (block) => {
// 	switch (block.class) {
// 		// If the block is a Link, render it with title, description, image, and source URL
// 		case 'Link':
// 			renderBlock('Link', block.title, block.description, block.image.original.url, block.source.url)
// 			break
// 			 // If the block is an Image, render it with title, description, and image URL
// 		case 'Image':
// 			renderBlock('Image', block.title, block.description, block.image.original.url)
// 			break
// 			 // If the block is an Text, render it with title, description, and image URL
// 		case 'Text':
// 			renderBlock('Text', block.title, block.description, block.image.original.url)
// 			break
			
// 		case 'Attachment':
// 			switch (block.attachment.content_type) {
// 				case 'application/pdf':
// 					renderBlock('PDF', block.title, block.description, block.image?.original.url, block.attachment.url)
// 					break
// 				case 'video/quicktime':
// 					renderBlock('Video', block.title, block.description, block.image?.original.url, block.attachment.url)
// 					break
// 				case 'audio/mpeg':

// 					renderBlock('Audio', block.title, block.description, block.image?.original.url, block.attachment.url)
// 					break
// 				default:
// 					console.log(block)
// 			}
// 			 // If the block is a Media type, render it based on its embedded content
// 			break
// 		case 'Media':
// 			renderBlock(block.embed.type, block.title, block.description, block.image?.original.url, block.embed.html)
// 			break
// 	}
	
// }


// // It's always good to credit your work://
// let renderUser = (user, container) => { // You can have multiple arguments for a function!
// 	let userAddress =
// 		`
// 		<address>
// 			<img src="${user.avatar_image.display}">
// 			<h3>${user.first_name}</h3>
// 			<p><a href="https://are.na/${user.slug}">Are.na profile ↗</a></p>
// 		</address>
// 		`
// 	container.insertAdjacentHTML('beforeend', userAddress)
// }

// // Function about blocks//
// const blockItems = [];
// const renderBlock = (type, title, description, imageUrl, fileUrl) => {
// 	const channelBlocks = document.querySelector('.channel-blocks');
// 	const isLarge = channelBlocks.children.length % 5 === 0;

// 	const blockItem = document.createElement('div');
// 	blockItem.className = `image-item ${isLarge ? 'large' : ''}`;
// 	blockItem.innerHTML = `
// 	<img src="${imageUrl}" alt="${title}">
// 	<div class="hover-content">
// 	<h3>${title}</h3>
// 	<p>${description}</p>
// 	</div>
// 	`;

	
// // Function about blocks-Audio//
// 	if (type === 'Audio') {
// 		blockItem.querySelector('img').src = 'asset/audio/3aaf8108d1303561c35ef707abdf28f.jpg';
// 		// blockItem.querySelector('img').src = 'asset/audio/image 3.png';
// 	}

// 	blockItem.addEventListener('mouseenter', () => {
// 		blockItems.forEach(item => {
// 			if (item !== blockItem) {
// 				item.style.opacity = '0.5';
// 			}
// 		});
// 	});

// 	blockItem.addEventListener('mouseleave', () => {
// 		blockItems.forEach(item => {
// 			item.style.opacity = '1';
// 		});
// 	});


// 	switch (type) {
// 		case 'Link':
// 			blockItem.addEventListener('click', () => {
// 				linkTo(fileUrl);
// 			});
// 			break
// 		case 'Video':
// 			blockItem.addEventListener('click', () => {
// 				showVideo(fileUrl);
// 			});
// 			break
// 		case 'Audio':
// 			blockItem.addEventListener('click', () => {
// 				showAudio(title, fileUrl);
// 			});
// 			break
// 		case 'PDF':
// 			blockItem.addEventListener('click', () => {
// 				showPDF(fileUrl);
// 			});
// 			break
// 		case 'Image':
// 			blockItem.addEventListener('click', () => {
// 				showImg(imageUrl);
// 			});
// 			break
// 	}

// 	channelBlocks.appendChild(blockItem);
// 	blockItems.push(blockItem);
// }

// const createBackdrop = () => {
// 	const backdrop = document.createElement('div');
// 	backdrop.className = 'modal-backdrop';
// 	document.body.appendChild(backdrop);
// 	setTimeout(() => backdrop.classList.add('active'), 10);
// 	return backdrop;
// };


// const linkTo = (url) => {
// 	window.open(url, '_blank');
// }

// const showVideo = (url) => {
// 	const backdrop = createBackdrop();
// 	const body = document.querySelector('body');
// 	const videoContainer = document.createElement('div');
// 	videoContainer.className = 'video-container';

// 	const video = document.createElement('video');
// 	video.controls = true;
// 	video.src = url;

// 	const closeButton = document.createElement('button');
// 	closeButton.className = 'close-button';
// 	closeButton.innerHTML = '×';
// 	closeButton.onclick = () => {
// 		body.removeChild(videoContainer);
// 	};

// 	closeButton.onclick = () => {
// 		backdrop.classList.remove('active');
// 		setTimeout(() => {
// 			body.removeChild(videoContainer);
// 			body.removeChild(backdrop);
// 		}, 300);
// 	};

// 	videoContainer.appendChild(video);
// 	videoContainer.appendChild(closeButton);
// 	body.appendChild(videoContainer);
// 	video.play();
// }

// const showAudio = (title, url) => {
// 	const backdrop = createBackdrop();
// 	const body = document.querySelector('body');
// 	const audioContainer = document.createElement('div');
// 	audioContainer.className = 'audio-container';

// 	const playerContent = document.createElement('div');
// 	playerContent.className = 'player-content';

// 	const closeButton = document.createElement('button');
// 	closeButton.className = 'close-button';
// 	closeButton.innerHTML = '×';
// 	closeButton.onclick = () => {
// 		body.removeChild(audioContainer);
// 	};

// 	const audioTitle = document.createElement('h3');
// 	audioTitle.className = 'audio-title';
// 	audioTitle.innerHTML = title;

// 	const audio = document.createElement('audio');
// 	audio.src = url;
// 	audio.controls = true;

// 	const controls = document.createElement('div');
// 	controls.className = 'custom-controls';

// 	const playButton = document.createElement('button');
// 	playButton.className = 'play-button';
// 	playButton.innerHTML = '▶';

// 	const timeInfo = document.createElement('div');
// 	timeInfo.className = 'time-info';
// 	timeInfo.innerHTML = '<span class="current-time">0:00</span> / <span class="total-time">0:00</span>';

// 	const progressContainer = document.createElement('div');
// 	progressContainer.className = 'progress-container';

// 	const progressBar = document.createElement('div');
// 	progressBar.className = 'progress-bar';

// 	progressContainer.appendChild(progressBar);
// 	controls.appendChild(playButton);
// 	controls.appendChild(progressContainer);
// 	controls.appendChild(timeInfo);

// 	playerContent.appendChild(audioTitle);
// 	playerContent.appendChild(controls);

// 	audioContainer.appendChild(closeButton);
// 	audioContainer.appendChild(playerContent);
// 	audioContainer.appendChild(audio);

// 	body.appendChild(audioContainer);

// 	const formatTime = (seconds) => {
// 		const mins = Math.floor(seconds / 60);
// 		const secs = Math.floor(seconds % 60);
// 		return `${mins}:${secs.toString().padStart(2, '0')}`;
// 	};

// 	audio.addEventListener('loadedmetadata', () => {
// 		timeInfo.querySelector('.total-time').textContent = formatTime(audio.duration);
// 	});

// 	audio.addEventListener('timeupdate', () => {
// 		const progress = (audio.currentTime / audio.duration) * 100;
// 		progressBar.style.width = `${progress}%`;
// 		timeInfo.querySelector('.current-time').textContent = formatTime(audio.currentTime);
// 	});

// 	closeButton.onclick = () => {
// 		backdrop.classList.remove('active');
// 		setTimeout(() => {
// 			body.removeChild(audioContainer);
// 			body.removeChild(backdrop);
// 		}, 300);
// 	};

// 	playButton.onclick = () => {
// 		if (audio.paused) {
// 			audio.play();
// 			playButton.innerHTML = '||';
// 		} else {
// 			audio.pause();
// 			playButton.innerHTML = '▶';
// 		}
// 	};

// 	progressContainer.addEventListener('click', (e) => {
// 		const clickPosition = (e.offsetX / progressContainer.offsetWidth);
// 		audio.currentTime = clickPosition * audio.duration;
// 	});
// };

// // Function about blocks-PDF//
// const showPDF = (url) => {
// 	const backdrop = createBackdrop();
// 	const body = document.querySelector('body');
// 	const pdfContainer = document.createElement('div');
// 	pdfContainer.className = 'pdf-container';

// 	const iframe = document.createElement('iframe');
// 	iframe.src = url;

// 	pdfContainer.appendChild(iframe);
// 	body.appendChild(pdfContainer);

// 	const closeButton = document.createElement('button');
// 	closeButton.className = 'close-button';
// 	closeButton.innerHTML = '×';
// 	closeButton.onclick = () => {
// 		body.removeChild(pdfContainer);
// 	};

// 	closeButton.onclick = () => {
// 		backdrop.classList.remove('active');
// 		setTimeout(() => {
// 			body.removeChild(pdfContainer);
// 			body.removeChild(backdrop);
// 		}, 300);
// 	};

// 	pdfContainer.appendChild(closeButton);
// }

// // Function about blocks-Image//
// function showImg(url) {
// 	let div = document.createElement('div');
// 	div.className = 'img-overlay';

// 	let img = document.createElement('img');
// 	img.src = url;

// 	let closeButton = document.createElement('button');
// 	closeButton.className = 'close-button';
// 	closeButton.innerHTML = '×';

// 	closeButton.onclick = () => document.body.removeChild(div);
// 	div.onclick = () => document.body.removeChild(div);

// 	div.appendChild(img);
// 	div.appendChild(closeButton);
// 	document.body.appendChild(div);
// }

// fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
// 	.then((response) => response.json()) // Return it as JSON data
// 	.then((data) => { // Do stuff with the data
// 		console.log(data) // Always good to check your response!
// 		// placeChannelInfo(data) // Pass the data to the first function
// 		data.contents.reverse().forEach((block) => {
// 			classify(block)
// 		})
// 		// let channelUsers = document.querySelector('#channel-users') // Show them together
// 		// data.collaborators.forEach((collaborator) => renderUser(collaborator, channelUsers))
// 		// renderUser(data.user, channelUsers)
// 	})

// // Scroll bar//
// function initCustomScrollbar() {
// 	const container = document.querySelector('.scroll-container');
// 	const thumb = document.querySelector('.scrollbar-thumb');
// 	const scrollbar = document.querySelector('.custom-scrollbar');
// 	let isDragging = false;
// 	let startX, scrollLeft, thumbLeft;
	
// // Thumb Position//
// 	function updateThumbPosition() {
// 		const scrollRatio = container.scrollLeft / (container.scrollWidth - container.clientWidth);
// 		const maxOffset = scrollbar.clientWidth - thumb.clientWidth;
// 		const newPosition = scrollRatio * maxOffset;
// 		thumb.style.transform = `translateX(${newPosition}px)`;
// 	}

// 	container.addEventListener('scroll', updateThumbPosition);

// 	thumb.addEventListener('mousedown', (e) => {
// 		isDragging = true;
// 		startX = e.clientX;
// 		thumbLeft = thumb.getBoundingClientRect().left - scrollbar.getBoundingClientRect().left;
// 		scrollLeft = container.scrollLeft;
// 		thumb.style.transition = 'none';
// 	});

// 	document.addEventListener('mousemove', (e) => {
// 		if (!isDragging) return;
// 		e.preventDefault();

// 		const deltaX = e.clientX - startX;
// 		const scrollbarWidth = scrollbar.clientWidth;
// 		const thumbWidth = thumb.clientWidth;
// 		const maxScroll = container.scrollWidth - container.clientWidth;
// 		const maxThumbTravel = scrollbarWidth - thumbWidth;

// 		const newThumbPosition = Math.max(0, Math.min(maxThumbTravel, thumbLeft + deltaX));
// 		const scrollRatio = newThumbPosition / maxThumbTravel;

// 		container.scrollLeft = scrollRatio * maxScroll;
// 		thumb.style.transform = `translateX(${newThumbPosition}px)`;
// 	});

// 	document.addEventListener('mouseup', () => {
// 		if (isDragging) {
// 			isDragging = false;
// 			thumb.style.transition = 'background 0.3s';
// 		}
// 	});

// 	scrollbar.addEventListener('click', (e) => {
// 		if (e.target === thumb) return;
// 		const clickRatio = (e.pageX - scrollbar.getBoundingClientRect().left) / scrollbar.clientWidth;
// 		container.scrollLeft = clickRatio * (container.scrollWidth - container.clientWidth);
// 	});
// }
// Initialize markdown-it for description rendering
// Initialize markdown-it for description rendering
// Initialize markdown-it for description rendering

let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Arena channel configuration
let channelSlug = 'hip-hop-creativity'

// Array to store block items for hover effects
const blockItems = [];

// Function to get the exact description as shown on Arena
const getArenaDescription = (block) => {
    // Special handling for Attachment and Media blocks
    if (block.class === 'Attachment' || block.class === 'Media') {
        // Try to get description from different possible locations
        return block.generated_title || block.description || block.title || '';
    }

    // For Text blocks
    if (block.class === 'Text' && block.content) {
        return block.content;
    }
    
    // For Links
    if (block.class === 'Link') {
        return block.description || 
               block.metadata?.description || 
               block.source?.description || '';
    }
    
    // For Images and other types
    return block.description || '';
};

// Function to get the correct title
const getArenaTitle = (block) => {
    // For Attachment blocks
    if (block.class === 'Attachment') {
        return block.title || block.generated_title || block.filename || '';
    }
    
    // For Media blocks
    if (block.class === 'Media') {
        return block.title || block.generated_title || '';
    }
    
    // For Text blocks
    if (block.class === 'Text') {
        return block.title || '';
    }
    
    // For Link blocks
    if (block.class === 'Link') {
        return block.title || block.source?.title || '';
    }
    
    return block.title || '';
};

// Function to classify and render different types of content
let classify = (block) => {
    // Get description and title using helper functions
    const description = getArenaDescription(block);
    const title = getArenaTitle(block);
    
    switch (block.class) {
        case 'Link':
            renderBlock('Link', title, description, block.image?.original.url, block.source.url)
            break
        case 'Image':
            renderBlock('Image', title, description, block.image?.original.url)
            break
        case 'Text':
            renderBlock('Text', title, description, block.image?.original.url)
            break
        case 'Attachment':
            switch (block.attachment.content_type) {
                case 'application/pdf':
                    renderBlock('PDF', title, description, block.image?.original.url, block.attachment.url)
                    break
                case 'video/quicktime':
                case 'video/mp4':
                    renderBlock('Video', title, description, block.image?.original.url, block.attachment.url)
                    break
                case 'audio/mpeg':
                    renderBlock('Audio', title, description, block.image?.original.url, block.attachment.url)
                    break
                default:
                    console.log('Unhandled attachment type:', block)
            }
            break
        case 'Media':
            renderBlock(block.embed.type, title, description, block.image?.original.url, block.embed.html)
            break
    }
}

// Main function to render blocks
const renderBlock = (type, title, description, imageUrl, fileUrl) => {
    const channelBlocks = document.querySelector('.channel-blocks');
    const isLarge = channelBlocks.children.length % 5 === 0;
    const isMobile = window.innerWidth <= 768;

    const blockItem = document.createElement('div');
    blockItem.className = `image-item ${isLarge ? 'large' : ''}`;

    // 根据设备类型生成不同的HTML结构
    if (isMobile) {
        blockItem.innerHTML = `<img src="${imageUrl || ''}" alt="${title || ''}">`;
    } else {
        // 桌面端保持原有的hover效果结构
        const processedDescription = window.markdownit ? 
            window.markdownit().render(description || '') : 
            description || '';
        
        blockItem.innerHTML = `
            <img src="${imageUrl || ''}" alt="${title || ''}">
            <div class="hover-content">
                ${title ? `<h3>${title}</h3>` : ''}
                ${processedDescription ? `<div class="description-content">${processedDescription}</div>` : ''}
            </div>
        `;
    }

    // Set default image for audio files
    if (type === 'Audio') {
        blockItem.querySelector('img').src = 'asset/audio/3aaf8108d1303561c35ef707abdf28f.jpg';
    }

    // Hover effects - 只在桌面端添加
    if (!isMobile) {
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
    }

    // Click handlers for different types
    switch (type) {
        case 'Link':
            blockItem.addEventListener('click', () => linkTo(fileUrl));
            break;
        case 'Video':
            blockItem.addEventListener('click', () => showVideo(fileUrl));
            break;
        case 'Audio':
            blockItem.addEventListener('click', () => showAudio(title, fileUrl));
            break;
        case 'PDF':
            blockItem.addEventListener('click', () => showPDF(fileUrl));
            break;
        case 'Image':
            if (isMobile) {
                blockItem.addEventListener('click', () => showImg(imageUrl, title, description));
            } else {
                blockItem.addEventListener('click', () => showImg(imageUrl));
            }
            break;
    }

    channelBlocks.appendChild(blockItem);
    blockItems.push(blockItem);
}

// Utility function to create backdrop for modals
const createBackdrop = () => {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    document.body.appendChild(backdrop);
    setTimeout(() => backdrop.classList.add('active'), 10);
    return backdrop;
};

// Function to handle link clicks
const linkTo = (url) => {
    window.open(url, '_blank');
}

// Function to display video modal
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
        backdrop.classList.remove('active');
        setTimeout(() => {
            body.removeChild(videoContainer);
            body.removeChild(backdrop);
            video.pause();
        }, 300);
    };

    videoContainer.appendChild(video);
    videoContainer.appendChild(closeButton);
    body.appendChild(videoContainer);
    video.play();
}

// Function to display audio modal
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

    const audioTitle = document.createElement('h3');
    audioTitle.className = 'audio-title';
    audioTitle.innerHTML = title || 'Audio';

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
            audio.pause();
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

// Function to display PDF modal
const showPDF = (url) => {
    const backdrop = createBackdrop();
    const body = document.querySelector('body');
    const pdfContainer = document.createElement('div');
    pdfContainer.className = 'pdf-container';

    const iframe = document.createElement('iframe');
    iframe.src = url;

    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';

    closeButton.onclick = () => {
        backdrop.classList.remove('active');
        setTimeout(() => {
            body.removeChild(pdfContainer);
            body.removeChild(backdrop);
        }, 300);
    };

    pdfContainer.appendChild(iframe);
    pdfContainer.appendChild(closeButton);
    body.appendChild(pdfContainer);
}

// Function to display image modal
const showImg = (url, title, description) => {
    let div = document.createElement('div');
    div.className = 'img-overlay';

    let wrapper = document.createElement('div');
    wrapper.className = 'image-wrapper';

    let img = document.createElement('img');
    img.style.opacity = '0';
    img.src = url;

    let closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    closeButton.style.opacity = '0';

    // 修复移动端内容显示问题
    let mobileContent = document.createElement('div');
    mobileContent.className = 'mobile-content';
    if (title || description) {
        if (title) {
            let titleElement = document.createElement('h3');
            titleElement.textContent = title;
            mobileContent.appendChild(titleElement);
        }
        if (description) {
            let descElement = document.createElement('div');
            descElement.className = 'description-content';
            // 添加Markdown解析支持
            if(window.markdownit) {
                descElement.innerHTML = window.markdownit().render(description);
            } else {
                descElement.textContent = description;
            }
            mobileContent.appendChild(descElement);
        }
        div.appendChild(mobileContent);
        
        // 确保动画生效
        requestAnimationFrame(() => {
            mobileContent.classList.add('active');
        });
    }

    img.onload = () => {
        img.style.opacity = '1';
        closeButton.style.opacity = '1';
    };

    closeButton.onclick = (e) => {
        e.stopPropagation();
        document.body.removeChild(div);
    };
    
    div.onclick = () => document.body.removeChild(div);
    img.onclick = (e) => e.stopPropagation();

    wrapper.appendChild(img);
    wrapper.appendChild(closeButton);
    div.appendChild(wrapper);
    document.body.appendChild(div);
};

// Initialize custom scrollbar
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

// Fetch and render channel content with error handling
fetch(`https://api.are.na/v2/channels/${channelSlug}?per=100`, { cache: 'no-store' })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        data.contents.reverse().forEach((block) => {
            classify(block);
        });
    })
    .catch((error) => {
        console.error('Error fetching channel data:', error);
    });

// Initialize scrollbar when document is loaded
document.addEventListener('DOMContentLoaded', initCustomScrollbar);

