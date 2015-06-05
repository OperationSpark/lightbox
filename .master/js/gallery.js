$(document).ready(function() {
    var 
        _ = window._,
        random = window.opspark.random,
        lightbox = window.opspark.lightbox,
        name,
        $galleryName,
        $gallery,
        $lightbox;
    
    $galleryName = $('#gallery-name'),
    $gallery = $('#gallery');
    $lightbox = $('#lightbox', $gallery);
    name = $.url(window.location).param('gallery');
    
    $.getJSON('galleries.json').then(function(galleries) {
        var gallery, thumbs, images;
        
        // create the gallery menu //
        galleries.forEach(function (gallery) {
            var href, $galleryNav;
            href = 'gallery.html?gallery=' + gallery.name;
            $galleryNav = $('#gallery-nav');
            $galleryNav.append('<li><a href="' + href + '">' + gallery.name + '</a></li>');
        });
        
        gallery = _.where(galleries, {'name': name})[0] || random.element(galleries);
        thumbs = gallery.thumbs;
        images = gallery.images;
        
        $galleryName[0].innerHTML = name;
        
        thumbs.forEach(function (thumb, index) {
            var $linkTag, $imageTag;
            
            $linkTag = $(document.createElement('a'))
                .attr('href', images[index])
                .on('click', showLightbox);
            
            $imageTag = $(document.createElement('img'))
                .addClass('gallery-item')
                .attr('src', thumb);
                
            $linkTag.append($imageTag).appendTo($gallery);
        });
    });
    
    $lightbox.on('click', function () {
        $lightbox.fadeOut(400, function () {
            $('.gallery-detail', $lightbox).remove();
        });
    });
    
    function showLightbox(e) {
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
});