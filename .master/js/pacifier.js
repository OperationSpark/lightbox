(function (window) {
    window.opspark = window.opspark || {};
    window.opspark.lightbox = window.opspark.lightbox || {};
    
    window.opspark.lightbox.makePacifier = function (target, options) {
        options = (options ? options : {
            color: '#FFF',
            lines: 9,
            length: 0,
            width: 7,
            radius: 11,
            corners: 1.0,
            rotate: 0,
            trail: 60,
            speed: 1.0,
            direction: -1,
            shadow: true,
            hwaccel: true
        });
        return new Spinner(options).spin(target);
    };
}(window));