import { timeParse } from "d3-time-format";

const parseDate = timeParse("%Y/%m/%d");

export function getTimelineList(symbolCode) {
	const fetchUrl = 'https://esll.net/stockapi/timeline/'+symbolCode+'?q=';
	const promiseMSFT = fetch(fetchUrl, {
		mode: 'cors'
		})
		fetch(fetchUrl, {
			mode: 'cors'
			})
		.then((response) => response.json())
		.then(data => {
			let timelineList = [];
			Object.keys(data.timelineList).forEach(i => {
				let timeline = data.timelineList[i];
				timeline.date = parseDate(timeline.date);
				timelineList.push(timeline)
			});
		   return timelineList;
		})
	return promiseMSFT;
}
