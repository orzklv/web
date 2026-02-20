	// Based on https://codeberg.org/daudix/duckquill/issues/101#issuecomment-2377169
	let searchSetup = false;
	let fuse;

	async function initIndex() {
		if (searchSetup) return;

		const url = document.getElementById("search-index").textContent;
		const response = await fetch(url);

		if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

		const options = {
			includeScore: false,
			includeMatches: true,
			ignoreLocation: true,
			threshold: 0.15,
			keys: [
				{ name: "title", weight: 3 },
				{ name: "description", weight: 2 },
				{ name: "body", weight: 1 }
			]
		};

		fuse = new Fuse(await response.json(), options);
		searchSetup = true;

		console.log("Search index initialized successfully");
	}

	function toggleSearch() {
		initIndex();
		const searchBar = document.getElementById("search-bar");
		const searchContainer = document.getElementById("search-container");
		const searchResults = document.getElementById("search-results");
		searchContainer.classList.toggle("active");
		searchBar.toggleAttribute("disabled");
		searchBar.focus();
	}

	function debounce(actual_fn, wait) {
		let timeoutId;
	
		return (...args) => {
			clearTimeout(timeoutId);
	
			timeoutId = setTimeout(() => {
				actual_fn(...args);
			}, wait);
		};
	};

	function initSearch() {
		const searchBar = document.getElementById("search-bar");
		const searchResults = document.getElementById("search-results");
		const searchContainer = document.getElementById("search-container");
		const MAX_ITEMS = 10;
		const MAX_RESULTS = 4;

		let currentTerm = "";

		searchBar.addEventListener("keyup", (e) => {
			const searchVal = searchBar.value.trim();
			const results = fuse.search(searchVal, { limit: MAX_ITEMS });

			let html = "";
			for (const result of results) {
				html += makeTeaser(result, searchVal);
			}
			searchResults.innerHTML = html;

			if (html) {
				searchResults.style.display = "flex";
			} else {
				searchResults.style.display = "none";
			}
		});

		function makeTeaser(result, searchVal) {
			const TEASER_SIZE = 20;
			let output = `<div class="search-result item"><a class="result-title" href=${result.item.url}>${result.item.title}</a>`;

			for (const match of result.matches) {
				if (match.key === "title") continue;

				const indices = match.indices.sort((a, b) => Math.abs(a[1] - a[0] - searchVal.length) - Math.abs(b[1] - b[0] - searchVal.length)).slice(0, MAX_RESULTS);
				const value = match.value;

				for (const ind of indices) {
					const start = Math.max(0, ind[0] - TEASER_SIZE);
					const end = Math.min(value.length - 1, ind[1] + TEASER_SIZE);
					output += "<span>"
						+ value.substring(start, ind[0])
						+ `<strong>${value.substring(ind[0], ind[1] + 1)}</strong>`
						+ value.substring(ind[1] + 1, end)
						+ "</span>";
				}

				if (match.indices.length > 4) {
                    const moreMatchesText = document.getElementById("more-matches-text").textContent;
					output += `<span class="more-matches">${moreMatchesText}</span>`.replace("$MATCHES", `+${match.indices.length - MAX_RESULTS}`);
				}
			}
			return output + "</div>";
		}

		/*window.addEventListener("click", function (event) {
			if (searchSetup && searchBar.getAttribute("disabled") === null && !searchContainer.contains(event.target)) {
				toggleSearch();
			}
		}, { passive: true });*/

		document.addEventListener("keydown", function(event) {
			if (event.key === "/") {
				event.preventDefault();
				toggleSearch();
			}
		});

		document.getElementById("search-toggle").addEventListener("click", toggleSearch);
	}

	if (document.readyState === "complete" ||
		(document.readyState !== "loading" && !document.documentElement.doScroll))
		initSearch();
	else
		document.addEventListener("DOMContentLoaded", initSearch);
