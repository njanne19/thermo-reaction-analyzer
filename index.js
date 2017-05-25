$(document).ready(function () {
	
	/* Need to make: 1. Something that determines products, 2. Something that determines reactants, 3. Something that determines enthalpy, entropy, and Gibbs free, 4. Something that determines spontaneity */
	
	
	var products = [];
	var reactants = [];
	
	//Makes Enter = Click on Submit
	$('.reaction').keydown(function(event) { 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode === 13) {
        $('#presto').trigger('click');
    }
	});
	
	$('#presto').on("click", () => {
		
		var input = $('.reaction').val();
		if(input.indexOf("=") >= 0) {
			console.log(input);
			reactants = input.split('=')[0];
			products = input.split ('=') [1]; 
		} //This function splits up the products and reactants by the equals sign
		
		/* Now time to split up reactants by + sign */
		
		if(reactants.indexOf("+") > 0) {
		 	  reactants = reactants.split("+");
		 } else {
			 reactants =[reactants];
		 }
			for(var i= 0; i<reactants.length; i++) {
				reactants[i] = reactants[i].replace(/\s/g,'');
				if (isNaN(reactants[i][0])) {
					reactants[i] = "1" + reactants[i];
				}
			}
		 if (products.indexOf("+") > 0) {
			 	products = products.split("+");
    	} else {
      		  products = [products];
		}
     		for(var i = 0; i<products.length; i++) {
				products[i] = products[i].replace(/\s/g,'');
        		if (isNaN(products[i][0])) {
          			products[i] = "1" + products[i];
				}
      		}
		
		for (var i = 0; i<reactants.length; i++) {
			$('#react').append("<li>" + reactants[i] + "</li>");
		}
		
		console.log("Products: ", products, " Reactants: ", reactants);
		
	});
	
	
});