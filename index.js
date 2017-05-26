$(document).ready(function () {

	/* Need to make: 1. Something that determines products(done), 2. Something that determines reactants(done), 3. Something that determines enthalpy, entropy, and Gibbs free with temperature, 4. Something that determines spontaneity */


	var products = [];
	var reactants = [];

	//Makes Enter = Click on Submit
	$('.reaction').keydown(function (event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode === 13) {
        $('#presto').trigger('click');
    }
	});

	$('#presto').on("click", () => {
        $('#therm').empty();
        $('#react').empty();
        $('#prod').empty();
        var input;
        input = $('.reaction').val();
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
		for (var i = 0; i<products.length; i++) {
			$('#prod').append("<li>" + products[i] + "</li>");
		}



		/* Time to get Enthalpy */
		var productDataEnthalpy = products.map((product, index) => {
			return "";
		});
		var reactantDataEnthalpy = reactants.map((reactant, index) => {
			return "";
		});

		var getEnthalpyProducts = new Promise((resolve, reject) => {
			products.forEach((product, index) => {
				$.getJSON('https://enthalpy-api.herokuapp.com/' + products[index] + '/', (data) => {
				}).then((data) => {
					productDataEnthalpy[index] = data;
					if(productDataEnthalpy.indexOf("") === -1) {
						resolve();
						console.log("Meow");
					}
				});
			});
		});

		var getEnthalpyReactants = new Promise((resolve, reject) => {
			reactants.forEach((reactant, index) => {
				$.getJSON('https://enthalpy-api.herokuapp.com/' + reactants[index] + '/', (data) => {
				}).then((data) => {
					reactantDataEnthalpy[index] = data;
					if (reactantDataEnthalpy.indexOf("") === -1) {
					   resolve();
					   console.log("Meow2");
                    }
				});
			});
		});

		Promise.all([getEnthalpyProducts, getEnthalpyReactants]).then(() => {
			var productSum = 0;
			for(var i = 0; i<productDataEnthalpy.length; i++) {
				productSum += productDataEnthalpy[i].enthalpy;
			}
			var reactantSum = 0;
			for (var i = 0; i<reactantDataEnthalpy.length; i++) {
				reactantSum += reactantDataEnthalpy[i].enthalpy;
			}
			var totalSum = productSum - reactantSum;
			console.log(totalSum);
			//Need to make a jQuery reaction
			$('#therm').append("<h3>" + "∆Hº = " + totalSum + "</h3>");
		});

        
        
        // Now onto finding entropy
        
        var productDataEntropy = products.map((product, index) => {
			return "";
		});
		var reactantDataEntropy = reactants.map((reactant, index) => {
			return "";
		});
        
        var getEntropyProducts = new Promise((resolve, reject) => {
			products.forEach((product, index) => {
				$.getJSON('https://entropy-api.herokuapp.com/' + products[index] + '/', (data) => {
				}).then((data) => {
					productDataEntropy[index] = data;
					if(productDataEntropy.indexOf("") === -1) {
						resolve();
						console.log("Meow");
					}
				});
			});
		});

		var getEntropyReactants = new Promise((resolve, reject) => {
			reactants.forEach((reactant, index) => {
				$.getJSON('https://entropy-api.herokuapp.com/' + reactants[index] + '/', (data) => {
				}).then((data) => {
					reactantDataEntropy[index] = data;
					if (reactantDataEntropy.indexOf("") === -1) {
					   resolve();
					   console.log("Meow2");
                    }
				});
			});
		});
        
        Promise.all([getEntropyProducts, getEntropyReactants]).then(() => {
			var productSum = 0;
			for(var i = 0; i<productDataEntropy.length; i++) {
				productSum += productDataEntropy[i].entropy;
			}
			var reactantSum = 0;
			for (var i = 0; i<reactantDataEntropy.length; i++) {
				reactantSum += reactantDataEntropy[i].entropy;
			}
			var totalSum = productSum - reactantSum;
			console.log(totalSum);
			//Need to make a jQuery reaction
			$('#therm').append("<h3>" + "∆Sº = " + totalSum.toFixed(2) + "</h3>");
		});
        
	});


});
