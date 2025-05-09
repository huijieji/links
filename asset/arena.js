
let markdownIt = document.createElement('script')
markdownIt.src = 'https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js'
document.head.appendChild(markdownIt)

// Arena channel configuration
let channelSlug = 'hip-hop-creativity'

// Array to store block items for hover effects
const blockItems = [];

// Function to get the exact description as shown on Arena//
const getArenaDescription = (block) => {
	// Special handling for Attachment and Media blocks //
	if (block.class === 'Attachment' || block.class === 'Media') {
		// Try to get description from different possible locations
		return block.generated_title || block.description || block.title || '';
	}

	// For Text blocks//
	if (block.class === 'Text' && block.content) {
		return block.content;
	}

	// For Links //
	if (block.class === 'Link') {
		return block.description || 
				block.metadata?.description || 
				block.source?.description || '';
	}
	
	// For Images and other types //
	return block.description || '';
};


//Extracts the title for different block types from Are.na
//@param {Object} block - The Are.na block object
//@returns {string} Extracted title

const getArenaTitle = (block) => {
	// For Attachment blocks
	if (block.class === 'Attachment') {
		return block.title || block.generated_title || block.filename || '';
	}
	
	// For Media blocks//
	if (block.class === 'Media') {
		return block.title || block.generated_title || '';
	}
	
	// For Text blocks//
	if (block.class === 'Text') {
		return block.title || '';
	}

	// For Link blocks //
	if (block.class === 'Link') {
		return block.title || block.source?.title || '';
	}
	
	return block.title || '';
};

// Function to classify and render different types of content
// @references:
//  * - Dynamic Content Rendering: https://javascript.info/types//

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


// Main function to render blocks //
// @references:
// * - Markdown Rendering: https://github.com/markdown-it/markdown-it//
// * - Responsive Web Design: https://developers.google.com/web/fundamentals/design-and-ux/responsive//

const renderBlock = (type, title, description, imageUrl, fileUrl) => {
    const channelBlocks = document.querySelector('.channel-blocks');
    const isLarge = channelBlocks.children.length % 5 === 0;
    const isMobile = window.innerWidth <= 768;

    const blockItem = document.createElement('div');
    blockItem.className = `image-item ${isLarge ? 'large' : ''}`;

    if (isMobile) {
        blockItem.innerHTML = `<img src="${imageUrl || ''}" alt="${title || ''}">`;
    } else {

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

    // Set default image for audio files //
	if (type === 'Audio') {
		blockItem.querySelector('img').src = 'asset/audio/3aaf8108d1303561c35ef707abdf28f.jpg';
	}

    // Hover effects//
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
    const clickHandlers = {
        'Link': () => window.open(fileUrl, '_blank'),
        'Video': () => showVideo(fileUrl),
        'Audio': () => showAudio(title, fileUrl),
        'PDF': () => showPDF(fileUrl),
        'Image': () => showImg(imageUrl, title, description)
    };

//     channelBlocks.appendChild(blockItem);
//     blockItems.push(blockItem);
// }


// // Utility function to create backdrop for modals
// const createBackdrop = () => {
//     const backdrop = document.createElement('div');
//     backdrop.className = 'modal-backdrop';
//     document.body.appendChild(backdrop);
//     setTimeout(() => backdrop.classList.add('active'), 10);
//     return backdrop;
// };

// // Function to handle link clicks //
// const linkTo = (url) => {
//     window.open(url, '_blank');
// }

// Function to display video modal //
// * @references:
// * - MDN Video Element: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
// * - Modal Design Patterns: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

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

// Function to display audio modal //
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

// Function to display PDF modal //
// * @references:https://codepen.io//
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

// Function to display image modal //
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

            if(window.markdownit) {
                descElement.innerHTML = window.markdownit().render(description);
            } else {
                descElement.textContent = description;
            }
            mobileContent.appendChild(descElement);
        }
        div.appendChild(mobileContent);
        

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

// Initialize custom scrollbar //
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

// Fetch and render channel content with error handling //
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

// Initialize scrollbar when document is loaded //
document.addEventListener('DOMContentLoaded', initCustomScrollbar);

