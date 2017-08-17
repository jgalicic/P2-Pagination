$( document ).ready(function() {
    
	const ul = document.querySelector('.student-list');
	const page = document.querySelector('.page');
	const li = ul.getElementsByTagName('li');

	let totalItems = $('.student-list li').length;
	let itemsPerPage = 10;

	// create a page link section
    const pageListing = document.createElement('ul');

	const studentSearch = document.createElement('div');
	const input = document.createElement('input');
	const button = document.createElement('button');

	
	function createSearchBox() {

		$(".page-header").append(studentSearch);
		$(studentSearch).addClass('student-search')
		$(studentSearch).append(input);
		$(studentSearch).append(button);
		button.textContent = "Search";
	}

	function showPage(pageNum, studentList) {

		// Hide all list elements
		$(li).hide();

		// Then loop through all students in our student list argument
		for (i = 0; i < studentList; i++) {

			// if student should be on this page number
			if ((i >= (pageNum * itemsPerPage) - itemsPerPage) && i < (pageNum * itemsPerPage)) {
				// show the student
				$(li[i]).show();
			}
		}	
	} 

	function appendPageLinks(studentList) {
		// determine how many pages for this student list
		let totalPages = Math.ceil(totalItems / itemsPerPage);

    	$(pageListing).addClass('pagination');
    	page.appendChild(pageListing);

    	// “for” every page
    	for (i = 1; i <= totalPages; i++) {
    		// add a page link to the page link section
    		const pageNum = document.createElement('li');
    		pageNum.innerHTML = '<a href="#">' + i + '</a>';
    		pageListing.appendChild(pageNum);
    	}

    	// Use the showPage function to display the page for the link clicked
    	$('a').on("click", function() {
    		//Remove 'active' class from page links
    		$('a').removeClass('active');
    		// remove the old page link section from the site
    		$(li).hide();
    		// show new page links
    		showPage(this.textContent, studentList);
    		console.log(studentList);
    		// mark the current link as “active”
    		$(this).addClass('active');
    	});    		  
	}

	function searchList() {

		$(button).on("click", function() {
			
			if (input.value === "") {
				    // ...display a “no students found” message if the input field is empty
					alert("There are no matched students.")
			} else {

				// Declare variables to be used inside the for loop
				var searchName, searchEmail;
				// Keep track of how many students match the search query
				var matchedStudents = [];
				// Obtain the value of the search input
				let filter = input.value.toUpperCase();
				// remove the old page link section from the site
				$(li).hide();
				$(pageListing).hide();

				// Loop over the student list, and for each student…
				for (i = 0; i < totalItems; i++) {
					// ...obtain the student’s name…
					searchName = li[i].querySelector("h3").innerHTML.toUpperCase();
					// ...and the student’s email…
					searchEmail = li[i].querySelector("span").innerHTML.toUpperCase();
					// ...if the search value is found inside either email or name…
					if (searchName.indexOf(filter) > -1) {
						// ...add this student to list of “matched” student
						matchedStudents[i] = searchName;
						$(li[i]).show();
					} else if (searchEmail.indexOf(filter) > -1) {
						matchedStudents[i] = searchEmail;
						$(li[i]).show();
					}
				}

				// If there’s no “matched” students…
				if (matchedStudents.length === 0) {
					// ...display a “no student’s found” message
					alert("There are no matched students.")
					
				}  // If over ten students were found…
				else if (matchedStudents.length > 10) {
					// ...call appendPageLinks with the matched students
					appendPageLinks(matchedStudents.length);
					// Call showPage to show first ten students of matched list
					showPage(1, matchedStudents.length);
				}
			}
		});
	}

	
	// Dymanically create search box & button
	createSearchBox();

	// Create & append page links
	appendPageLinks(totalItems);

	// Show first page on initial loading
	showPage(1, totalItems);
	
	// Mark the first (current) link as "active"
	$('a').first().addClass('active');

	searchList();
});




