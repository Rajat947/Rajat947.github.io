
// Module for controlling and calculating budget
var budgetController = (function(){
	
	var Expense = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id,description,value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			inc: [],
			exp: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget : 0,
		percentage : -1
	};

	var calculateTotal = function(type){
		
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum+= cur.value;
		});
		data.totals[type] = sum;
	}

	return {
		addItem: function(type, des, val){
			var ID,newItem;

			// Get unique value for ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else{
				ID = 0;
			}

			// Make new object for inc or exp
			if(type === 'exp'){
				newItem = new Expense(ID,des,val);
			}else if(type === 'inc'){
				newItem = new Income(ID, des, val);
			}

			//Push new object into data Structure
			data.allItems[type].push(newItem);

			return newItem;

		},

		deleteItem: function(type, id){

			var ids, index;

			ids = data.allItems[type].map(function(cur){
				return cur.id;
			});
			
			index = ids.indexOf(id);

			if(index !== -1){
				data.allItems[type].splice(index,1);
			}
		},

		calculateBudget : function(){

			// calculate total income and expense
			calculateTotal('inc');
			calculateTotal('exp');

			// calculate Budget
			data.budget = data.totals.inc - data.totals.exp;

			//calculate percentage
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
			} else{
				data.percentage = -1;
			}
		},

		getData: function(){
			return{
				budget: data.budget,
				Income: data.totals.inc,
				Expense: data.totals.exp,
				percentage: data.percentage
			}
		},

		test: function(){
			console.log(data);
		}
	}

})();


// Module for updating UI after every event
var UIController = (function(){
	
	var DOMString = {
		type : '.add_type',
		description : '.add_description',
		value : '.add_value',
		save_button : '.save_item',
		Expense: '.Expenses',
		Income: '.Income',
		Budget: '.Budget',
		incomeLabel: '.income',
		expenseLabel: '.expense',
		percentageLabel: '.percentage',
		container: '.container',
		dateLabel: '.dateLabel',
		saveButtonIcon: '.fa-check-circle-o'
	};

	var formatNumber = function(type, num){
		num = Math.abs(num);
		num = num.toFixed(2);
		return (type === 'exp' ? '-' : '+') + ' ' + num;
	}

	return {
		// method to pass dom Strings
		DOMString : function(){
			return DOMString
		},

		//Get input data from fields
		getData : function(){
			return{
				type : document.querySelector(DOMString.type).value,
				description : document.querySelector(DOMString.description).value,
				value : parseFloat(document.querySelector(DOMString.value).value)
			}
		},

		//Add new entry in income or expense list
		addElement: function(obj, type){
			var html, newHtml, element;

			//1. create HTML with dummy text
			if(type === 'inc'){
				element = document.querySelector(DOMString.Income); 
				html = '<div id="inc-%id%" class="fields border"><p class="description">%description%</p><div class="value"><p>%value%</p><button class="remove changeView" style="color: #28B9B5"><i class="fa fa-minus-circle" aria-hidden="true"></i></button></div></div>';

			}else if(type === 'exp'){
				element = document.querySelector(DOMString.Expense);
				html = '<div id="exp-%id%" class="fields border"><p class="description">%description%</p><div class="value"><p>%value%</p><button class="remove changeView" style="color: #FF5049" ><i class="fa fa-minus-circle" aria-hidden="true"></i></button></div></div>';

			}

			//2. Replace dummy text with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(type, obj.value));

			//3. Insert html into UI
			element.insertAdjacentHTML('beforeend',newHtml);
		},

		// Delete Entry from income or expense
		removeElement: function(ID){

			var element = document.getElementById(ID);
			element.parentNode.removeChild(element);

		},

		// Clear input fields
		clearFields: function(){
			// select input fields
			var fields = document.querySelectorAll(DOMString.description + ',' + DOMString.value);
			
			//convert fields list into array to iterate over it
			var fieldsArr = Array.prototype.slice.call(fields);

			//loop through array and clear fields
			fieldsArr.forEach(function(current, index, array){
				current.value = "";
			})

			//set focus to description again
			fieldsArr[0].focus();
		},

		//Update budget
		updateBudgetInUI: function(obj){

			var budgetType;
			budgetType = (obj.Income - obj.Expense > 0? 'inc' : 'exp');

			if(obj.Income - obj.Expense === 0){
				document.querySelector(DOMString.Budget).textContent = obj.budget.toFixed(2);
			}else{
				document.querySelector(DOMString.Budget).textContent = formatNumber(budgetType, obj.budget);
			}
			document.querySelector(DOMString.incomeLabel).textContent = formatNumber('inc', obj.Income);
			document.querySelector(DOMString.expenseLabel).textContent = formatNumber('exp', obj.Expense);
			
			if(obj.percentage > 0){
				document.querySelector(DOMString.percentageLabel).textContent = obj.percentage + '%';

			}else {
				document.querySelector(DOMString.percentageLabel).textContent = '---';

			}
		},

		// Change red-focus and red class to chnage border color and button color when selection change
		changeClass: function(){

			var list, listArr;

			list = document.querySelectorAll(DOMString.type + ',' + DOMString.description + ',' + DOMString.value);
			
			listArr = Array.prototype.slice.call(list);
			
			listArr.forEach(function(cur){
				cur.classList.toggle('red-focus');
			});
			
			document.querySelector(DOMString.saveButtonIcon).classList.toggle('red');
		},

		// Get month and year
		getMonthAndYear: function(){
			var now, month, year, months;

			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			now = new Date();

			month = now.getMonth();
			year = now.getFullYear();

			document.querySelector(DOMString.dateLabel).textContent = months[month] + ' ' + year;
		}
	};
})();


//Module to controll whole app by interacting with other two modules
var appController = (function(budgetCtrl, UICtrl){

	var setUpEventListeners = function()
	{
		var DOM = UICtrl.DOMString();

		//event listner for save button
		document.querySelector(DOM.save_button).addEventListener('click',ctrlAddItem);

		// event listner for enter button
		document.addEventListener('keypress',function(event){
			if(event.keyCode===13 || event.which===13){
				ctrlAddItem();
			}
		});

		// Event listener for delete button
		document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

		// Event Listener for type button to change focus and color of button
		document.querySelector(DOM.type).addEventListener('change',UICtrl.changeClass);
	}

	var updateBudget = function(){

		//1. Calculate budget
		budgetCtrl.calculateBudget();

		//2. return budget 
		var budget = budgetCtrl.getData();

		//3. display budget on the UI
		UICtrl.updateBudgetInUI(budget);
	}

	var ctrlDeleteItem = function(event){
		var item, splitID, type, ID;

		item = event.target.parentNode.parentNode.parentNode.id;
		
		if(item){
			splitID = item.split('-');
			type = splitID[0];
			ID = splitID[1];
			//1. delete item from DS
			budgetCtrl.deleteItem(type, parseInt(ID));

			//2. delete item from UI
			UICtrl.removeElement(item);

			//3. update and display budget
			updateBudget();
		}
	}

	var ctrlAddItem = function(){
		var input, item;
		//1. Get input field data
		input = UICtrl.getData();

		if(input.description !=="" && !isNaN(input.value) && input.value > 0){
			//2. Add item to the budget controller
			item = budgetCtrl.addItem(input.type, input.description, input.value);

			//3. Add item to the UI
			UICtrl.addElement(item, input.type);

			//4. Clear fields
			UICtrl.clearFields();

			//5. update budget
			updateBudget();
			
		};
	};

	return {
		init : function(){
			console.log('Lo safar shuru ho gya');
			setUpEventListeners();
			UICtrl.getMonthAndYear();
		}
	};

})(budgetController, UIController);


appController.init();