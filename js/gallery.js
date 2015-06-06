$(document).ready(function() {
    // IMPORT LIBRARIES //
    var 
        _ = window._,
        random = window.opspark.random,
        lightbox = window.opspark.lightbox;
        
    var regExFileExt = /[^\\/]+$/;
    
    // TODO 4 : Declare module-level variables //
    
    
    // TODO 5 : Initialize module-level variables //
    
    
    $.getJSON('galleries.json').then(function(galleries) {
        var gallery, thumbs, images;
        
        // TODO 6 : Create the gallery menu //
        
        
        // TODO 7 : Prepare our data // 
        
        
        // TODO 8 : Update the gallery-name HTML tag //
        
        
        // TOOD 9 : Process the list of thumbs / images //
        
        
    });
    
    // TODO 10 : Add an on-click handler to close the lightbox //
    
    
    function showLightbox(e) {
        /*
         * 1. Prevent the default event propagation so we can intercept the 
         *    request to navigate to a new url, and extract the desired url 
         *    from the event dispatcher (e.currentTarget === $linkTag).
         * 2. Start showing a pacifier (spinner to show we're loading) and 
         *    fade-in the lightbox background.
         * 3. Create an img tag, give it a class of 'gallery-detail', and 
         *    immediately hide it while loading the image.
         * 4. Load the url into the img tag, and fade-in the lightbox.
         * 5. Once loaded, remove the pacifier, fade-in the image.
         */
        e.preventDefault();
        
        var pacifier, imagePath, $imageTag;
        
        pacifier = lightbox.makePacifier($lightbox[0]);
        imagePath = $(e.currentTarget).attr('href');
        $imageTag = $(document.createElement('img'))
            .hide()
            .attr('src', imagePath)
            .addClass('gallery-detail')
            .on('load', function(e) {
                pacifier.stop();
                $imageTag.fadeIn(200);
            });
        $lightbox.append($imageTag);
        $lightbox.fadeIn(400);
    }
    
    function createNavItem(href, label) {
        return '<li><a href="' + href + '">' + label + '</a></li>';
    }
    
    function addThumbnail(thumbUrl, imageUrl) {
        var $linkTag, $imageTag;
            
            $linkTag = $(document.createElement('a'))
                .attr('href', imageUrl)
                .on('click', showLightbox);
            
            $imageTag = $(document.createElement('img'))
                .addClass('gallery-item')
                .attr('src', thumbUrl);
                
            $linkTag.append($imageTag).appendTo($gallery);
    }
    
    function fileNamesMatch(fileOne, fileTwo) {
        return regExFileExt.exec(fileOne)[0] === regExFileExt.exec(fileTwo)[0];
    }
});