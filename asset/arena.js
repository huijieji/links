
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

  // attach click handler
  const handler = clickHandlers[type];
  if (handler) {
      blockItem.addEventListener('click', isMobile && type === 'Image' ? 
          () => showImg(imageUrl) : handler);
  }

  // tracking array
  channelBlocks.appendChild(blockItem);
  blockItems.push(blockItem);
};

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

