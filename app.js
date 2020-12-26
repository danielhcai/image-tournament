const fileSelect = document.querySelector('#choooseFileContainer');

fileSelect.addEventListener('change', (event) => {
	fileSelect.remove();
	
	// Files here
	console.log(event.target.files)
	
	// Start game
});