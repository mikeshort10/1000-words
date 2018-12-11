const express = require('express');
const app = express();
const fs = require('fs');


const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.route('/').get((req, res) => {
	res.sendFile(process.cwd() + '/views/index.html');
})

app.route('/api/').get((req, res) => {
	fs.readFile('1-1000.txt', 'utf8', (err, data) => {
		let text = data.split('\n');
		let obj = {};
		function createPath (str, obj, counter) {
			if (!obj.hasOwnProperty(str[0])) obj[str[0]] = {};

			if (str.length === 1) {
				obj[str[0]].end = counter;
				return;
			};
			
			return createPath(str.slice(1), obj[str[0]], counter);
		}

		for (let i = 0; i < text.length; i++) {
			let end = i + 1;
			createPath(text[i].toLowerCase(), obj, end)
		}

		res.json(obj);
	})
})

app.route('/api/search').get(( req , res) => {
	var word = req.query.word;
	var inTop = req.query.top;

	fs.readFile('1-1000.txt', 'utf8', (err, data) => {
		let text = data.split('\n');
		let obj = {};
		function createPath (str, obj, counter) {
			if (!obj.hasOwnProperty(str[0])) obj[str[0]] = {};

			if (str.length === 1) {
				obj[str[0]].end = counter;
				return;
			};
			
			return createPath(str.slice(1), obj[str[0]], counter);
		}

		for (let i = 0; i < text.length; i++) {
			let end = i + 1;
			createPath(text[i].toLowerCase(), obj, end)
		}

		function findNum (str, obj) {
			console.log(str)
			if (obj[str[0]] === undefined || (str.length === 1 && obj[str[0]].end === undefined)) return "Not in Top 1000"
			if (str.length === 1) return obj[str[0]].end;
			else return findNum (str.slice(1), obj[str[0]]);
		}

		function findWord (number, obj, str) {
			if (str === undefined) str = "";
			for (key in obj) {
				if (key === 'end') {
					if (obj[key] == number) return str;
				} else {
					let word = findWord(number, obj[key], str + key);
					if (word !== undefined) return word;
				}

			}
		}

		let wrd = word || findWord(inTop, obj);
		let num = !word ? Number(inTop) : findNum(word.toLowerCase(), obj) <= 1000 ? findNum(word.toLowerCase(), obj) : undefined;
		let top = word && inTop ? Number(inTop) : undefined;
		let above = word && inTop ? top >= num : undefined;


		if (wrd === undefined && num === undefined) res.send("Error: Parameters must include at least one of 'word' or 'top")

		else res.json ({ 
			word : wrd, 
			number : num,
			inTop : top,
			commonEnough: above
		})
})
});

app.listen(port, () => console.log('Listening on port ' + port))

