function average(scores){
	let sum=0,counter=0; 
	scores.forEach(score =>{
		sum+=score;
	   	counter++;
	});
	console.log(Math.round(sum/counter));
};
var scores = [90,98,89,86,100,100,94]
average(scores);
