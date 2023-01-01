// Let's put both functions within a resonably named namespace
var formData = {
    set : function (){
        // (Re)create the myForm valiable
        var myForm = [];
        // Delete old data from localstorage
        localStorage.removeItem('myForm');
        // Take each input's name and value and add it to the array we already created.
        $('form input[type=text]').each(function(){
            // Push each input's value into the temporary variable
            myForm.push({ name: this.name, value: this.value});
        });
        // Add the array to localStorage
        localStorage.myForm = JSON.stringify(myForm);
    },

    get : function (){
        // Is the form already stored within localStorage? If so, get it and copy it's contents over our myform array variable.
        if(localStorage.myForm != undefined){
            // Get the existing values out of localStorage
            myForm = JSON.parse(localStorage.myForm);
            // Loop through myForm
            for (var i = 0; i < myForm.length; i++) {
                // Populate the form with what data you have for it
                $('[name='+myForm[i].name+']').val(myForm[i].value);
            }
        }

    }
}

// Populate the form with whatever data already exists for it
formData.get();

// Watch for a change in a change in an input field. If there is a change, resave the form values.
$("input").change( function() {
    // If a change is detected, save the values.
    formData.set();
});
