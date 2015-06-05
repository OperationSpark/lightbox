(function (window) {
    window.opspark = window.opspark || {};
    var random = window.opspark.random = window.opspark.random || {};

    /*
     * Randomly selects a key from an object.
     * 
     * On the first iteration, the prefix increment on count makes the 
     * right-hand side of the equation evaluate to 1/1 == 1. Since Math.random 
     * is always in the range [0,1) (zero to one, excluding one), the expression 
     * evaluates to true and the first property is selected. As far as the 
     * distribution of the random selection goes, it is uniform. With one 
     * property there is a 100% chance it will be selected. With two there is 
     * a 50% chance either will be selected. With three a 33.3%. And so on. 
     * This solution has a minimal memory footprint.
     *
     * @see http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
     */
    random.key = function (object) {
        var result, count;
        count = 0;
        for (var property in object)
            if (Math.random() < 1 / ++count)
               result = property;
        return result;
    };
    
    random.element = function(array) {
        var element;
        if (array && array.length) element = array[Math.floor(Math.random() * array.length)];
        return element;
    };
}(window));
