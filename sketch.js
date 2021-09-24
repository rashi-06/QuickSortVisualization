let arr = [];
let w = 10;

let states = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	arr = new Array(floor(width / w));
	for (let i = 0; i < arr.length; i++) {
		arr[i] = random(height-200);
		states[i] = -1;
	}
	quickSort(arr, 0, arr.length - 1);
}

async function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}
	let index = await partition(arr, start, end);
	states[index] = -1;

	await Promise.all([
		quickSort(arr, start, index - 1),
		quickSort(arr, index + 1, end),
	]);
}

async function partition(arr, start, end) {
	for (let i = start; i < end; i++) {
		states[i] = 1;
	}

	let pivotValue = arr[end];
	let pivotIndex = start;

	states[pivotIndex] = 0; 

	for (let i = start; i < end; i++) {
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex);
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;
		}
	}
	await swap(arr, pivotIndex, end);

	for (let i = start; i < end; i++) {
		if (i != pivotIndex) {
			states[i] = -1;
		}
	}

	return pivotIndex;
}

function draw() {
	background(0);

	for (let i = 0; i < arr.length; i++) {
		noStroke();
		if (states[i] == 0) {
			fill("#ff3333");
		} else if (states[i] == 1) {
			fill("#808080");
		} else {
			fill(255);
		}
		rect(i * w, height - arr[i], w, arr[i]);
	}
}

async function swap(arr, a, b) {
	await sleep(50);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}