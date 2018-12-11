<h1>1000 Most Common English Words API</h1>
	<body>
		<p>This is a lightweight API that is can be used to:
		<ul>
			<li>determine if a word is in the top 1000 most common English words</li>
			<li>determine what the top nth word in the English language is (up to the 1000th)</li>
			<li>determine if a word is in the range 1st-nth most common words in the English language</li>
		</ul>
		</p>

		<p>
			The endpoint for the JSON is: <p><a href="localhost:3000/api"><code>localhost:3000/api</code></a></p>. The endpoint will direct you to the list of the top 1000 words in the English language.</p> 


			<p>The data structure for this API is a trie, where each letter is a node containing all possible letters that could come after it to create one of the top 1000 words. You do not need to understand this trie structure to use the API. </p>

			<p>Each node may contain the key 'end'. This designates the end of the word, and the value of 'end' designates that words ranking in the overall list. Therefore, that is listed as <p><code> { t: { h: { a: { t: { end: 10 } } } } } </code></p> as it is the 10th most commonly used word in the English dictionary. This is of course a simple example, as each letter in that can contain more than one subsequent letter. For example, the "h" alse includes a key "e" with a value { 'end' : 1 }, to designate "the" as the most common English word.</p>

			<p>To run a query of the list, use the endpoint <code>localhost:3000/api/search</code></p>

			<p>The API takes only two query parameters: top and/or word.</p>

			<p>Top must be a integer between 1 and 1000. If word is omitted, the query will return a JSON object containing the number you put in and the word that it corresponds to. If an invalid value is entered, the object will not include a word property.</p>

			<p><code>localhost:3000/api/search?top=INTEGER</code></p>

			<p>Word must be a string without whitespaces or special characters. The word is case insensitive. However, your original input will be returned. The JSON will also return a number property, signifying where that word ranks on the list. If it is not ranked on the list, number will read "Not in Top 1000".</p>

			<p><code>localhost:3000/api/search?word=STRING</code></p>

			<p>If both word and number are included, the API will return four properties:

			<ol>
				<li>word: the word your entered in your GET request</li>
				<li>number: the ranking of your word</li>
				<li>top: the top you entered in your GET request. Top here signifies something different: it sets a new range to check the frequency of your word.</li>
				<li>commonEnough: This signifies if the word appears common enough to clear the benchmark you set in top. For example if you entered ?word=an&top=45, it would return <code>false</code> as the word is number 48th most common word in English</li>
			</ol></p>

			<p><code>localhost:3000/api/search?word=STRING&top=INTEGER</code></p>
