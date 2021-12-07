function reverseString(str){
    return str.split("").reverse().join("");
  }
  
  
  function isPalindrome(str){
    var reversedStr = reverseString(str);
    if(str === reversedStr){
      return true;
    }
    else{
      return false;
    }
  }
  
  
  function dateNumberToString(date){
    if(date.day < 10){
      date.day = "0" + date.day; 
    }
    else{
      date.day = date.day.toString();
    }
  
    if(date.month < 10){
      date.month = "0" + date.month; 
    }
    else{
      date.month = date.month.toString();
    }
  
    date.year = date.year.toString();
  
    return date;
  }
  
  
  function dateAllVariations(date){
    var strDate = dateNumberToString(date)
   
    const ddmmyyyy = strDate.day + strDate.month + strDate.year;
    const mmddyyyy = strDate.month + strDate.day + strDate.year;
    const yyyymmdd = strDate.year + strDate.month + strDate.day;
    const ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
    const mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
    const yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  
  function checkPalidromeForAllDateFormats(date){
    var dateArray = dateAllVariations(date);
    for(var i = 0; i < dateArray.length; i++){
      if(isPalindrome(dateArray[i])){
        return true;
      }
    }
    return false;
  }
  
  function isLeapYear(year){
    if(year % 400 === 0){
      return true;
    }
    else if(year % 100 === 0){
      return false;
    }
    else if(year % 4 === 0){
      return true;
    }
    else{
      return false;
    }
  }
  
  
  function getNextDate(date){
    var day = date.day+1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(month === 2){
      if(isLeapYear(date.year)){
        if(day>29){
          day = 1;
          month++;
        }
      }
      else{
        if(day>28){
          day = 1;
          month++;
        }  
      }
    }
  
    else{
      if(day>daysInMonth[month-1]){
        day = 1;
        month++;
      }
  
      if(month > 12){
        month=1;
        year++;
      }
    }
    return {day: day, month: month, year: year}
  }
  
  
function nextPalindromeDate(date){
    var nextDate = getNextDate(date);
    var track = 0;
    var flag = false;
    while(1){
      track++;
      flag = checkPalidromeForAllDateFormats(nextDate);
      if(flag){
        return [track, nextDate];
      }
      else{
        nextDate = getNextDate(nextDate);
      }
    }
  }
  
  
  
  const inputDate = document.querySelector("#input-date");
  const showBtn = document.querySelector("#show-btn");
  const output = document.querySelector("#output");
  
  
  function clickEventHandler(){
    var dateArray = inputDate.value.split("-");
    var date = {day: Number(dateArray[0]), month: Number(dateArray[1]), year: Number(dateArray[2])};
    var palindromeOrNot = checkPalidromeForAllDateFormats(date);
    if(palindromeOrNot){
      output.innerText = "Yay! your birthday is an palindrome";
    }
    else{
      var [track, nextDate] = nextPalindromeDate(date);
      output.innerText = "You missed palindrome by " + track +" days.";
    }
    console.log("me");
  }
    
 

  
showBtn.addEventListener("click", clickEventHandler);