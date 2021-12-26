

(function () {
	//"use strict";

	/* Date.prototype.deltaDays(n)
	 * 
	 * Returns a Date object n days in the future.
	 */
	Date.prototype.deltaDays = function (n) {
		// relies on the Date object to automatically wrap between months for us
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
	};

	/* Date.prototype.getSunday()
	 * 
	 * Returns the Sunday nearest in the past to this date (inclusive)
	 */
	Date.prototype.getSunday = function () {
		return this.deltaDays(-1 * this.getDay());
	};
}());

/** Week
 * 
 * Represents a week.
 * 
 * Functions (Methods):
 *	.nextWeek() returns a Week object sequentially in the future
 *	.prevWeek() returns a Week object sequentially in the past
 *	.contains(date) returns true if this week's sunday is the same
 *		as date's sunday; false otherwise
 *	.getDates() returns an Array containing 7 Date objects, each representing
 *		one of the seven days in this month
 */
function Week(initial_d) {
	//"use strict";

	this.sunday = initial_d.getSunday();
		
	
	this.nextWeek = function () {
		return new Week(this.sunday.deltaDays(7));
	};
	
	this.prevWeek = function () {
		return new Week(this.sunday.deltaDays(-7));
	};
	
	this.contains = function (d) {
		return (this.sunday.valueOf() === d.getSunday().valueOf());
	};
	
	this.getDates = function () {
		var dates = [];
		for(var i=0; i<7; i++){
			dates.push(this.sunday.deltaDays(i));
		}
		return dates;
	};
}

/** Month
 * 
 * Represents a month.
 * 
 * Properties:
 *	.year == the year associated with the month
 *	.month == the month number (January = 0)
 * 
 * Functions (Methods):
 *	.nextMonth() returns a Month object sequentially in the future
 *	.prevMonth() returns a Month object sequentially in the past
 *	.getDateObject(d) returns a Date object representing the date
 *		d in the month
 *	.getWeeks() returns an Array containing all weeks spanned by the
 *		month; the weeks are represented as Week objects
 */
function Month(year, month) {
	//"use strict";
	
	this.year = year;
	this.month = month;
	
	this.nextMonth = function () {
		return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
	};
	
	this.prevMonth = function () {
		return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
	};
	
	this.getDateObject = function(d) {
		return new Date(this.year, this.month, d);
	};
	
	this.getWeeks = function () {
		var firstDay = this.getDateObject(1);
		var lastDay = this.nextMonth().getDateObject(0);
		
		var weeks = [];
		var currweek = new Week(firstDay);
		weeks.push(currweek);
		while(!currweek.contains(lastDay)){
			currweek = currweek.nextWeek();
			weeks.push(currweek);
		}
		
		return weeks;
	};
}
///*****************End of Class Provided File************************************** */
let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let weekNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

//basically inits calendar framwork with elements for every "day" in the calendar
//stored in 5 rows
function initCalendarFramework(){
	calendarMainBody=document.getElementsByTagName("tbody").item(0);
          
			row=document.createElement("tr");
			row.className ="weekNames";
			for (var i = 0; i < weekNames.length; i++){
				cell1 = document.createElement("td");
				cell1.className = "weekName";
				textCell1 = document.createTextNode(weekNames[i]);
				cell1.appendChild(textCell1);
				row.appendChild(cell1);
				calendarMainBody.appendChild(row);

			}
			for (var i = 1; i<7; i++){
				row=document.createElement("tr");
				row.className = "week"+i;
				day1 = document.createElement("td");
				day1.className = "weekDay";
                row.appendChild(day1);
				day2 = document.createElement("td");
				day2.className = "weekDay";
                row.appendChild(day2);
				day3 = document.createElement("td");
				day3.className = "weekDay";
                row.appendChild(day3);
				day4 = document.createElement("td");
				day4.className = "weekDay";
                row.appendChild(day4);
				day5 = document.createElement("td");
				day5.className = "weekDay";
                row.appendChild(day5);
				day6 = document.createElement("td");
				day6.className = "weekDay";
                row.appendChild(day6);
				day7 = document.createElement("td");
				day7.className = "weekDay";
                row.appendChild(day7);
		
				calendarMainBody.appendChild(row);
            }
}


let currentMonth = new Month(2021, 9);
let currentYear = currentMonth.year;

document.getElementById("nextMonth").addEventListener("click", incrementMonth);
document.getElementById("prevMonth").addEventListener("click", decrementMonth);

function incrementMonth(){
    currentMonth = currentMonth.nextMonth();
	if(currentMonth == 0){
		currentYear += 1;
	}
    displayCalendar();
	updateEvents();
	updateMonth();
}

function decrementMonth(){
    currentMonth = currentMonth.prevMonth();
	if(currentMonth == 13){
		currentYear -+ 1;
	}
    displayCalendar();
	updateEvents();
	updateMonth();
}

//Displays plain version of calendar, with correctly numbered days of week for the month and year

function displayCalendar(){
    let weeks = currentMonth.getWeeks();
	let weekdaysLength = 7;
	for(let w in weeks){
		let counter=0;
		let days = weeks[w].getDates();

		for(let d in days){
			document.getElementsByTagName("td")[weekdaysLength].innerHTML = days[counter].getDate();
			weekdaysLength += 1;
			counter += 1;
		}
	}
}

function findFirstDayOfMonth(){
    for(let i = 7; i < 20; i++){
        console.log(document.getElementsByTagName("td")[i].innerHTML)
        if(document.getElementsByTagName("td")[i].innerHTML == 1){
            return i;
        }
    }
};

function findLastDayOfMonth(){
    for(let j = 20; j < 47; j++){
        console.log(document.getElementsByTagName("td")[j].innerHTML)
        if(document.getElementsByTagName("td")[j].innerHTML == 1){
            return j;
        }
    }
};

function updateMonth(){
	let monthNumerical = currentMonth.month
	monthNumerical += 1;
	document.getElementById("monthDisplay").innerHTML = "<h1>" + monthNumerical + "/" + currentMonth.year + "</h1>";
}



function getEventForOneDate(i){
    const data = { "currMonth": currentMonth.month, "currYear": currentYear, "currDay": parseInt(document.getElementsByTagName("td")[i].textContent)};
    console.log(data);
    fetch("get_event_ajax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })

        .then(res => res.json())
        .then(res => {
            if(!res.empty){ //to ensure the query was not returned empty
			for(let j = 0; j < res.length; j++){
            let event = res[j].event;
			let hour = res[j].hour;
			let minute = res[j].minute;
			let id = res[j].event_id;
			let tag = res[j].tag;
			if(event != ""){
            document.getElementsByTagName("td")[i].innerHTML += "<br><button id='"+ id +"'"
			+" onClick = trackEvent(this.id)>"+ event+ "<br>" 
			+ hour + ":"+minute+ "<br><div id=tagdiv>" + tag+ "</div>" + "</button>" + "<br><button id='"+ id +"'"
			+" onClick = deleteEvent(this.id)>"+ "Delete Above Event"+ "</button>" +
			"<br><button class='getEvent' id='"+ id +"'"
			+" onClick = getEventID(this.id)>"+ "Edit Above Event"+ "</button>" + "<br><button class='getEvent' id='"+ id +"'"
			+" onClick = getShareEventID(this.id)>"+ "Share Above Event"+ "</button>" + "<br>";
			}
		}
	}
})
}

function updateEvents(){
	let start = findFirstDayOfMonth();
	let end = findLastDayOfMonth();
	for(let q = start; q < end; q++){
		getEventForOneDate(q);
	}	
}

function trackEvent(id){
	idClicked = id;
	console.log(idClicked);
}

function deleteEvent(eventId){
	const data = { "eventId" : eventId};
    console.log(data);
    fetch("deleteAjax.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(res => res.json())

	updateEvents();
	location.reload();

}


src="user_ajax.js";
console.log("hellooooo");
initCalendarFramework();
displayCalendar();
updateEvents();
updateMonth();
