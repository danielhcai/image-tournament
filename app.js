// HTML Elements
const rootDiv = document.getElementById('root');
const fileSelect = document.getElementById('choooseFileContainer');
// Game state
let images = []
let newImages = []
let hasGameEnded = false;
let imageIndex = 1

// Choose files
fileSelect.addEventListener('change', (event) => {
	uploadedFiles = event.target.files
	// Add images
	for(let i = 0; i < uploadedFiles.length; i++){
		let imageType = uploadedFiles[i].type.split("/")[0]
		if(imageType = "image") {
			img = document.createElement('img')
			img.setAttribute("class", "image")
			img.src = URL.createObjectURL(uploadedFiles[i])
			img.addEventListener("click", (event) => {
				if(hasGameEnded) {
					return;
				}
				newImages.push(event.srcElement)
				nextImg()
			})
			newImages.push(img)
		}
	}
	shuffleArray(newImages)

	if(newImages.length <= 1) {
		images = []
		alert("Need to upload two or more images.")
	}
	else{
		// Remove selector
		fileSelect.remove();

		headerDiv = document.createElement('div')
		headerDiv.setAttribute("id", "header")
		rootDiv.appendChild(headerDiv)

		// Create image containers
		leftDiv = document.createElement('div')
		leftDiv.setAttribute("id", "left-div")
		leftDiv.setAttribute("class", "image-container")
		rootDiv.appendChild(leftDiv)

		rightDiv = document.createElement('div')
		rightDiv.setAttribute("id", "right-div")
		rightDiv.setAttribute("class", "image-container")
		rootDiv.appendChild(rightDiv)

		roundOf = 2
		while(roundOf * 2 <= newImages.length) {
			roundOf *= 2
		}

		newImageLength = newImages.length
		if(roundOf != newImages.length) {
			for (let i = roundOf; i < newImageLength; i++) {
				console.log(i)
				images.push(newImages.pop())
				images.push(newImages.pop())
			}
			alert(`Uploaded ${newImages.length + images.length} images. ${images.length} will have to play an extra round.`)
		}
		extraImages = images.length
		roundOf *= 2
		
		// Start game
		nextImg()
	}
})

// Add images to left and right div
function addImage(leftImg, rightImg) {
	if(leftDiv.firstChild) {
		leftDiv.removeChild(leftDiv.firstChild)
	}
	if(rightDiv.firstChild) {
		rightDiv.removeChild(rightDiv.firstChild)
	}

	leftDiv.appendChild(leftImg)
	rightDiv.appendChild(rightImg)
}

// Show next pair of images
function nextImg (){
	// Winner chosen
	if(images.length == 0 && newImages.length == 1){
		endGame(newImages[0])
		return;
	}
	
	// Next round of images
	if (images.length == 0) {
		images = newImages
		shuffleArray(images)
		newImages = []
		roundOf /= 2
		imageIndex = 1
	}

	// Set header text
	if(extraImages > 0) {
		headerDiv.innerHTML = `Extra Round: ${imageIndex}/${extraImages/2}`
		if(extraImages == imageIndex * 2) {
			extraImages = 0
		}
	}
	else {
		headerDiv.innerHTML = `Round of ${roundOf}: ${imageIndex}/${roundOf/2}`
	}

	// Get and show next images
	imageIndex += 1
	leftImage = images.pop()
	rightImage = images.pop()
	addImage(leftImage, rightImage)
}

// Only one image left, winner found
function endGame (img){
	hasGameEnded = true;
	leftDiv.remove()
	rightDiv.remove()

	winnerDiv = document.createElement('div')
	winnerDiv.setAttribute("id", "winner-div")

	img.removeAttribute("class")
	img.setAttribute("id", "winner-img")
	resizeWinnerImg()
	
	document.body.setAttribute("style", "background-color: black;")
	rootDiv.appendChild(winnerDiv)
	winnerDiv.append(img)
	headerDiv.innerHTML = "Winner!"
}

// Shuffle and array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// Resize image only when a winner has been found
window.onresize = (event) => {
	if(hasGameEnded){
		console.log(event)
		resizeWinnerImg();
	}
}

// Resizing the winner image
function resizeWinnerImg() {
	heightProp = window.innerHeight/newImages[0].height
	widthProp = window.innerWidth/newImages[0].width
	let x = newImages[0].height/newImages[0].width
	console.log(x)
	if (heightProp > widthProp) {
		newImages[0].setAttribute("style", "width: 100%; height: auto;")
	}
	else {
		newImages[0].setAttribute("style", `width: auto; height: ${window.innerHeight}px;`)
	}
}